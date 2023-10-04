import axios from "axios";
import { BASE_URL } from "./constants";

export const deleteExpense = (id) => {
  return axios.delete(BASE_URL + `expenses/${id}.json`);
};
