import { useState } from 'react';
import { BiSolidFileExport } from 'react-icons/bi';
import { MdAddShoppingCart } from 'react-icons/md';
import { MdOutlineModeEditOutline } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

import { IContentData } from '.';
import ExpenseUsage from './component/expense-usage/expense-usage';

const Content = (props: { domainName: string; data?: IContentData | null }) => {
  const { domainName, data } = props;

  if (!data) {
    return <></>;
  }

  const navigate = useNavigate();

  const [expense, setExpense] = useState<Expense[]>(data.expense);

  const totalExpense = expense
    .filter((expe) => expe.expenseType == 'expenses')
    .reduce((acc, curr) => acc + Number(curr.amount), 0);

  const totalIncome = expense
    .filter((expe) => expe.expenseType == 'income')
    .reduce((acc, curr) => acc + Number(curr.amount), 0);

  return (
    <div className="w-full h-screen flex flex-col p-5 space-y-5">
      <div className="menu-container w-full ">
        <button
          onClick={() => {
            navigate('/user/expense');
          }}
          className="bg-white rounded-md flex p-3 items-center justify-between"
        >
          <MdAddShoppingCart size={50} />
          <p className="font-bold">Add expense</p>
        </button>
        <button
          onClick={() => {
            navigate('/user/categoryedit');
          }}
          className="bg-white rounded-md flex p-3 items-center justify-between relative"
        >
          <MdOutlineModeEditOutline size={50} />
          <p className="font-bold">Edit Category</p>
          <div className="bingbing"></div>
        </button>
        <button className="bg-white rounded-md flex p-3 items-center justify-between">
          <BiSolidFileExport size={50} />
          <p className="font-bold">Export CSV</p>
        </button>
      </div>
      {/* total */}
      <div className="w-full h-full total-container">
        {/* total expense */}
        <div className="bg-white h-auto p-4 rounded-md flex space-x-3 w-full">
          <p>Total Expense</p>
          <div className="w-[5px] h-full bg-orange-500 "></div>
          <span className="flex space-x-2">
            <h1>{totalExpense}</h1>
            <p>฿</p>
          </span>
        </div>
        {/* total icome */}
        <div className="bg-white h-auto p-4 rounded-md flex space-x-3 w-full">
          <p>Total Icome</p>
          <div className="w-[5px] h-full bg-green-600 "></div>
          <span className="flex space-x-2">
            <h1>{totalIncome}</h1>
            <p>฿</p>
          </span>
        </div>
      </div>
      <ExpenseUsage expense={expense} setExpese={setExpense} category={data.category} />
    </div>
  );
};

export default Content;
