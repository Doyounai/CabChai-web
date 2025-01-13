import React from 'react';

// interface Category {
//   id: string;
//   name: string;
//   priority: number;
//   usageLimit: number;
//   color: string;
// }

interface CreateCategoryModalProps {
  category: Category;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  onClose: () => void;
}

const CreateCategoryModal: React.FC<CreateCategoryModalProps> = ({
  category,
  onChange,
  onSubmit,
  onClose,
}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded-md shadow-md">
        <h2 className="text-xl font-bold mb-2">Create New Category</h2>
        <form onSubmit={onSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Name:</label>
            <input
              type="text"
              name="name"
              value={category.name}
              onChange={onChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Priority:</label>
            <input
              type="number"
              name="priority"
              value={category.priority}
              onChange={onChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Usage Limit:</label>
            <input
              type="number"
              name="usageLimit"
              value={category.usageLimit}
              onChange={onChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Color:</label>
            <input
              type="color"
              name="color"
              value={category.color}
              onChange={onChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white px-3 py-2 rounded-md hover:bg-gray-600 mr-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-green-500 text-white px-3 py-2 rounded-md hover:bg-green-600"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateCategoryModal;
