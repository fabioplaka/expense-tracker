import { StyleSheet, Text, View } from "react-native";
import React, { useContext, useLayoutEffect } from "react";
import IconButton from "../components/UI/IconButton";
import { GlobalStyles } from "../constants/styles";
import Button from "../components/UI/Button";
import { ExpensesContext } from "../store/expenses-context";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";
import { storeExpense } from "../api/storeExpense";

const ManageExpense = ({ route, navigation }) => {
  const expensesContext = useContext(ExpensesContext);

  const editedExpenseId = route.params?.expenseId;

  const selectedExpense = expensesContext.expenses.find(
    (expense) => expense.id === editedExpenseId
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      title: !!editedExpenseId ? "Edit Expense" : "Add Expense",
    });
  }, [navigation, editedExpenseId]);

  const confirmHandler = async (expenseData) => {
    if (!!editedExpenseId) {
      expensesContext.updateExpense(editedExpenseId, expenseData);
    } else {
      const id = await storeExpense(expenseData);
      expensesContext.addExpense({ ...expenseData, id });
    }
    navigation.goBack();
  };

  const cancelHandler = () => {
    navigation.goBack();
  };

  const deleteExpenseHandler = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <ExpenseForm
        submitLabel={!!editedExpenseId ? "Update" : "Add"}
        onCancel={cancelHandler}
        onSubmit={confirmHandler}
        defaultValues={selectedExpense}
      />

      {!!editedExpenseId && (
        <View style={styles.deleteContainer}>
          <IconButton
            icon={"trash"}
            color={GlobalStyles.colors.error500}
            size={36}
            onPress={deleteExpenseHandler}
          />
        </View>
      )}
    </View>
  );
};

export default ManageExpense;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800,
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: "center",
  },
});
