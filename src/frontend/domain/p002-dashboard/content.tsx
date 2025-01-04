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
        <button className="bg-white rounded-md flex p-3 items-center justify-between">
          <MdOutlineModeEditOutline size={50} />
          <p className="font-bold">Edit Category</p>
        </button>
        <button className="bg-white rounded-md flex p-3 items-center justify-between">
          <BiSolidFileExport size={50} />
          <p className="font-bold">Export CSV</p>
        </button>
      </div>
      <ExpenseUsage expense={expense} setExpese={setExpense} category={data.category} />
    </div>
  );
};

export default Content;
