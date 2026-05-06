const Totals = ({ income, expense }) => {
    return (
      <div className="totals">
        <div className="total-card">
          <h4>Income</h4>
          <p>₹{income}</p>
        </div>
  
        <div className="total-card">
          <h4>Expense</h4>
          <p>₹{expense}</p>
        </div>
      </div>
    );
  };
  
  export default Totals;