import json
from urllib.parse import urlencode
from fastapi import HTTPException
import openai
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

OPENAI_API_KEY = os.getenv('OPENAI_API_KEY')
if not len(OPENAI_API_KEY):
    print("please provide a valid api key")

openai.api_key = OPENAI_API_KEY

openai_model = "gpt-4"
max_responses = 1
temperature = 0.7
max_tokens = 512


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
            
            response = requests.get(url)
            response.raise_for_status()  

            
            if response.headers.get('Content-Type') == 'application/json':
                data = response.json()
            else:
                data = response.text

            
            cache[url] = data

            return data
        
        except requests.exceptions.RequestException as e:
            logger.error(f"Attempt {attempt + 1} to fetch {url} failed with error: {e}")
            if attempt < retries - 1:
                time.sleep(2 ** attempt)
            else:
                raise


def getLeaguesWithSeason():
    endpoint = "leagues"
    params = {"include": "currentSeason;upcoming"}
    response = fetch(endpoint, params)
    return response


def fetchStandings(seasonId):
    endpoint = f"standings/seasons/{seasonId}"
    params = {
        "include": "season;league;participant;details.type"
    }
    response = fetch(endpoint, params)
    return response

def fetchPredictions(fixtureId, page = int):
    endpoint = f"predictions/probabilities/fixtures/{fixtureId}"
    params = {
        "include": "type;fixture",
        "page": page
    }
    response = fetch(endpoint, params)
    return response

def fetchAnalysis(fixture):
    try:
        # Check if API key is present
        if not openai.api_key:
            raise HTTPException(status_code=503, detail="OpenAI API Key is missing")
        
        # Print the fixture data to verify it is correct
        print(f"Fixture Data: {json.dumps(fixture, indent=2)}")
        
        # Send request to OpenAI API (without streaming for simplicity)
        print("Sending OpenAI request...")
        response = openai.chat.completions.create(
            model="gpt-4-turbo",  # Ensure you're using the correct model name
            messages=[{
                "role": "user",
                "content": f"Provide an analysis for the following football fixture: {fixture['fixture']['name']}, starting on {fixture['fixture']['starting_at']}. The probability for over 1.5 goals is {fixture['predictions']['yes']}%."
            }],
            max_tokens=512,
            temperature=0.7,
            stream=True
        )
        
        full_response = ""

        # Process each chunk in the stream
        print("Receiving OpenAI response...")
        for chunk in response:
            # Debug: Print the entire chunk to check its contents
            # Check if chunk contains content and append it to the response
            if chunk.choices[0].delta.content is not None:
                content_chunk = chunk.choices[0].delta.content
                full_response += content_chunk  # Append to the full response
            else:
                print("Chunk does not contain valid content.")
        
        print(f"Full OpenAI Response: {full_response}")
        # Return the full response once streaming is complete
        return {"data": {"analysis": full_response}}

        

    # Handle OpenAI-specific errors, if available
    except Exception as e:
        # Log and raise OpenAI-specific errors
        print(f"OpenAI API Error: {str(e)}")
        raise HTTPException(status_code=503, detail=f"OpenAI API Error: {str(e)}")
    
    except Exception as e:
        # Handle rate-limiting
        print(f"Rate Limit Error: {str(e)}")
        raise HTTPException(status_code=503, detail=f"Rate Limit Error: {str(e)}")

    except Exception as e:
        # Catch-all for any other exceptions
        print(f"Error in generating analysis: {str(e)}")
        raise HTTPException(status_code=503, detail=f"Error in generating analysis: {str(e)}")
