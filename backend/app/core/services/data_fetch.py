import asyncio
import logging
import json
from core.services.espn_api import get_teams, get_roster, get_schedule, get_scoreboard, get_standings, get_stats, get_summary

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


SUPPORTED_LEAGUES = {
    "baseball": ["mlb", "college-baseball"],
    "basketball": ["nba", "wnba"],
    "soccer": ["eng.1"],
    "football": ["nfl"]
}

class DataFetcher:
    def __init__(self):
       self.data = {
            "baseball": {},
            "basketball": {},
            "soccer": {},
            "football": {}
        }  

    async def fetch_teams(self, sport):
        logger.info(f"Fetching teams for {sport}...")
        teams_data = {}
        for slug in SUPPORTED_LEAGUES[sport]:
            teams = await get_teams(sport, slug)
            teams_data[slug] = teams
        self.data[sport]["teams"] = teams_data
        logger.info(f"Fetched teams for {sport}")

    