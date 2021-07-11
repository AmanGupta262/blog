import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { FormSubmit, InputChange } from "../../utils/TypeScript";
import { login } from "../../redux/actions/auth";

const RegisterForm = () => {
  const initailState = { name: "", email: "", password: "", cf_password: "" };
  const [userRegister, setUserRegister] = useState(initailState);
  const [typePass, setTypePass] = useState(false);
  const [typeCfPass, setTypeCfPass] = useState(false);
  const { name, email, password, cf_password } = userRegister;

  const dispatch = useDispatch();

  const handleInputChange = (e: InputChange) => {
    const { value, name } = e.target;
    setUserRegister({ ...userRegister, [name]: value });
  };
  const handleSubmit = (e: FormSubmit) => {
    e.preventDefault();

    // dispatch(login(userRegister));
  };

  return (
    <>
      <form
        className="mt-8 space-y-6"
        action="#"
        method="POST"
        onSubmit={handleSubmit}
      >
        <input type="hidden" name="remember" value="true" />
        <div className="relative">
          <label className="text-sm font-bold text-gray-700 tracking-wide">
            Name
          </label>
          <input
            className="rounded w-full text-base py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
            type="text"
            placeholder="Enter your name"
            name="name"
            id="name"
            value={name}
            onChange={handleInputChange}
          />
        </div>
        <div className="relative">
          <label className="text-sm font-bold text-gray-700 tracking-wide">
            Email
          </label>
          <input
            className="rounded w-full text-base py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
            type="email"
            placeholder="Enter your email"
            name="email"
            id="email"
            value={email}
            onChange={handleInputChange}
          />
        </div>
        <div className="mt-8 content-center">
          <label className="text-sm font-bold text-gray-700 tracking-wide">
            Password
          </label>
          <div className="relative">
            <input
              className="rounded w-full text-base py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
              type={typePass ? "text" : "password"}
              placeholder="Enter your password"
              name="password"
              id="password"
              value={password}
              onChange={handleInputChange}
            />
            <label
              className="bg-gray-300 hover:bg-gray-400 rounded px-2 py-1 text-sm text-gray-600 font-mono cursor-pointer absolute top-2 right-2"
              onClick={() => setTypePass(!typePass)}
            >
              {typePass ? "hide" : "show"}
            </label>
          </div>
        </div>
        <div className="mt-8 content-center">
          <label className="text-sm font-bold text-gray-700 tracking-wide">
            Confirm Password
          </label>
          <div className="relative">
            <input
              className="rounded w-full text-base py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
              type={typeCfPass ? "text" : "password"}
              placeholder="Confirm password"
              name="cf_password"
              id="cf_password"
              value={cf_password}
              onChange={handleInputChange}
            />
            <label
              className="bg-gray-300 hover:bg-gray-400 rounded px-2 py-1 text-sm text-gray-600 font-mono cursor-pointer absolute top-2 right-2"
              onClick={() => setTypePass(!typeCfPass)}
            >
              {typeCfPass ? "hide" : "show"}
            </label>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            {/* <input
                  id="remember_me"
                  name="remember_me"
                  type="checkbox"
                  className="h-4 w-4 bg-indigo-500 focus:ring-indigo-400 border-gray-300 rounded"
                />
                <label
                  htmlFor="remember_me"
                  className="ml-2 block text-sm text-gray-900"
                >
                  Remember me
                </label> */}
          </div>
          <div className="text-sm">
            <Link
              to="/forgot-password"
              className="font-medium text-indigo-500 hover:text-indigo-500"
            >
              Forgot your password?
            </Link>
          </div>
        </div>
        <div>
          <button
            type="submit"
            disabled={name && email && password && cf_password ? false : true}
            className={`${
              !(name && email && password && cf_password) &&
              "disabled:opacity-50 cursor-not-allowed"
            } w-full flex justify-center bg-indigo-500 text-gray-100 p-4  rounded-full tracking-wide
                                font-semibold  focus:outline-none focus:shadow-outline hover:bg-indigo-600 shadow-lg cursor-pointer transition ease-in duration-300`}
          >
            Register
          </button>
        </div>
        <p className="flex flex-col items-center justify-center mt-10 text-center text-md text-gray-500">
          <span>Already have an account?</span>
          <Link
            to="/login"
            className="text-indigo-500 hover:text-indigo-500no-underline hover:underline cursor-pointer transition ease-in duration-300"
          >
            Login now
          </Link>
        </p>
      </form>
    </>
  );
};

export default RegisterForm;
