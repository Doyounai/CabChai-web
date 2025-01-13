import React, { useState } from 'react';

import { FirestoreAutoId } from '../../global/api/firebase';
import {
  CreateCategory,
  UpdateCategory,
} from '../../global/api/firebase/service/category/category';
import { GetSetMethodStoreGlobal } from '../../global/store';
import { UseStoreGlobalPersist } from '../../global/store/persist';
import { IContentData } from '.';
import CreateCategoryModal from './components/category-create/category-create';
import EditCategoryModal from './components/category-edit/category-edit';

const Content = (props: { domainName: string; data?: IContentData }) => {
  const { domainName, data } = props;

  const { auth } = UseStoreGlobalPersist(['auth']);
  const { setIsLoading } = GetSetMethodStoreGlobal();

  const [categories, setCategories] = useState<Category[]>(data?.category || []);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [newCategory, setNewCategory] = useState<Category>({
    id: '',
    name: '',
    priority: 0,
    usageLimit: 0,
    color: '',
  });
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (editingCategory) {
      setEditingCategory({ ...editingCategory, [e.target.name]: e.target.value });
    }
  };

  const handleNewChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewCategory({ ...newCategory, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingCategory) {
      // console.log(editingCategory);

      setIsLoading(true);
      const res = await UpdateCategory({
        uid: auth?.uid || '',
        categoryID: editingCategory.id,
        cate: editingCategory,
      });

      if (res.error == undefined) {
        setIsLoading(false);
      }

      setCategories(
        categories.map((cat: Category) =>
          cat.id === editingCategory.id ? editingCategory : cat,
        ),
      );

      setEditingCategory(null);
      setIsEditModalOpen(false);
    }
  };

  const handleNewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsLoading(true);

    const temp = { ...newCategory, id: FirestoreAutoId() };

    const res = await CreateCategory({
      uid: auth?.uid || '',
      cate: temp,
    });

    if (res.error == undefined) {
      setIsLoading(false);

      setCategories([...categories, temp]);
      setNewCategory({ id: '', name: '', priority: 0, usageLimit: 0, color: '' });
      setIsCreateModalOpen(false);
    }
  };

  const handleEditClick = (category: Category) => {
    setEditingCategory(category);
    setIsEditModalOpen(true);
  };

  const handleCreateClick = () => {
    setIsCreateModalOpen(true);
  };

  if (!data) {
    return <></>;
  }

  return (
    <div className="max-w-4xl mx-auto p-4 bg-white shadow-md rounded-md">
      <h1 className="text-2xl font-bold mb-4">{domainName}</h1>
      <button
        onClick={handleCreateClick}
        className="bg-green-500 text-white px-3 py-2 rounded-md hover:bg-green-600 mb-4"
      >
        Create New Category
      </button>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            {/* <th className="py-2 px-4 border-b">ID</th> */}
            <th className="py-2 px-4 border-b">Name</th>
            {/* <th className="py-2 px-4 border-b">Priority</th> */}
            <th className="py-2 px-4 border-b">Usage Limit</th>
            <th className="py-2 px-4 border-b">Color</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr key={category.id}>
              {/* <td className="py-2 px-4 border-b">{category.id}</td> */}
              <td className="py-2 px-4 border-b">{category.name}</td>
              {/* <td className="py-2 px-4 border-b">{category.priority}</td> */}
              <td className="py-2 px-4 border-b">{category.usageLimit}</td>
              <td className="py-2 px-4 border-b">
                <span
                  style={{ backgroundColor: category.color }}
                  className="inline-block w-4 h-4 rounded-full"
                ></span>
              </td>
              <td className="py-2 px-4 border-b">
                <button
                  onClick={() => handleEditClick(category)}
                  className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600"
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isEditModalOpen && (
        <EditCategoryModal
          category={editingCategory}
          onChange={handleEditChange}
          onSubmit={handleEditSubmit}
          onClose={() => setIsEditModalOpen(false)}
        />
      )}

      {isCreateModalOpen && (
        <CreateCategoryModal
          category={newCategory}
          onChange={handleNewChange}
          onSubmit={handleNewSubmit}
          onClose={() => setIsCreateModalOpen(false)}
        />
      )}
    </div>
  );
};

export default Content;
