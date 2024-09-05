/** @format */

import React from "react";

export default function PredictionsModal(data: any) {
  data = [];

  const analysisText =
    "This product shows great potential in the market, with strong competition but also clear advantages in price and features. The customer sentiment analysis suggests positive feedback, particularly regarding ease of use and support.";

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* First Table */}
      <div className="">
        <table className="bg-white h-full table-auto w-full border border-gray-300 text-center">
          <thead className="uppercase bg-gray-100">
            <tr>
              <th className="py-2" colSpan={2}>
                Full Time Result
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border px-4 py-2">Home</td>
              <td className="border px-4 py-2">16.47</td>
            </tr>
            <tr>
              <td className="border px-4 py-2">Draw</td>
              <td className="border px-4 py-2">16.46</td>
            </tr>
            <tr>
              <td className="border px-4 py-2">Away</td>
              <td className="border px-4 py-2">26.33</td>
            </tr>
            <tr>
              <td className="border px-4 py-2">BTTS</td>
              <td className="border px-4 py-2">37.34</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Second Table */}
      <div>
        <table className="bg-white table-auto w-full border border-gray-300 text-center">
          <thead className="uppercase bg-gray-100">
            <tr>
              <th colSpan={5} className="py-2">
                Over/Under for Teams vs Team Full Time
              </th>
            </tr>
            <tr>
              <th className="py-2">Team</th>
              <th className="py-2 px-4">Over 0.5</th>
              <th className="py-2 px-4">Over 1.5</th>
              <th className="py-2 px-4">Under 0.5</th>
              <th className="py-2 px-4">Under 1.5</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border px-4 py-2">Home</td>
              <td className="border px-4 py-2">16.54</td>
              <td className="border px-4 py-2">16.54</td>
              <td className="border px-4 py-2">16.54</td>
              <td className="border px-4 py-2">16.54</td>
            </tr>
            <tr>
              <td className="border px-4 py-2">Away</td>
              <td className="border px-4 py-2">18.30</td>
              <td className="border px-4 py-2">18.30</td>
              <td className="border px-4 py-2">18.30</td>
              <td className="border px-4 py-2">18.30</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="bg-white border border-gray-300 p-4 rounded-lg shadow-lg">
        <h3 className="text-lg font-semibold mb-2">Product Analysis</h3>
        <blockquote className="border-l-4 border-blue-500 italic pl-4 text-gray-700">
          {analysisText}
        </blockquote>
      </div>

      <div>
        <table className="bg-white table-auto w-full border border-gray-300 text-center">
          <thead className="uppercase bg-gray-100">
            <tr>
              <th colSpan={5} className="py-2">
                Over/Under Total Goals
              </th>
            </tr>
            <tr>
              <th className="py-2">Goals</th>
              <th className="py-2 px-4">Over 2.5</th>
              <th className="py-2 px-4">Over 3.5</th>
              <th className="py-2 px-4">Under 2.5</th>
              <th className="py-2 px-4">Under 3.5</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border px-4 py-2">Home</td>
              <td className="border px-4 py-2">18.75</td>
              <td className="border px-4 py-2">12.34</td>
              <td className="border px-4 py-2">10.54</td>
              <td className="border px-4 py-2">8.44</td>
            </tr>
            <tr>
              <td className="border px-4 py-2">Away</td>
              <td className="border px-4 py-2">15.65</td>
              <td className="border px-4 py-2">11.22</td>
              <td className="border px-4 py-2">9.87</td>
              <td className="border px-4 py-2">7.56</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
