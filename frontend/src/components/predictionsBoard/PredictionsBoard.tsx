/** @format */

import React, { useEffect, useState } from "react";
import ClientAPI from "../../services/ClientAPI";
import StandingsBoard from "../standingsBoard/StandingsBoard";

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

  console.log(predictions);
  console.log(props.standingsData);
  console.log(props.upcomingFixtures);

  const findTeamImage = (teamName: string) => {
    const team = props.standingsData.data.find((item: any) => {
      return item.participant.name.toLowerCase() === teamName.toLowerCase();
    });
    return team ? team.participant.image_path : null;
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
        console.log("Prediction data missing home, away, or draw values");
        return null;
      }

      const maxValue = Math.max(home, away, draw);
      if (maxValue === home) return `Home (${home}%)`;
      if (maxValue === away) return `Away (${away}%)`;
      return `Draw (${draw}%)`;
    }
  };

  const getOverUnderPredictions = (overUnderPredictions: any) => {
    // Since overUnderPredictions is an object, we need to iterate over its entries
    const relevantPredictions = Object.entries(overUnderPredictions).filter(
      ([key, value]: [string, any]) =>
        [
          "home-over-under-0_5_probability",
          "away-over-under-1_5_probability",
          "",
        ].includes(key) // Adjust this if needed for how you identify relevant predictions
    );

    return relevantPredictions.map(([key, value]: [string, any]) => {
      const { yes, no } = value;
      const predominantValue = yes > no ? `Yes (${yes}%)` : `No (${no}%)`;
      return { name: key, predominantValue }; // Assuming `key` holds the name, otherwise adjust
    });
  };
  return (
    <div className="predictions">
      <h2 className="text-xl text-white font-bold mb-4">Upcoming Fixtures</h2>

      {/* Display upcoming fixtures */}
      <ul className="mb-6">
        {props.upcomingFixtures.map((fixture: any) => (
          <li key={fixture.id} className="mb-2">
            <button
              onClick={() => handleFixtureClick(fixture.id)}
              className="bg-gray-200 hover:bg-gray-300 text-black py-2 px-4 rounded w-full text-left"
            >
              {fixture.name} - {new Date(fixture.starting_at).toLocaleString()}
            </button>

            {/* Show predictions for the selected fixture */}
            {selectedFixture === fixture.id && predictions.length > 0 && (
              <div className="mt-4 bg-white p-4 border rounded-lg">
                <h3 className="text-lg font-bold mb-2">
                  Predictions for {fixture.name}
                </h3>
                <div>
                  {predictions.map((prediction: any) => {
                    const [homeTeamName, awayTeamName] =
                      fixture.name.split(" vs ");
                    const homeTeamImage = findTeamImage(homeTeamName);
                    const awayTeamImage = findTeamImage(awayTeamName);
                    const gameTime = new Date(
                      fixture.starting_at
                    ).toLocaleString();

                    // Pass the full prediction object to getPredominantResult
                    const fullTimePrediction = getPredominantResult(prediction);

                    // Over/Under predictions
                    const overUnderPredictions = getOverUnderPredictions(
                      prediction.predictions
                    );

                    return (
                      <div key={prediction.id} className="mb-4">
                        {/* Team Images */}
                        <div className="flex w-full justify-center items-center mb-2">
                          <img
                            src={homeTeamImage}
                            alt={`${homeTeamName} logo`}
                            className="w-12 h-12 object-cover"
                          />
                          <span className="mx-2">VS</span>
                          <img
                            src={awayTeamImage}
                            alt={`${awayTeamName} logo`}
                            className="w-12 h-12 object-cover"
                          />
                        </div>

                        {/* Game Details */}
                        <div className="text-center">
                          <h3 className="text-lg font-semibold">
                            {fixture.name}
                          </h3>
                          <p>{gameTime}</p>
                        </div>

                        {/* Prediction Results */}
                        <div className="mt-4">
                          <p className="font-bold">
                            Full-Time Result: {fullTimePrediction}
                          </p>
                          <h4 className="mt-2 font-semibold">
                            Over/Under Predictions:
                          </h4>
                          {overUnderPredictions.map(
                            (overUnder: any, index: number) => (
                              <p key={index}>
                                {overUnder.name}: {overUnder.predominantValue}
                              </p>
                            )
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
