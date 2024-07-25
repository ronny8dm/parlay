import json
import aiohttp
import asyncio
from cachetools import TTLCache
import logging
from aiohttp import ClientOSError
from dotenv import load_dotenv
import os
import ssl
from datetime import datetime



load_dotenv()

SSL_SITE_WEB_PATH = os.getenv('SSL_SITE_WEB_PATH')
SSL_SITE_API_PATH = os.getenv('SSL_SITE_API_PATH')
max_concurrent_tasks = 10

if SSL_SITE_WEB_PATH is None:
    raise ValueError("SSL_PATH is not set")

if SSL_SITE_API_PATH is None:
    raise ValueError("SSL_PATH_LEAGUES is not set")

# Print the SSL_PATHs for debugging purposes
print(f"Using SSL certificate from: {SSL_SITE_WEB_PATH}")
print(f"Using SSL certificate for leagues from: {SSL_SITE_API_PATH}")

ssl_context_default = ssl.create_default_context(cafile=SSL_SITE_WEB_PATH)
ssl_context_leagues = ssl.create_default_context(cafile=SSL_SITE_API_PATH)
cache = TTLCache(maxsize=100, ttl=300)

logger = logging.getLogger(__name__)

async def fetch(session, url, semaphore, ssl_context, retries=3):
    async with semaphore:
        for attempt in range(retries):
            try:
                if url in cache:
                    print(f"Fetching from cache: {url}")
                    return cache[url]
                async with session.get(url, ssl=ssl_context) as response:
                    try:
                        if response.headers.get('Content-Type') == 'application/json':
                            data = await response.json()
                        else:
                            data = await response.text()
                    except aiohttp.ContentTypeError:
                        data = await response.text()
                    cache[url] = data
                    return data
            except ClientOSError as e:
                logger.error(f"Attempt {attempt + 1} failed with error: {e}")
                if attempt < retries - 1:
                    await asyncio.sleep(2 ** attempt)
                else:
                    raise


async def get_teams(sport, slug):
    semaphore = asyncio.Semaphore(max_concurrent_tasks)
    async with aiohttp.ClientSession(connector=aiohttp.TCPConnector(ssl=ssl_context_leagues)) as session:
        url = f"{os.getenv('BASE_TEAMS_URL')}/sports/{sport}/{slug}/teams"
        try:
            response = await fetch(session, url, semaphore, ssl_context_leagues)
            if isinstance(response, str):
                response = json.loads(response)
            return response
        except Exception as e:
            logger.error(f"Failed to fetch teams for {sport} with slug {slug}: {e}")
            return None

async def get_scoreboard(sport, slug):
    semaphore = asyncio.Semaphore(max_concurrent_tasks)
    async with aiohttp.ClientSession(connector=aiohttp.TCPConnector(ssl=ssl_context_leagues)) as session:
        url = f"{os.getenv('BASE_TEAMS_URL')}/sports/{sport}/{slug}/scoreboard?dates={datetime.now().year}"
        try:
            response = await fetch(session, url, semaphore, ssl_context_leagues)
            if isinstance(response, str):
                response = json.loads(response)
            return response
        except Exception as e:
            logger.error(f"Failed to fetch scoreboard for {sport} with slug {slug}: {e}")
            return None


async def get_roster(sport, slug, team_id):
    semaphore = asyncio.Semaphore(max_concurrent_tasks)
    async with aiohttp.ClientSession() as session:
        url = f"{os.getenv('BASE_TEAMS_URL')}/sports/{sport}/{slug}/teams/{team_id}?enable=roster"
        try:
            response = await fetch(session, url, semaphore, ssl_context_leagues)
            if isinstance(response, str):
                response = json.loads(response)
            return response
        except Exception as e:
            logger.error(f"Failed to fetch roster for {sport} with slug {slug} and team_id {team_id}: {e}")
            return None


async def get_schedule(sport, slug, team_id):
    semaphore = asyncio.Semaphore(max_concurrent_tasks)
    async with aiohttp.ClientSession() as session:
        url = f"{os.getenv('BASE_TEAMS_URL')}/sports/{sport}/{slug}/teams/{team_id}/schedule"
        try:
            response = await fetch(session, url, semaphore, ssl_context_leagues)
            if isinstance(response, str):
                response = json.loads(response)
            return response
        except Exception as e:
            logger.error(f"Failed to fetch schedule for {sport} with slug {slug} and team_id {team_id}: {e}")
            return None

async def get_standings(sport, slug):
    semaphore = asyncio.Semaphore(max_concurrent_tasks)
    async with aiohttp.ClientSession() as session:
        url = f"{os.getenv('BASE_URL')}/sports/{sport}/{slug}/standings"
        try:
            response = await fetch(session, url, semaphore, ssl_context_default)
            if isinstance(response, str):
                response = json.loads(response)
            return response
        except Exception as e:
            logger.error(f"Failed to fetch standings for {sport} with slug {slug}: {e}")
            return None
        
async def get_stats(sport, slug):
    semaphore = asyncio.Semaphore(max_concurrent_tasks)
    async with aiohttp.ClientSession() as session:
        url = f"{os.getenv('BASE_TEAMS_URL')}/sports/{sport}/{slug}/statistics"
        try:
            response = await fetch(session, url, semaphore, ssl_context_leagues)
            if isinstance(response, str):
                response = json.loads(response)
            return response
        except Exception as e:
            logger.error(f"Failed to fetch stats for {sport} with slug {slug}: {e}")
            return None


async def get_summary(sport, slug, event_id):
    semaphore = asyncio.Semaphore(max_concurrent_tasks)
    async with aiohttp.ClientSession() as session:
        url = f"{os.getenv('BASE_TEAMS_URL')}/sports/{sport}/{slug}/summary?event={event_id}"
        try:
            print(f"Fetch summaries from {url}")
            response = await fetch(session, url, semaphore, ssl_context_leagues)
            if isinstance(response, str):
                response = json.loads(response)
            return response
        except Exception as e:
            logger.error(f"Failed to fetch summary for {sport} with slug {slug}: {e}")
            return None



