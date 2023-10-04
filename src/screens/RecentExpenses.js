import React, { useContext, useEffect, useState } from "react";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { ExpensesContext } from "../store/expenses-context";
import { getDateMinusDays } from "../util/date";
import { fetchExpenses } from "../api/getExpenses";
import Loader from "../components/UI/Loader";
import Error from "../components/UI/Error";

const RecentExpenses = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const expensesCtx = useContext(ExpensesContext);

  useEffect(() => {
    const getExpenses = async () => {
      setLoading(true);
      try {
        const expenses = await fetchExpenses();
        expensesCtx.setExpenses(expenses);
      } catch (error) {
        setError("Could not fetch expenses!");
      }
      setLoading(false);
    };

    getExpenses();
  }, []);

  const recentExpenses = expensesCtx.expenses.filter((expense) => {
    const today = new Date();
    const date7DaysAgo = getDateMinusDays(today, 7);

    return expense.date >= date7DaysAgo && expense.date <= today;
  });

  if (loading) {
    return <Loader />;
  }

  if (error && !loading) {
    return <Error message={error} />;
  }

  return (
    <ExpensesOutput
      expensesPeriod="Last 9 days"
      expenses={recentExpenses}
      fallbackText={"No registered expenses for the last 7 days."}
    />
  );
};

export default RecentExpenses;
