import axios from "axios";
import { BASE_URL } from "./constants";

export const fetchExpenses = async (expenseData) => {
  const response = await axios.get(BASE_URL + "expenses.json", expenseData);
  const expenses = [];

  for (const key in response.data) {
    const expenseObj = {
      id: key,
      amount: response.data[key].amount,
      date: new Date(response.data[key].date),
      description: response.data[key].description,
    };
    expenses.push(expenseObj);
  }

  return expenses;
};
