import React, {useEffect} from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { RootStore } from "../utils/TypeScript";
import RegisterForm from "../components/auth/RegisterForm";
import SocialLogin from "../components/auth/SocialLogin";

const Register = () => {
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
              Welcom to Blog
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Sign in using
            </p>
          </div>
          <div className="flex flex-row justify-center items-center space-x-3">
            <SocialLogin />
          </div>
          <div className="flex items-center justify-center space-x-2">
            <span className="h-px w-16 bg-gray-300"></span>
            <span className="text-gray-500 font-normal">OR</span>
            <span className="h-px w-16 bg-gray-300"></span>
          </div>
          <RegisterForm />
        </div>
      </div>
    </>
  );
};

export default Register;
