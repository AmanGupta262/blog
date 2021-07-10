import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { InputChange } from "../../utils/TypeScript";

const LoginPass = () => {
  const initailState = { email: "", password: "" };
  const [userLogin, setUserLogin] = useState(initailState);
  const [typePass, setTypePass] = useState(false);
  const { email, password } = userLogin;

  const handleInputChange = (e: InputChange) => {
    const { value, name } = e.target;
    setUserLogin({ ...userLogin, [name]: value });
  };

  return (
    <>
      <form className="mt-8 space-y-6" action="#" method="POST">
        <input type="hidden" name="remember" value="true" />
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
            disabled={email && password ? false : true}
            className={`${
              !(email && password) && "disabled:opacity-50 cursor-not-allowed"
            } w-full flex justify-center bg-indigo-500 text-gray-100 p-4  rounded-full tracking-wide
                                font-semibold  focus:outline-none focus:shadow-outline hover:bg-indigo-600 shadow-lg cursor-pointer transition ease-in duration-300`}
          >
            Login
          </button>
        </div>
        <p className="flex flex-col items-center justify-center mt-10 text-center text-md text-gray-500">
          <span>Don't have an account?</span>
          <Link
            to="/register"
            className="text-indigo-500 hover:text-indigo-500no-underline hover:underline cursor-pointer transition ease-in duration-300"
          >
            Register now
          </Link>
        </p>
      </form>
    </>
  );
};

export default LoginPass;
