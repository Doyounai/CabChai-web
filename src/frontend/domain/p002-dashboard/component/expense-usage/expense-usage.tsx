import DailyList from '../daily-list/daily-list';
import ExpenseGraph from '../expense-graph/expense-graph';
import ExpenseItem from '../expense-item/expense-item';

const ExpenseUsage = (props: {
  expense: Expense[];
  setExpese: (expense: Expense[]) => void;
  category: Category[];
}) => {
  const { expense, setExpese, category } = props;

  return (
    <div className="w-full h-auto bg-white p-4 flex flex-col space-y-3 rounded-md">
      <h1>Expense Usage</h1>
      {/* filter */}
      <div className="w-full h-[1px]">
        <div className="w-full h-full bg-slate-300 rounded-md"></div>
      </div>
      {/* graph */}
      <div className="w-full h-auto">
        <ExpenseGraph expense={expense} category={category} />
      </div>
      {/* items */}
      <div className="w-full h-auto flex flex-col space-y-3">
        {category.map((cate, index) => {
          return (
            <ExpenseItem
              category={cate}
              expense={expense.filter((expe) => expe.category == cate.id)}
              key={index}
            />
          );
        })}
      </div>
      <div className="w-full h-auto">
        <DailyList expense={expense} category={category} />
      </div>
    </div>
  );
};

export default ExpenseUsage;
