export const sum = (transactions) => {
    return transactions.reduce(
      (acc, curr) => {
        if (curr.type === "income") {
          acc.income += Number(curr.amount);
        } else {
          acc.expense += Number(curr.amount);
        }
        return acc;
      },
      { income: 0, expense: 0 }
    );
  };