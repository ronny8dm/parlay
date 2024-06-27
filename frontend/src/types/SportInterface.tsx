/** @format */

import { LeagueInterface } from "./LeagueInterface";

export interface SportInterface {
  id: string;
  uid: string;
  name: string;
  slug: string;
  leagues: LeagueInterface[];
}
