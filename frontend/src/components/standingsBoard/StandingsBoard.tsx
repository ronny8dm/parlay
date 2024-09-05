/** @format */

import React from "react";
import "./StandingsBoard.css";

interface StandingsProps {
  data: any;
  selectedLeague: string;
}

export default function StandingsBoard(props: StandingsProps) {
  const { data, selectedLeague } = props;
  console.log("selected league: ", selectedLeague);

  const standingsArray = data.data;

  if (!Array.isArray(standingsArray)) {
    console.error(
      "Expected standingsArray to be an array, but got:",
      standingsArray
    );
  }

  const getInitials = (name: string) => {
    const words = name.split(" ");
    if (words.length === 1) {
      // For single-word names like "Arsenal", take the first three letters
      return words[0].slice(0, 3).toUpperCase();
    } else {
      // For multi-word names, combine first letters or add more letters as needed
      let abbreviation = words
        .map((word) => word[0])
        .join("")
        .toUpperCase();

      // If abbreviation is less than 3 characters, add more letters from the words
      if (abbreviation.length < 3) {
        for (let i = 0; i < words.length && abbreviation.length < 3; i++) {
          abbreviation += words[i].slice(1, 2).toUpperCase();
        }
      }

      // Ensure the abbreviation is exactly 3 characters
      return abbreviation.slice(0, 3);
    }
  };

  const getHeaderAbbreviation = (typeId: number) => {
    switch (typeId) {
      case 133:
        return "G";
      case 130:
        return "W";
      case 132:
        return "L";
      case 187:
        return "PT";
      default:
        return "";
    }
  };

  const standingsData = standingsArray.map((teamData: any) => {
    const { name: teamName, image_path: logo } = teamData.participant;
    const teamAbbreviation = getInitials(teamName);
    const standingsDetails = teamData.details
      .filter((detail: any) => [133, 130, 132, 187].includes(detail.type_id))
      .map((detail: any) => ({
        heading: getHeaderAbbreviation(detail.type_id),
        value: detail.value,
      }));

    return {
      teamName,
      teamAbbreviation,
      logo,
      standingsDetails,
    };
  });

  const statsHeaders = [
    "Team",
    ...standingsData[0]?.standingsDetails.map((detail: any) => detail.heading),
  ];

  return (
    <div className="relative w-full sm:w-2/3 h-96 overflow-y-auto">
      <table className=" w-full text-xs sm:text-sm md:text-base text-center rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            {statsHeaders.map((header, index) => (
              <th
                scope="col"
                className={`px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm `}
                key={index}
              >
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
                className={`px-2 sm:px-4 py-2 sm:py-3 items-center flex font-medium text-gray-900 whitespace-nowrap dark:text-white ${
                  index % 2 === 0 ? "bg-secondary-200" : "cell-light"
                }`}
              >
                <img
                  className="w-6 sm:w-6 md:w-10 mr-2 sm:mr-3"
                  src={team.logo}
                  alt={`${team.teamName} logo`}
                  style={{ width: "30px", marginRight: "8px" }}
                />
                <span className="hidden sm:inline">{team.teamName}</span>
                <span className="inline sm:hidden">
                  {team.teamAbbreviation}
                </span>
              </th>
              {team.standingsDetails.map((detail: any, detailIndex: number) => (
                <td
                  key={detailIndex}
                  className={`px-2 sm:px-4 py-2 sm:py-3 ${
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
