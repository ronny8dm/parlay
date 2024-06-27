from typing import Union
from dotenv import load_dotenv
from fastapi import FastAPI
import asyncio
from contextlib import asynccontextmanager
from fastapi.responses import RedirectResponse
from core.services.data_fetch import DataFetcher
from fastapi.middleware.cors import CORSMiddleware
import os

load_dotenv()

data_fetcher = DataFetcher()

@asynccontextmanager
async def lifespan(app: FastAPI):
    await data_fetcher.preload_data()
    yield

app = FastAPI(lifespan=lifespan)

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/{sport}/standings")
async def get_standings(sport: str):
    await data_fetcher.fetch_standings(sport)
    return data_fetcher.data[sport].get("standings", {})

@app.get("/{sport}/schedule")
async def get_schedule(sport: str):
    await data_fetcher.fetch_schedule(sport)
    return data_fetcher.data[sport].get("schedules", {})

@app.get("/{sport}/stats")
async def get_stats(sport: str):
    await data_fetcher.fetch_stats(sport)
    return data_fetcher.data[sport].get("stats", {})

@app.get("/{sport}/teams")
async def get_teams(sport: str):
    await data_fetcher.fetch_teams(sport)
    return data_fetcher.data[sport].get("teams", {})

@app.get("/{sport}/roster")
async def get_roster(sport: str):
    await data_fetcher.fetch_rosters(sport)
    return data_fetcher.data[sport].get("rosters", {})

@app.get("/{sport}/scoreboards")
async def get_scoreboards(sport: str):
    await data_fetcher.fetch_scoreboard(sport)
    return data_fetcher.data[sport].get("scoreboards")

@app.get("/{sport}/summary")
async def get_summary(sport: str):
    await data_fetcher.fetch_summary(sport)
    return data_fetcher.data[sport].get("summaries")
