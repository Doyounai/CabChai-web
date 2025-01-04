const ExpenseItem = (props: { expense: Expense[]; category: Category }) => {
  const { expense, category } = props;

  const amount = expense.reduce((acc, curr) => acc + Number(curr.amount as number), 0);

  console.log(amount);

  return (
    <div className="w-full h-auto p-4 shadow-lg border-2 rounded-md flex flex-col space-y-2">
      <div className="w-full flex flex-col space-y-3 justify-between items-start">
        <div className="flex space-x-2 items-end">
          <h1 className="bg-[#fbbd14] text-white rounded-full w-[50px] text-center h-[50px] flex items-center justify-center">
            ฿
          </h1>
          <h1>{amount}฿</h1>
        </div>
        <p className="font-semibold text-slate-600">{category.name.toUpperCase()}</p>
      </div>
      <div className="w-full h-auto flex items-center space-x-3">
        <div className="w-full h-[15px] rounded-md bg-slate-300 overflow-hidden">
          <div
            style={{
              width: `${(amount / category.usageLimit) * 100}%`,
              backgroundColor: category.color,
            }}
            className={`h-full`}
          ></div>
        </div>
        <p>{`${((amount / category.usageLimit) * 100).toFixed(0)}%`}</p>
      </div>
    </div>
  );
};

export default ExpenseItem;
