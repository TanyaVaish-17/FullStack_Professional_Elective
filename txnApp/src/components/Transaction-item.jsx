const TransactionItem = ({ transaction, deleteTransaction }) => {
    return (
      <div
        className={`transaction ${
          transaction.type === "income" ? "income" : "expense"
        }`}
      >
        <span>{transaction.text}</span>
        <span>₹{transaction.amount}</span>
  
        <button
          className="delete-btn"
          onClick={() => deleteTransaction(transaction.id)}
        >
          Delete
        </button>
      </div>
    );
  };
  
  export default TransactionItem;