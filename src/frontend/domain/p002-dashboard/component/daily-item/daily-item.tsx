const DailyItem = (props: { date: string; expense: Expense[] }) => {
  const { date, expense } = props;

  const totalExpense = expense
    .filter((expe) => expe.expenseType == 'expenses')
    .reduce((acc, curr) => acc + Number(curr.amount), 0);

  return (
    <div className="w-full h-auto flex flex-col overflow-x-auto mb-12 shadow-lg border-2 rounded-md p-4">
      <h1>{date}</h1>

      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Subject</th>
            <th className="py-2 px-4 border-b">Category</th>
            <th className="py-2 px-4 border-b">Amount</th>
          </tr>
        </thead>
        <tbody>
          {expense.map((expense, index) => (
            <tr key={index}>
              <td className="py-2 px-4 border-b">{expense.subject}</td>
              <td className="py-2 px-4 border-b">{expense.category}</td>
              <td className="py-2 px-4 border-b">{expense.amount}</td>
            </tr>
          ))}
          <tr>
            <td className="py-2 px-4 border-b">Total</td>
            <td className="py-2 px-4 border-b"></td>
            <td className="py-2 px-4 border-b">{totalExpense}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default DailyItem;
