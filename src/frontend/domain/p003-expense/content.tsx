import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { CreateExpense } from '../../global/api/firebase/service/expense/expense';
import { GetSetMethodStoreGlobal } from '../../global/store';
import { UseStoreGlobalPersist } from '../../global/store/persist';
import { IContentData } from '.';

const Content = (props: { domainName: string; data?: IContentData | null }) => {
  const { domainName, data } = props;

  const navigate = useNavigate();
  const { auth } = UseStoreGlobalPersist(['auth']);
  const { setIsLoading } = GetSetMethodStoreGlobal();

  if (!data || !auth) {
    return <></>;
  }
  const [formData, setFormData] = useState<Expense>({
    subject: '',
    expenseType: 'expenses',
    dateTime: '',
    merchant: '',
    description: '',
    category: data.category[0].id,
    amount: 0,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]:
        name == 'category'
          ? data.category.filter((cate) => {
              return cate.name == value;
            })[0].id
          : value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here

    (async () => {
      setIsLoading(true);
      const res = await CreateExpense({
        uid: auth?.uid,
        expense: formData,
      });

      setIsLoading(false);
      navigate('/user');
      console.log(res);
    })();
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow-md rounded-md">
      <h1 className="text-2xl font-bold mb-4">Expense</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Subject:</label>
          <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Amount:</label>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Category:</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          >
            {data.category.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Expense Type:</label>
          <select
            name="expenseType"
            value={formData.expenseType}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          >
            <option value="expenses">Expenses</option>
            <option value="income">Income</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Date and Time:</label>
          <input
            type="datetime-local"
            name="dateTime"
            value={formData.dateTime}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Merchant:</label>
          <input
            type="text"
            name="merchant"
            value={formData.merchant}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Description:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white px-3 py-2 rounded-md hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Content;
