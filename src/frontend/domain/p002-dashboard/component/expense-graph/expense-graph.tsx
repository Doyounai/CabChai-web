import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import { GetMonthString } from '../../../../global/helper/time';
import { GetCategoryByID } from '../../../../global/utils/category-color';

const GetRechartDate = (expense: Expense[], category: Category[]) => {
  const data: any = {};

  expense.forEach((expe) => {
    const date = new Date(expe.dateTime);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear();

    const dateTime = `${year}-${month}-${day}`;
    const cate = GetCategoryByID(expe.category, category);

    if (cate) {
      if (data[dateTime]) {
        if (data[dateTime][cate.name]) {
          data[dateTime][cate.name] += Number(expe.amount);
        } else {
          data[dateTime][cate.name] = Number(expe.amount);
        }
      } else {
        data[dateTime] = {
          date: dateTime,
          [cate.name]: Number(expe.amount),
        };
      }
    }
  });

  return Object.entries(data).map(([date, value]) => ({
    ...(value as any),
  }));
};

const ExpenseGraph = (props: { expense: Expense[]; category: Category[] }) => {
  const { expense, category } = props;

  if (expense.length === 0) {
    return (
      <div className="w-full h-[280px] flex items-center justify-center">No data</div>
    );
  }

  const currentDate = new Date(expense[0].dateTime);

  return (
    <div className="w-full flex flex-col h-[280px]">
      <div className="w-full">
        <h2>{GetMonthString(currentDate.getMonth())}</h2>
      </div>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={500}
          height={300}
          data={GetRechartDate(expense, category)}
          margin={{
            top: 20,
            right: 30,
            // left: 20,
            bottom: 5,
          }}
          barSize={50}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          {category.map((cate, index) => {
            return <Bar dataKey={cate.name} stackId="a" fill={cate.color} key={index} />;
          })}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ExpenseGraph;
