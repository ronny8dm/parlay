/** @format */

import axios from "axios";

export default function ClientAPI() {
  const url = "http://localhost:8000";

  const getLeagues = async () => {
    try {
      const response = await axios.get(`${url}/leagues`);
      const data = response.data;
      console.log("data: ", data);
      return response.data;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  };

  const getStandings = async (seasonId: number) => {
    try {
      const response = await axios.get(`${url}/standings/${seasonId}`);
      const data = response.data;
      console.log("standings: ", data);
      return response.data;
    } catch (error) {
      console.error("Error fetching standings:", error);
      throw error;
    }
  };

  return {
    getLeagues,
    getStandings,
  };
}
