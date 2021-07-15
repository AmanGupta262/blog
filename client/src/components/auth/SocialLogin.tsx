import React from "react";
import {
  GoogleLogin,
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from "react-google-login";
import { googleLogin } from "../../redux/actions/auth";
import { useDispatch } from "react-redux";

const SocialLogin = () => {
  const dispatch = useDispatch();
  const onSuccess = (
    googleUser: GoogleLoginResponse | GoogleLoginResponseOffline
  ): void => {
    if ("tokenId" in googleUser) {
      dispatch(googleLogin(googleUser.tokenId))
    }
  };
  const onFailure = (err: any) => {
    console.log(err);
  };
  return (
    <>
      <GoogleLogin
        clientId={`${process.env.REACT_APP_GOOGLE_CLIENT_ID}`}
        buttonText=""
        render={(renderProps) => (
          <button
            onClick={renderProps.onClick}
            disabled={renderProps.disabled}
            className="w-11 h-11 items-center justify-center inline-flex rounded-full font-bold text-lg  text-white bg-gray-100 hover:shadow-lg cursor-pointer transition ease-in duration-300"
          >
            <img
              alt=""
              className="w-4 h-4"
              src="https://image.flaticon.com/icons/png/512/281/281764.png"
            />
          </button>
        )}
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={"single_host_origin"}
      />
    </>
  );
};

export default SocialLogin;
