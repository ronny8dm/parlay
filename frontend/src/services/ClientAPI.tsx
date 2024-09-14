/** @format */

import axios from "axios";

export default function ClientAPI() {
  const url = "http://192.168.0.27:8000";

  const getLeagues = async () => {
    try {
      const response = await axios.get(`${url}/leagues`);
      const data = response.data;
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
      return data;
    } catch (error) {
      console.error("Error fetching standings:", error);
      throw error;
    }
  };

  const getPredictions = async (fixtureId: number, page: number) => {
    try {
      const response = await axios.get(
        `${url}/predictions/${fixtureId}/${page}`
      );
      const data = response.data;
      return data;
    } catch (error) {
      console.error(`error fetching predictions: ${error}`);
      throw error;
    }
  };

  const generateAnalysis = async (fixtureData: any) => {
    try {
      const response = await axios.post(
        `${url}/generate-analysis/`,
        fixtureData
      );
      const data = response.data;
      console.log(data);
      return data;
    } catch (error) {
      console.log(fixtureData);
      console.error("Error generating analysis:", error, fixtureData);
      throw error;
    }
  };

  return {
    getLeagues,
    getStandings,
    getPredictions,
    generateAnalysis,
  };
}
