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

    async def fetch_rosters(self, sport):
        logger.info(f"Fetching rosters for {sport}...")
        rosters_data = {}
        team_ids = []
        for slug, teams in self.data[sport]["teams"].items():
            if isinstance(teams, str):
                teams = json.loads(teams)
            for sport_data in teams.get("sports", []):
                for league in sport_data.get("leagues", []):
                    for team in league.get("teams", []):
                        team_id = team.get("team", {}).get("id")
                        if team_id:
                            team_ids.append((slug, team_id))
        
        batch_size = 10 
        for i in range(0, len(team_ids), batch_size):
            batch = team_ids[i:i+batch_size]
            tasks = [get_roster(sport, slug, team_id) for slug, team_id in batch]
            results = await asyncio.gather(*tasks)
            for (slug, team_id), result in zip(batch, results):
                rosters_data[team_id] = result

        self.data[sport]["rosters"] = rosters_data
        logger.info(f"Fetched schedules for {sport}")

    async def fetch_schedule(self, sport):
        logger.info(f"Fetching schedules for {sport}...")
        schedules_data = {}
        team_ids = []
        for slug, teams in self.data[sport]["teams"].items():
            if isinstance(teams, str):
                teams = json.loads(teams)
            for sport_data in teams.get("sports", []):
                for league in sport_data.get("leagues", []):
                    for team in league.get("teams", []):
                        team_id = team.get("team", {}).get("id")
                        if team_id:
                            team_ids.append((slug, team_id))
        
        batch_size = 10 
        for i in range(0, len(team_ids), batch_size):
            batch = team_ids[i:i+batch_size]
            tasks = [get_schedule(sport, slug, team_id) for slug, team_id in batch]
            results = await asyncio.gather(*tasks)
            for (slug, team_id), result in zip(batch, results):
                schedules_data[team_id] = result

        self.data[sport]["schedules"] = schedules_data
        logger.info(f"Fetched schedules for {sport}")



    async def fetch_scoreboard(self, sport):
        logger.info(f"Fetching scoreboard for {sport}...")
        scoreboards_data = {}
        for slug in SUPPORTED_LEAGUES[sport]:
            scoreboard = await get_scoreboard(sport, slug)
            scoreboards_data[slug] = scoreboard
        self.data[sport]["scoreboards"] = scoreboards_data
        logger.info(f"Fetched scoreboard for {sport}")

    async def fetch_standings(self, sport):
        logger.info(f"Fetching standings for {sport}...")
        standings_data = {}
        for slug in SUPPORTED_LEAGUES[sport]:
            standings = await get_standings(sport, slug)
            standings_data[slug] = standings
        self.data[sport]["standings"] = standings_data
        logger.info(f"Fetched standings for {sport}")

    async def fetch_stats(self, sport):
        logger.info(f"Fetching stats for {sport}...")
        stats_data = {}
        for slug in SUPPORTED_LEAGUES[sport]:
            stats = await get_stats(sport, slug)
            stats_data[slug] = stats
        self.data[sport]["stats"] = stats_data
        logger.info(f"Fetched stats for {sport}...")


    async def fetch_summary(self, sport):

        if sport != "baseball":
            logger.error(f"Summary fetching is only supported for baseball at the moment.")
            return

        logger.info(f"Fetching summary for {sport}...")
        summaries_data = {}
        slug = "mlb"
        print(f"Processing slug: {slug}")
        scoreboard = self.data[sport].get("scoreboards", {}).get(slug)
        if scoreboard:
            if isinstance(scoreboard, str):
                scoreboard = json.loads(scoreboard)
            counter = 0
            for event in scoreboard.get("events", []):
                event_id = event.get("id")

                if counter >=10:
                    break
                if event_id:
                    try:
                        summary = await get_summary(sport, slug, event_id)
                        summaries_data[event_id] = summary
                        counter += 1
                    except Exception as e:
                        logger.error(
                            f"Error fetching summary for {sport} - {slug} - event {event_id}: {e}"
                        )
        else:
            logger.error(f"No scoreboard found for {sport} - {slug}")
        self.data[sport]["summaries"] = summaries_data
        logger.info(f"Fetched summaries for {sport}")


    async def preload_data(self):
        tasks = []
        for sport in SUPPORTED_LEAGUES.keys():
            tasks.append(self.fetch_teams(sport))
        await asyncio.gather(*tasks)

        tasks = []
        for sport in SUPPORTED_LEAGUES.keys():
            tasks.append(self.fetch_rosters(sport))
            tasks.append(self.fetch_schedule(sport))
            tasks.append(self.fetch_scoreboard(sport))
            tasks.append(self.fetch_standings(sport))
            tasks.append(self.fetch_stats(sport))
        await asyncio.gather(*tasks)
        tasks = []
        for sport in SUPPORTED_LEAGUES.keys():
            event_id = 401569485
            tasks.append(self.fetch_summary(sport))
        await asyncio.gather(*tasks)


    async def fetch_data_for_sport(self, sport):
        data = {
            "teams": {},
            "rosters": {},
            "schedules": {},
            "scoreboards": {},
            "standings": {},
            "stats": {},
            "summary": {},
        }


        for slug in SUPPORTED_LEAGUES[sport]:
            teams = await get_teams(sport, slug)
            data["teams"][slug] = teams
            for sport_data in teams.get("sports", []):
                for league in sport_data.get("leagues", []):
                    for team in league.get("teams", []):
                        team_id = team.get("team", {}).get("id")
                        if team_id:
                            data["rosters"][team_id] = await get_roster(sport, slug, team_id)
                            data["schedules"][team_id] = await get_schedule(sport, slug, team_id)
            data["scoreboards"][slug] = await get_scoreboard(sport, slug)
            for event in data["scoreboards"][slug].get("events", []):
                event_id = event.get("id")
                if event_id:
                    data["summaries"][event_id] = await get_summary(sport, slug, event_id)
            data["standings"][slug] = await get_standings(sport, slug)
            data["stats"][slug] = await get_stats(sport, slug)
        return data