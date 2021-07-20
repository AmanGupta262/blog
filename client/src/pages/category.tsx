import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FormSubmit, RootStore } from "../utils/TypeScript";

const Category = () => {
  const [name, setName] = useState("");

  const dispatch = useDispatch();
  const { auth } = useSelector((state: RootStore) => state);

  const handleSubmit = (e: FormSubmit) => {
    e.preventDefault();
  };
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
            </div>
            <button
              type="submit"
              disabled={name ? false : true}
              className={`${
                !name && "disabled:opacity-50 cursor-not-allowed"
              } w-full flex justify-center bg-gray-800 text-gray-100 p-2 rounded-full tracking-wide
                                font-semibold  focus:outline-none focus:shadow-outline hover:bg-gray-600 shadow-lg cursor-pointer transition ease-in duration-300`}
            >
              Create
            </button>
          </form>
        </div>
        <div className="md:w-2/3 bg-white w-full shadow-md rounded-lg p-4">
          <div className="category p-3 border-b border-gray-300 flex mb-2 rounded">
            <div className="w-1/2 capitalize">category name</div>
            <div className="w-1/2 flex justify-end items-center">
              <img
                src="https://image.flaticon.com/icons/png/512/1159/1159633.png"
                alt="edit"
                className="w-4 h-4 mr-4 cursor-pointer hover:bg-blue-100 focus:bg-blue-100"
              />
              <img
                src="https://image.flaticon.com/icons/png/512/833/833262.png"
                alt="delete"
                className="w-4 h-4 cursor-pointer hover:bg-red-100 focus:bg-red-100"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Category;
