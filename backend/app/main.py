from dotenv import load_dotenv
from fastapi import FastAPI
from core.services.api_service import fetchPredictions, fetchStandings, getLeaguesWithSeason
from fastapi.middleware.cors import CORSMiddleware

load_dotenv()


# @asynccontextmanager
# async def lifespan(app: FastAPI):
#     await data_fetcher.preload_data()
#     yield

app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/leagues")
async def get_leagues():
    response = getLeaguesWithSeason()
    return response

@app.get("/standings/{seasonId}")
async def get_standings(seasonId: int):
    response = fetchStandings(seasonId)
    return response


@app.get("/predictions/{fixtureId}/{page}")
async def get_predictions(fixtureId: int, page: int):
    response = fetchPredictions(fixtureId, page)
    return response