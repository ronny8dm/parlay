/** @format */

import React from "react";
import "./StandingsBoard.css";

interface StandingsProps {
  data: any;
  selectedLeague: string;
}

export default function StandingsBoard(props: StandingsProps) {
  const { data, selectedLeague } = props;

  console.log("data in standings board ", data);
  console.log("selected league: ", selectedLeague);

  const standingsArray = data.data;

  if (!Array.isArray(standingsArray)) {
    console.error(
      "Expected standingsArray to be an array, but got:",
      standingsArray
    );
  }

  const standingsData = standingsArray.map((teamData: any) => {
    const { name: teamName, image_path: logo } = teamData.participant;
    const standingsDetails = teamData.details
      .filter((detail: any) => [133, 130, 132, 187].includes(detail.type_id))
      .map((detail: any) => ({
        heading: detail.type.name,
        value: detail.value,
      }));

    return {
      teamName,
      logo,
      standingsDetails,
    };
  });

  const statsHeaders = [
    "Team",
    ...standingsData[0]?.standingsDetails.map((detail: any) => detail.heading),
  ];

  return (
    <div className="overflow-x-auto">
      <table className=" w-full text-sm text-center rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            {statsHeaders.map((header, index) => (
              <th scope="col" className="px-6 py-3" key={index}>
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {standingsData.map((team: any, index: number) => (
            <tr
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              key={index}
            >
              <th
                scope="row"
                className={`px-4 items-center flex font-medium text-gray-900 whitespace-nowrap dark:text-white ${
                  index % 2 === 0 ? "bg-secondary-200" : "cell-light"
                }`}
              >
                <img
                  className="py-1"
                  src={team.logo}
                  alt={`${team.teamName} logo`}
                  style={{ width: "30px", marginRight: "8px" }}
                />
                {team.teamName}
              </th>
              {team.standingsDetails.map((detail: any, detailIndex: number) => (
                <td
                  key={detailIndex}
                  className={`${
                    index % 2 === 0 ? "bg-secondary-200" : "cell-light"
                  }`}
                >
                  {detail.value}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
