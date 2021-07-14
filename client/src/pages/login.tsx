import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { RootStore } from "../utils/TypeScript";
import LoginPass from "../components/auth/LoginPass";

const Login = () => {
  const history = useHistory();
  const { auth } = useSelector((state: RootStore) => state);
  useEffect(() => {
    if (auth.access_token) history.push("/");
  }, [history, auth.access_token]);
  return (
    <>
      <div className="min-h-screen flex  justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-100 relative items-center">
        <div className="absolute opacity-60 inset-0 z-0"></div>
        <div className="max-w-md w-full space-y-8 p-10 bg-white rounded-xl z-10">
          <div className="text-center">
            <h2 className="mt-6 text-3xl font-bold text-gray-900">
              Welcom Back!
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Please sign in to your account
            </p>
          </div>
          <div className="flex flex-row justify-center items-center space-x-3">
            <span className="w-11 h-11 items-center justify-center inline-flex rounded-full font-bold text-lg  text-white  bg-blue-900 hover:shadow-lg cursor-pointer transition ease-in duration-300">
              <img
                alt=""
                className="w-4 h-4"
                src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbG5zOnN2Z2pzPSJodHRwOi8vc3ZnanMuY29tL3N2Z2pzIiB3aWR0aD0iNTEyIiBoZWlnaHQ9IjUxMiIgeD0iMCIgeT0iMCIgdmlld0JveD0iMCAwIDI0IDI0IiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1MTIgNTEyIiB4bWw6c3BhY2U9InByZXNlcnZlIiBjbGFzcz0iIj48Zz48cGF0aCB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGQ9Im0xNS45OTcgMy45ODVoMi4xOTF2LTMuODE2Yy0uMzc4LS4wNTItMS42NzgtLjE2OS0zLjE5Mi0uMTY5LTMuMTU5IDAtNS4zMjMgMS45ODctNS4zMjMgNS42Mzl2My4zNjFoLTMuNDg2djQuMjY2aDMuNDg2djEwLjczNGg0LjI3NHYtMTAuNzMzaDMuMzQ1bC41MzEtNC4yNjZoLTMuODc3di0yLjkzOWMuMDAxLTEuMjMzLjMzMy0yLjA3NyAyLjA1MS0yLjA3N3oiIGZpbGw9IiNmZmZmZmYiIGRhdGEtb3JpZ2luYWw9IiMwMDAwMDAiIHN0eWxlPSIiIGNsYXNzPSIiPjwvcGF0aD48L2c+PC9zdmc+"
              />
            </span>
            <span className="w-11 h-11 items-center justify-center inline-flex rounded-full font-bold text-lg  text-white bg-gray-100 hover:shadow-lg cursor-pointer transition ease-in duration-300">
              <img
                alt=""
                className="w-4 h-4"
                src="https://image.flaticon.com/icons/png/512/281/281764.png"
              />
            </span>
            <span className="w-11 h-11 items-center justify-center inline-flex rounded-full font-bold text-lg  text-white bg-gray-100 hover:shadow-lg cursor-pointer transition ease-in duration-300">
              <img
                alt=""
                src="https://image.flaticon.com/icons/png/512/179/179323.png"
                className="w-4 h-4"
              />
            </span>
          </div>
          <div className="flex items-center justify-center space-x-2">
            <span className="h-px w-16 bg-gray-300"></span>
            <span className="text-gray-500 font-normal">OR</span>
            <span className="h-px w-16 bg-gray-300"></span>
          </div>
          <LoginPass />
        </div>
      </div>
    </>
  );
};

export default Login;
