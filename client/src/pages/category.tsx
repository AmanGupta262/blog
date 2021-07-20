import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import NotFound from "../components/global/NotFound";
import { FormSubmit, ICategory, RootStore } from "../utils/TypeScript";
import { createCategory, updateCategory, deleteCategory } from "../redux/actions/category";
import { useEffect } from "react";

const Category = () => {
  const [name, setName] = useState("");
  const [edit, setEdit] = useState<ICategory | null>(null);

  const dispatch = useDispatch();
  const { auth, categories } = useSelector((state: RootStore) => state);

  const handleSubmit = (e: FormSubmit) => {
    e.preventDefault();
    if (!auth.access_token || !name) {
      return;
    }

    if (edit) {
      if (edit.name === name) return;
      const data = { ...edit, name };
      dispatch(updateCategory(data, auth.access_token));
    } else {
      dispatch(createCategory(name, auth.access_token));
    }
    setName("");
    setEdit(null);
  };

  const handleDelete = (id: string) => {
    if (!auth.access_token) return;
    dispatch(deleteCategory(id, auth.access_token));
  };

  useEffect(() => {
    if (edit) {
      setName(edit.name);
    }
  }, [edit]);

  if (auth.user?.role !== "admin") return <NotFound />;
  return (
    <>
      <div className="bg-gray-100 container p-5 flex flex-col md:flex-row items-start">
        <div className="md:w-1/3 mb-4 bg-white md:mr-4 w-full shadow-md rounded-lg">
          <form className="mt-s space-y-6 w-full p-4" onSubmit={handleSubmit}>
            <div className="relative">
              <input
                className="rounded w-full text-base py-2 border-b border-gray-300 focus:outline-none focus:border-gray-800"
                type="text"
                placeholder="Category"
                name="name"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              {edit && (
                <img
                  src="https://image.flaticon.com/icons/png/512/1828/1828843.png"
                  alt="edit"
                  className="w-4 h-4 mr-4 cursor-pointer absolute right-0 top-3"
                  onClick={() => setEdit(null)}
                />
              )}
            </div>

            <button
              type="submit"
              disabled={name ? false : true}
              className={`${
                !name && "disabled:opacity-50 cursor-not-allowed"
              } w-full flex justify-center bg-gray-800 text-gray-100 p-2 rounded-full tracking-wide
                                font-semibold  focus:outline-none focus:shadow-outline hover:bg-gray-600 shadow-lg cursor-pointer transition ease-in duration-300`}
            >
              {edit ? "Update" : "Create"}
            </button>
          </form>
        </div>
        <div className="md:w-2/3 bg-white w-full shadow-md rounded-lg p-4">
          {categories.map((category) => (
            <div
              className="category p-3 border-b border-gray-300 flex mb-2 rounded"
              key={category._id}
            >
              <div className="w-1/2 capitalize">{category.name}</div>
              <div className="w-1/2 flex justify-end items-center">
                <img
                  src="https://image.flaticon.com/icons/png/512/1159/1159633.png"
                  alt="edit"
                  className="w-4 h-4 mr-4 cursor-pointer hover:bg-blue-100 focus:bg-blue-100"
                  onClick={() => setEdit(category)}
                />
                <img
                  src="https://image.flaticon.com/icons/png/512/833/833262.png"
                  alt="delete"
                  className="w-4 h-4 cursor-pointer hover:bg-red-100 focus:bg-red-100"
                  onClick={() => handleDelete(category._id)}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Category;
