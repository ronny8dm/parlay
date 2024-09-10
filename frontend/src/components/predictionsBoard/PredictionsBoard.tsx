/** @format */

import React, { useEffect, useState } from "react";
import ClientAPI from "../../services/ClientAPI";
import StandingsBoard from "../standingsBoard/StandingsBoard";
import "./PredictionsBoard.css";

interface PredictionsBoardProps {
  fixtureId: number | null;
  standingsData: any;
  upcomingFixtures: any[];
}

const api = ClientAPI();

export default function PredictionsBoard(props: PredictionsBoardProps) {
  const [predictions, setPredictions] = useState<any[]>([]);
  const [selectedFixture, setSelectedFixture] = useState<number | null>(
    props.fixtureId
  );

  useEffect(() => {
    if (selectedFixture !== null) {
      const fetchPredictions = async () => {
        try {
          let response = await api.getPredictions(selectedFixture, 1);
          let aiPicks = response.data;

          response = await api.getPredictions(selectedFixture, 2);
          aiPicks = aiPicks.concat(response.data);
          setPredictions(aiPicks);
          console.log("ai picks in predicitions board: ", aiPicks);
        } catch (error) {
          console.error("Failed to fetch leagues:", error);
        }
      };

      fetchPredictions();
    }
  }, [selectedFixture]);

  const handleFixtureClick = (fixtureId: number) => {
    setSelectedFixture((prevSelected) =>
      prevSelected === fixtureId ? null : fixtureId
    );
  };

  const findTeamImage = (teamName: string) => {
    // Check if standingsData exists
    if (props.standingsData && props.standingsData.data) {
      const team = props.standingsData.data.find((item: any) => {
        return item.participant.name.toLowerCase() === teamName.toLowerCase();
      });
      return team ? team.participant.image_path : null;
    }
    return null; // If no standings data is available, return null
  };

  const getPredominantResult = (prediction: any) => {
    if (
      prediction &&
      typeof prediction === "object" &&
      prediction.type_id === 237
    ) {
      // Correctly accessing type_id at the correct level
      const { home, away, draw } = prediction.predictions;

      if (!home || !away || !draw) {
        return null;
      }

      const maxValue = Math.max(home, away, draw);
      if (maxValue === home) return `Home ${home}%`;
      if (maxValue === away) return `Away ${away}%`;
      return `Draw (${draw}%)`;
    }
    return null;
  };

  const getOverUnderPredictions = (predictions: any) => {
    const overUnderTypes = [334, 331, 333, 332, 235, 236, 234, 231];

    if (
      predictions &&
      typeof predictions === "object" &&
      overUnderTypes.includes(predictions.type_id)
    ) {
      const { yes, no } = predictions.predictions;
      let predominantValue = yes > no ? `Over ${yes}%` : `Under ${no}%`;

      let name = "";
      switch (predictions.type_id) {
        case 334:
          name = "Home O/U 0.5";
          break;
        case 331:
          name = "Home O/U 1.5";
          break;
        case 333:
          name = "Away O/U 0.5";
          break;
        case 332:
          name = "Away O/U 1.5";
          break;
        case 235:
          name = "Total goals O/U 2.5";
          break;
        case 236:
          name = "Total goals O/U 3.5";
          break;
        case 234:
          name = "Total goals O/U 1.5";
          break;
        case 231:
          name = "Both Teams to Score (BTTS)";
          predominantValue = yes > no ? `Yes ${yes}%` : `No ${no}%`;
          break;
      }

      return `${name}: ${predominantValue}`;
    }

    return null;
  };

  const getPredictedResult = (prediction: any) => {
    if (
      prediction &&
      typeof prediction === "object" &&
      prediction.type_id === 240 // Assuming this is the type for predicted scores
    ) {
      const scores = prediction.predictions.scores;

      if (scores && typeof scores === "object") {
        const entries = Object.entries(scores);

        if (entries.length === 0) return null; // Return null if there are no scores

        // Initialize variables to track the highest score
        let highestScoreKey: string | null = null;
        let highestScoreValue = -Infinity;

        // Iterate through the scores and filter out the "Other" keys
        entries.forEach(([key, value]) => {
          // Skip keys like "Other_1", "Other_2", etc.
          if (key.startsWith("Other")) return;

          const scoreValue = value as number; // Typecast to number

          // Find the highest valid score
          if (scoreValue > highestScoreValue) {
            highestScoreValue = scoreValue;
            highestScoreKey = key;
          }
        });

        // Return the highest valid score and its percentage, if found
        if (highestScoreKey) {
          return `${highestScoreKey}: ${highestScoreValue}%`;
        }
      }
    }

    return null; // If no valid prediction is found, return null
  };

  const getUpcomingFixtures = (fixtures: any[]) => {
    const uniqueDates = Array.from(
      new Set(
        fixtures.map((fixture) => new Date(fixture.starting_at).toDateString())
      )
    ).slice(0, 2); // Get the first two unique dates

    return fixtures.filter((fixture) =>
      uniqueDates.includes(new Date(fixture.starting_at).toDateString())
    );
  };

  const filteredFixtures = getUpcomingFixtures(props.upcomingFixtures);

  return (
    <div className="w-full flex flex-col items-center">
      <h2 className="text-xl text-white font-bold mb-4">Upcoming Fixtures</h2>

      {/* Display upcoming fixtures */}
      <ul className="mb-6 w-full flex flex-col items-center">
        {filteredFixtures.map((fixture: any) => (
          <li key={fixture.id} className="mb-2 w-full md:w-3/4 lg:w-1/2">
            <button
              onClick={() => handleFixtureClick(fixture.id)}
              className="fresh-border hover:border-primary-500 py-2 px-4 rounded w-full text-left"
            >
              {fixture.name} -{" "}
              {new Date(fixture.starting_at).toLocaleString(undefined, {
                month: "numeric",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
              })}
            </button>

            {selectedFixture === fixture.id && predictions.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4 w-full">
                {predictions
                  .map((prediction: any) => {
                    const [homeTeamName, awayTeamName] =
                      fixture.name.split(" vs ");
                    const homeTeamImage = findTeamImage(homeTeamName);
                    const awayTeamImage = findTeamImage(awayTeamName);
                    const gameTime = new Date(
                      fixture.starting_at
                    ).toLocaleString();

                    const fullTimePrediction = getPredominantResult(prediction);
                    const overUnderPredictions =
                      getOverUnderPredictions(prediction);
                    const fullTimeResult = getPredictedResult(prediction);

                    if (
                      fullTimePrediction ||
                      overUnderPredictions ||
                      fullTimeResult
                    ) {
                      return (
                        <div
                          key={prediction.id}
                          className="p-4 border gap-4 rounded-lg shadow-md  fresh-border bg-secondary-100 flex flex-col justify-between aspect-w-1 aspect-h-1"
                        >
                          <div>
                            <div className="flex w-full justify-center items-center mb-2">
                              {homeTeamImage && (
                                <img
                                  src={homeTeamImage}
                                  alt={`${homeTeamName} logo`}
                                  className="w-8 h-8 object-cover"
                                />
                              )}
                              <span className="mx-2 text-xs">VS</span>
                              {awayTeamImage && (
                                <img
                                  src={awayTeamImage}
                                  alt={`${awayTeamName} logo`}
                                  className="w-8 h-8 object-cover"
                                />
                              )}
                            </div>

                            <div className="text-center justify-center items-center">
                              <h3 className="text-xs mb-2 text-center font-semibold">
                                {fixture.name}
                              </h3>
                              <p className="text-xs mb-2 text-center">
                                {gameTime}
                              </p>
                            </div>

                            {fullTimePrediction && (
                              <p className="text-sm uppercase text-center font-bold">
                                Full Time Winner: {fullTimePrediction}
                              </p>
                            )}
                            {overUnderPredictions && (
                              <p className="text-sm uppercase text-center font-bold">
                                {overUnderPredictions}
                              </p>
                            )}
                            {fullTimeResult && (
                              <p className="text-sm uppercase text-center font-bold">
                                Predicted Result: {fullTimeResult}
                              </p>
                            )}
                          </div>

                          {/* Button for full analysis */}
                          <div className="mt-4">
                            <button className="btn_fresh-border hover:bg-secondary-hover hover:border-secondary-hborder text-white py-2 px-4 rounded w-full">
                              View Analysis
                            </button>
                          </div>
                        </div>
                      );
                    }
                    return null;
                  })
                  .filter(Boolean)}
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
