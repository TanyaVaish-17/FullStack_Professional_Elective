import TransactionItem from "./Transaction-item";

const TransactionList = ({ transactions, deleteTransaction }) => {
  return (
    <div>
      <h3>Transactions</h3>
      {transactions.map((transaction) => (
        <TransactionItem
          key={transaction.id}
          transaction={transaction}
          deleteTransaction={deleteTransaction}
        />
      ))}
    </div>
  );
};

export default TransactionList;