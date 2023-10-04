import React, { useContext, useEffect } from "react";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { ExpensesContext } from "../store/expenses-context";
import { getDateMinusDays } from "../util/date";
import { fetchExpenses } from "../api/getExpenses";

const RecentExpenses = () => {
  const expensesCtx = useContext(ExpensesContext);

  useEffect(() => {
    const getExpenses = async () => {
      const expenses = await fetchExpenses();
      expensesCtx.setExpenses(expenses);
    };

    getExpenses();
  }, []);

  const recentExpenses = expensesCtx.expenses.filter((expense) => {
    const today = new Date();
    const date7DaysAgo = getDateMinusDays(today, 7);

    return expense.date >= date7DaysAgo && expense.date <= today;
  });

  return (
    <ExpensesOutput
      expensesPeriod="Last 9 days"
      expenses={recentExpenses}
      fallbackText={"No registered expenses for the last 7 days."}
    />
  );
};

export default RecentExpenses;
