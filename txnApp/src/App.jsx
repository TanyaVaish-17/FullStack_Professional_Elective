import { useState } from "react";
import Form from "./components/Form";
import TransactionList from "./components/Transaction-List";
import Totals from "./components/totals";
import { sum } from "./utils/Utils";

function App() {
  const [transactions, setTransactions] = useState([]);

  const addTransaction = (transaction) => {
    setTransactions([...transactions, transaction]);
  };

  const deleteTransaction = (id) => {
    setTransactions(
      transactions.filter((t) => t.id !== id)
    );
  };

  const totals = sum(transactions);

  return (
  <div className="app-container">
    <h2>💰 Expense Tracker</h2>

    <Totals income={totals.income} expense={totals.expense} />

    <Form addTransaction={addTransaction} />

    <TransactionList
      transactions={transactions}
      deleteTransaction={deleteTransaction}
    />
  </div>
  );
}

export default App;