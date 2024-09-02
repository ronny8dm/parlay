import json
from urllib.parse import urlencode
import requests
from cachetools import TTLCache
import logging
from dotenv import load_dotenv
import os
import time

load_dotenv()

max_concurrent_tasks = 10

cache = TTLCache(maxsize=100, ttl=300)

logger = logging.getLogger(__name__)


def fetch(endpoint, params=None, retries=3):
    base_url = os.getenv('BASE_URL', 'https://api.sportmonks.com')
    api_token = os.getenv('API_TOKEN', 'your_default_api_token')
    url = f"{base_url}/v3/football/{endpoint}?api_token={api_token}"
    
    if params:
        query_string = urlencode(params, doseq=True)
        url += f"&{query_string}"

    if url in cache:
        print(f"Fetching from cache: {url}")
        return cache[url]

    for attempt in range(retries):
        try:
            # Make the request
            response = requests.get(url)
            response.raise_for_status()  # Raise an HTTPError for bad responses (4xx and 5xx)

            # Process the response based on content type
            if response.headers.get('Content-Type') == 'application/json':
                data = response.json()
            else:
                data = response.text

            # Store the response in cache
            cache[url] = data

            return data
        
        except requests.exceptions.RequestException as e:
            logger.error(f"Attempt {attempt + 1} to fetch {url} failed with error: {e}")
            if attempt < retries - 1:
                time.sleep(2 ** attempt)  # Exponential backoff
            else:
                raise


def getLeaguesWithSeason():
    endpoint = "leagues"
    params = {"include": "currentSeason"}
    response = fetch(endpoint, params)
    return response

def getStandingsBySeason():
    leagueSeasonId = getLeaguesWithSeason()

    standings = {}
    for league in leagueSeasonId['data']:
        league_name = league['name']
        seasonId = league['currentSeason']['id']

        standings[league_name] = fetchStandings(seasonId)

    return standings


def fetchStandings(seasonId):
    endpoint = f"standings/seasons/{seasonId}"
    params = {
        "include": "season;league;participant;details.type"
    }
    response = fetch(endpoint, params)
    return response


