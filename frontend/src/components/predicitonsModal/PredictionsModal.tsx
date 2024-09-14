/** @format */

import React from "react";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";

interface PredictionsModalProps {
  isOpen: boolean;
  closeModal: () => void;
  data: any;
  analysisData: any;
}

export default function PredictionsModal({
  isOpen,
  closeModal,
  data,
  analysisData,
}: PredictionsModalProps) {
  if (!data && !analysisData) {
    return null;
  }

  const analysisText = analysisData.data.analysis;

  const homeGoalsTypeIds = [334, 331];
  const awayGoalsTypeIds = [333, 332];
  const totalGoalsTypeIds = [234, 235, 236];

  console.log("data analysis in modal: ", analysisData);
  // Filter the data based on the type_ids for home and away teams
  const homePredictions = data.filter((prediction: any) =>
    homeGoalsTypeIds.includes(prediction.type_id)
  );
  const awayPredictions = data.filter((prediction: any) =>
    awayGoalsTypeIds.includes(prediction.type_id)
  );
  const totalGoalsPredictions = data.filter((prediction: any) =>
    totalGoalsTypeIds.includes(prediction.type_id)
  );

  // Combine home and away predictions for unique headers
  const combinedPredictions = [...homePredictions, ...awayPredictions];
  const uniqueHeaders = [
    ...new Set(
      combinedPredictions.map((prediction: any) => {
        const overUnderNumber = prediction.type.name.match(/\d+(\.\d+)?/);
        return overUnderNumber ? overUnderNumber[0] : "";
      })
    ),
  ];

  console.log(JSON.stringify(data));
  return (
    <Dialog open={isOpen} onClose={closeModal} className="absolute z-10">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
      />
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel className="relative transform overflow-hidden rounded-lg bg-background text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
            <div className="flex flex-col gap-6 bg-background p-8">
              {/* First Table */}
              {data.map((prediction: any, index: number) => {
                // Only render table for type_id 237 (Full Time Result)
                if (prediction.type_id === 237) {
                  const bttsPrediction = data.find(
                    (pred: any) => pred.type_id === 231
                  ); // Find the BTTS prediction if it exists

                  return (
                    <div
                      key={index}
                      className="bg-white shadow-md rounded-lg overflow-hidden"
                    >
                      <table className="w-full text-left text-sm">
                        <thead className="bg-gray-200 text-gray-600">
                          <tr>
                            <th className="px-6 py-3" colSpan={2}>
                              Full Time Result
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-300">
                          <tr>
                            <td className="px-6 py-4">Home</td>
                            <td className="px-6 py-4 text-right">
                              {prediction.predictions?.home !== undefined
                                ? `${prediction.predictions.home}%`
                                : "N/A"}
                            </td>
                          </tr>
                          <tr>
                            <td className="px-6 py-4">Draw</td>
                            <td className="px-6 py-4 text-right">
                              {prediction.predictions?.draw !== undefined
                                ? `${prediction.predictions.draw}%`
                                : "N/A"}
                            </td>
                          </tr>
                          <tr>
                            <td className="px-6 py-4">Away</td>
                            <td className="px-6 py-4 text-right">
                              {prediction.predictions?.away !== undefined
                                ? `${prediction.predictions.away}%`
                                : "N/A"}
                            </td>
                          </tr>

                          {/* Check and display BTTS (type_id 231) */}
                          {bttsPrediction && (
                            <tr>
                              <td className="px-6 py-4">BTTS</td>
                              <td className="px-6 py-4 text-right">
                                {bttsPrediction.predictions?.yes !==
                                  undefined &&
                                bttsPrediction.predictions?.no !== undefined
                                  ? bttsPrediction.predictions.yes >
                                    bttsPrediction.predictions.no
                                    ? `${bttsPrediction.predictions.yes}%`
                                    : `${bttsPrediction.predictions.no}%`
                                  : "N/A"}
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  );
                }
                return null;
              })}

              <div className="bg-white shadow-md rounded-lg overflow-x-scroll">
                <table className="w-full text-left text-sm">
                  <thead className="bg-gray-200 text-gray-600">
                    <tr>
                      <th className="px-6 py-3">Team</th>
                      {/* Dynamically add table headers for unique Over/Under values */}
                      {uniqueHeaders.map((header, index) => (
                        <React.Fragment key={index}>
                          <th className="px-6 py-3 text-center">
                            Over {header}
                          </th>
                          <th className="px-6 py-3 text-center">
                            Under {header}
                          </th>
                        </React.Fragment>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-300">
                    {/* Row for Home */}
                    <tr>
                      <td className="px-6 py-4">Home</td>
                      {uniqueHeaders.map((header, index) => {
                        const homePrediction = homePredictions.find(
                          (prediction: any) =>
                            prediction.type.name.includes(header)
                        );
                        const yes = homePrediction?.predictions?.yes;
                        const no = homePrediction?.predictions?.no;

                        return (
                          <React.Fragment key={index}>
                            <td className="px-6 py-4 text-center">
                              {yes !== undefined ? `${yes}%` : "N/A"}
                            </td>
                            <td className="px-6 py-4 text-center">
                              {no !== undefined ? `${no}%` : "N/A"}
                            </td>
                          </React.Fragment>
                        );
                      })}
                    </tr>

                    {/* Row for Away */}
                    <tr>
                      <td className="px-6 py-4">Away</td>
                      {uniqueHeaders.map((header, index) => {
                        const awayPrediction = awayPredictions.find(
                          (prediction: any) =>
                            prediction.type.name.includes(header)
                        );
                        const yes = awayPrediction?.predictions?.yes;
                        const no = awayPrediction?.predictions?.no;

                        return (
                          <React.Fragment key={index}>
                            <td className="px-6 py-4 text-center">
                              {yes !== undefined ? `${yes}%` : "N/A"}
                            </td>
                            <td className="px-6 py-4 text-center">
                              {no !== undefined ? `${no}%` : "N/A"}
                            </td>
                          </React.Fragment>
                        );
                      })}
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Analysis Section */}

              {/* Third Table */}
              <div className="bg-white shadow-md rounded-lg overflow-auto col-span-full">
                <table className="w-full text-left text-sm">
                  <thead className="bg-gray-200 text-gray-600">
                    <tr>
                      <th className="px-6 py-3" colSpan={4}>
                        Over/Under Total Goals
                      </th>
                    </tr>
                    <tr>
                      <th className="px-6 py-3">Goals</th>
                      {/* Dynamically add table headers based on the total goals type */}
                      {totalGoalsPredictions.map(
                        (prediction: any, index: number) => {
                          const overUnderNumber =
                            prediction.type.name.match(/\d+(\.\d+)?/);
                          const displayValue = overUnderNumber
                            ? overUnderNumber[0]
                            : "";
                          return (
                            <React.Fragment key={index}>
                              <th className="px-6 py-3 text-center">
                                Over {displayValue}
                              </th>
                              <th className="px-6 py-3 text-center">
                                Under {displayValue}
                              </th>
                            </React.Fragment>
                          );
                        }
                      )}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-300">
                    <tr>
                      <td className="px-6 py-4">Total</td>
                      {totalGoalsPredictions.map(
                        (prediction: any, index: number) => {
                          const yes = prediction.predictions?.yes;
                          const no = prediction.predictions?.no;
                          return (
                            <React.Fragment key={index}>
                              <td className="px-6 py-4 text-center">
                                {yes !== undefined ? `${yes}%` : "N/A"}
                              </td>
                              <td className="px-6 py-4 text-center">
                                {no !== undefined ? `${no}%` : "N/A"}
                              </td>
                            </React.Fragment>
                          );
                        }
                      )}
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="bg-white shadow-md rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-2">Product Analysis</h3>
                <p className="border-l-4 border-primary-500 italic pl-4 text-gray-700">
                  {analysisText}
                </p>
              </div>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
