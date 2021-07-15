import React, { useCallback } from "react";
import {
  GoogleLogin,
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from "react-google-login";

import FacebookLogin from "react-facebook-login-typed";

import { googleLogin, facebookLogin } from "../../redux/actions/auth";
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
  const responseFacebook = useCallback((response) => {
    const {accessToken, userID} = response
    dispatch(facebookLogin(accessToken, userID))
  }, []);
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
        cookiePolicy={"single_host_origin"}
      />

      <FacebookLogin
        appId={`${process.env.REACT_APP_FACEBOOK_OAUTH_CLIENT_ID}`}
        
        callback={responseFacebook}
        render={(renderProps) => (
          <button
            onClick={renderProps.onClick}
            className="w-11 h-11 items-center justify-center inline-flex rounded-full font-bold text-lg  text-white  bg-blue-900 hover:shadow-lg cursor-pointer transition ease-in duration-300"
          >
            <img
              alt=""
              className="w-4 h-4"
              src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbG5zOnN2Z2pzPSJodHRwOi8vc3ZnanMuY29tL3N2Z2pzIiB3aWR0aD0iNTEyIiBoZWlnaHQ9IjUxMiIgeD0iMCIgeT0iMCIgdmlld0JveD0iMCAwIDI0IDI0IiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1MTIgNTEyIiB4bWw6c3BhY2U9InByZXNlcnZlIiBjbGFzcz0iIj48Zz48cGF0aCB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGQ9Im0xNS45OTcgMy45ODVoMi4xOTF2LTMuODE2Yy0uMzc4LS4wNTItMS42NzgtLjE2OS0zLjE5Mi0uMTY5LTMuMTU5IDAtNS4zMjMgMS45ODctNS4zMjMgNS42Mzl2My4zNjFoLTMuNDg2djQuMjY2aDMuNDg2djEwLjczNGg0LjI3NHYtMTAuNzMzaDMuMzQ1bC41MzEtNC4yNjZoLTMuODc3di0yLjkzOWMuMDAxLTEuMjMzLjMzMy0yLjA3NyAyLjA1MS0yLjA3N3oiIGZpbGw9IiNmZmZmZmYiIGRhdGEtb3JpZ2luYWw9IiMwMDAwMDAiIHN0eWxlPSIiIGNsYXNzPSIiPjwvcGF0aD48L2c+PC9zdmc+"
            />
          </button>
        )}
      />
    </>
  );
};

export default SocialLogin;
