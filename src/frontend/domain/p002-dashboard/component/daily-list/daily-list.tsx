import DailyItem from '../daily-item/daily-item';

const GetDailyExpense = (expense: Expense[], category: Category[]) => {
  const data: any = {};

  expense.forEach((expe) => {
    const date = new Date(expe.dateTime);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear();

    const dateTime = `${year}-${month}-${day}`;

    if (data[dateTime]) {
      data[dateTime].expense.push(expe);
    } else {
      data[dateTime] = {
        date: dateTime,
        expense: [expe],
      };
    }
  });

  return Object.entries(data).map(([date, value]) => ({
    ...(value as any),
  }));
};

const DailyList = (props: { expense: Expense[]; category: Category[] }) => {
  const { expense, category } = props;

  return (
    <div className="w-full h-auto flex flex-col space-y-3 mt-14">
      <h1>Daily Usage</h1>
      {/* filter */}
      <div className="w-full h-[1px]">
        <div className="w-full h-full bg-slate-300 rounded-md"></div>
      </div>
      {GetDailyExpense(expense, category).map((daily, index) => {
        return <DailyItem date={daily.date} expense={daily.expense} key={index} />;
      })}
    </div>
  );
};

export default DailyList;
