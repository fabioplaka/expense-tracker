import { StatusBar } from "expo-status-bar";
import { Navigator } from "./src/navigation/Navigator";
import ExpensesContextProvider from "./src/store/expenses-context";

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <ExpensesContextProvider>
        <Navigator />
      </ExpensesContextProvider>
    </>
  );
}
