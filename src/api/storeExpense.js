import axios from "axios";
import { BASE_URL } from "./constants";

export const storeExpense = async (expenseData) => {
  const response = await axios.post(BASE_URL + "expenses.json", expenseData);
  const id = response.data.name;
  return id;
};
