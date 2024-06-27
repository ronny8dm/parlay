/** @format */

import { SportInterface } from "./SportInterface";

export interface ResponseDataInterface {
  [key: string]: {
    sports: SportInterface[];
  };
}
