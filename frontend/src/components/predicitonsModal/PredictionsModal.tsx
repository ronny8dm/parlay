/** @format */

import React from "react";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";

interface PredictionsModalProps {
  isOpen: boolean;
  closeModal: () => void;
  data: any;
}

export default function PredictionsModal({
  isOpen,
  closeModal,
  data,
}: PredictionsModalProps) {
  if (!data) {
    return null;
  }

  console.log(JSON.stringify(data));
  const analysisText =
    "This product shows great potential in the market, with strong competition but also clear advantages in price and features. The customer sentiment analysis suggests positive feedback, particularly regarding ease of use and support.";

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

              {/* Second Table */}
              <div className="bg-white shadow-md rounded-lg overflow-x-scroll">
                <table className="w-full text-left text-sm">
                  <thead className="bg-gray-200 text-gray-600">
                    <tr>
                      <th className="px-6 py-3" colSpan={5}>
                        Over/Under for Teams vs Team Full Time
                      </th>
                    </tr>
                    <tr>
                      <th className="px-6 py-3">Team</th>
                      <th className="px-6 py-3 text-center">Over 0.5</th>
                      <th className="px-6 py-3 text-center">Over 1.5</th>
                      <th className="px-6 py-3 text-center">Under 0.5</th>
                      <th className="px-6 py-3 text-center">Under 1.5</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-300">
                    <tr>
                      <td className="px-6 py-4">Home</td>
                      <td className="px-6 py-4 text-center">16.54%</td>
                      <td className="px-6 py-4 text-center">16.54%</td>
                      <td className="px-6 py-4 text-center">16.54%</td>
                      <td className="px-6 py-4 text-center">16.54%</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4">Away</td>
                      <td className="px-6 py-4 text-center">18.30%</td>
                      <td className="px-6 py-4 text-center">18.30%</td>
                      <td className="px-6 py-4 text-center">18.30%</td>
                      <td className="px-6 py-4 text-center">18.30%</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Analysis Section */}
              <div className="bg-white order-4 shadow-md rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-2">Product Analysis</h3>
                <blockquote className="border-l-4 border-blue-500 italic pl-4 text-gray-700">
                  {analysisText}
                </blockquote>
              </div>

              {/* Third Table */}
              <div className="bg-white shadow-md rounded-lg overflow-auto col-span-full">
                <table className="w-full text-left text-sm">
                  <thead className="bg-gray-200 text-gray-600">
                    <tr>
                      <th className="px-6 py-3" colSpan={5}>
                        Over/Under Total Goals
                      </th>
                    </tr>
                    <tr>
                      <th className="px-6 py-3">Goals</th>
                      <th className="px-6 py-3 text-center">Over 2.5</th>
                      <th className="px-6 py-3 text-center">Over 3.5</th>
                      <th className="px-6 py-3 text-center">Under 2.5</th>
                      <th className="px-6 py-3 text-center">Under 3.5</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-300">
                    <tr>
                      <td className="px-6 py-4">Home</td>
                      <td className="px-6 py-4 text-center">18.75%</td>
                      <td className="px-6 py-4 text-center">12.34%</td>
                      <td className="px-6 py-4 text-center">10.54%</td>
                      <td className="px-6 py-4 text-center">8.44%</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4">Away</td>
                      <td className="px-6 py-4 text-center">15.65%</td>
                      <td className="px-6 py-4 text-center">11.22%</td>
                      <td className="px-6 py-4 text-center">9.87%</td>
                      <td className="px-6 py-4 text-center">7.56%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
