import axios from "axios";
import { BASE_URL } from "./constants";

export const updateExpense = (id, expenseData) => {
  return axios.put(BASE_URL + `expenses/${id}.json`, expenseData);
};
