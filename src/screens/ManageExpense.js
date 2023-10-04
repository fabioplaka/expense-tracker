import { StyleSheet, View } from "react-native";
import React, { useContext, useLayoutEffect, useState } from "react";
import IconButton from "../components/UI/IconButton";
import { GlobalStyles } from "../constants/styles";
import { ExpensesContext } from "../store/expenses-context";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";
import { storeExpense } from "../api/storeExpense";
import { updateExpense } from "../api/updateExpense";
import { deleteExpense } from "../api/deleteExpense";
import Loader from "../components/UI/Loader";

const ManageExpense = ({ route, navigation }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

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
    setLoading(true);
    try {
      if (!!editedExpenseId) {
        expensesContext.updateExpense(editedExpenseId, expenseData);
        await updateExpense(editedExpenseId, expenseData);
      } else {
        const id = await storeExpense(expenseData);
        expensesContext.addExpense({ ...expenseData, id });
      }
      navigation.goBack();
    } catch {
      setError("Could not save data, please try again later");
      setLoading(true);
    }
  };

  const cancelHandler = () => {
    navigation.goBack();
  };

  const deleteExpenseHandler = async () => {
    setLoading(true);
    try {
      await deleteExpense(editedExpenseId);
      expensesContext.deleteExpense(editedExpenseId);
      navigation.goBack();
    } catch (error) {
      setError("Could not delete expense, please try again later");
      setLoading(false);
    }
  };

  if (error && !loading) {
    return <Error message={error} />;
  }

  if (loading) {
    return <Loader />;
  }

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
