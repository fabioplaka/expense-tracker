import { StyleSheet, View } from "react-native";
import React from "react";
import ExpensesSummary from "./ExpensesSummary";
import ExpensesList from "./ExpensesList";
import { GlobalStyles } from "../../constants/styles";

const ExpensesOutput = ({ expenses, expensesPeriod }) => {
  const DUMMY_DATA = [
    {
      id: "1",
      description: "Book",
      amount: 10.99,
      date: new Date("2023-03-21"),
    },
    {
      id: "2",
      description: "Book",
      amount: 10.99,
      date: new Date("2023-03-21"),
    },
    {
      id: "3",
      description: "Book",
      amount: 10.99,
      date: new Date("2023-03-21"),
    },
    {
      id: "4",
      description: "Book",
      amount: 10.99,
      date: new Date("2023-03-21"),
    },
    {
      id: "5",
      description: "Book",
      amount: 10.99,
      date: new Date("2023-03-21"),
    },
    {
      id: "6",
      description: "Book",
      amount: 10.99,
      date: new Date("2023-03-21"),
    },

    {
      id: "7",
      description: "Book",
      amount: 10.99,
      date: new Date("2023-03-21"),
    },
    {
      id: "8",
      description: "Book",
      amount: 10.99,
      date: new Date("2023-03-21"),
    },
    {
      id: "9",
      description: "Book",
      amount: 10.99,
      date: new Date("2023-03-21"),
    },
    {
      id: "10",
      description: "Book",
      amount: 10.99,
      date: new Date("2023-03-21"),
    },
    {
      id: "11",
      description: "Book",
      amount: 10.99,
      date: new Date("2023-03-21"),
    },
  ];
  return (
    <View style={styles.container}>
      <ExpensesSummary expenses={DUMMY_DATA} periodName={expensesPeriod} />
      <ExpensesList expenses={DUMMY_DATA} />
    </View>
  );
};

export default ExpensesOutput;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 0,
    backgroundColor: GlobalStyles.colors.primary700,
  },
});
