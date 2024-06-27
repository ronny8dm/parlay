/** @format */

import { TeamInterface } from "./TeamInterface";

export interface LeagueInterface {
  id: string;
  uid: string;
  name: string;
  abbreviation: string;
  shortName: string;
  slug: string;
  teams: { team: TeamInterface }[];
}
