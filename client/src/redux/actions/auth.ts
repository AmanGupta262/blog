import { Dispatch } from "redux";
import { postAPI, getAPI } from "../../utils/FetchData";
import { IUserLogin, IUserRegister } from "../../utils/TypeScript";
import { AUTH, IAuthType } from "../types/authTypes";
import { ALERT, IAlertType } from "../types/alertTypes";
import { validRegister } from "../../utils/Valid";

export const login =
  (userLogin: IUserLogin) =>
  async (dispatch: Dispatch<IAuthType | IAlertType>) => {
    try {
      dispatch({ type: ALERT, payload: { loading: true } });
      const res = await postAPI("auth/login", userLogin);
      dispatch({ type: AUTH, payload: res.data });
      dispatch({ type: ALERT, payload: { success: res.data.msg } });

      localStorage.setItem("id", "jakfjalkfalf");
    } catch (err: any) {
      dispatch({ type: ALERT, payload: { errors: err.response.data.msg } });
    }
  };

export const register =
  (userRegister: IUserRegister) =>
  async (dispatch: Dispatch<IAuthType | IAlertType>) => {
    const check = validRegister(userRegister);

    if (check.errLength > 0)
      return dispatch({ type: ALERT, payload: { errors: check.errMsg } });
    try {
      dispatch({ type: ALERT, payload: { loading: true } });
      const res = await postAPI("auth/register", userRegister);
      console.log(res);
      dispatch({ type: ALERT, payload: { success: res.data.msg } });
    } catch (err: any) {
      dispatch({ type: ALERT, payload: { errors: err.response.data.msg } });
    }
  };

export const refresh_token =
  () => async (dispatch: Dispatch<IAuthType | IAlertType>) => {
    const loggedIn = localStorage.getItem("id")
    if (loggedIn !== "jakfjalkfalf") return;
      try {
        dispatch({ type: ALERT, payload: { loading: true } });

        const res = await getAPI("auth/refresh_token");

        dispatch({ type: AUTH, payload: res.data });

        dispatch({ type: ALERT, payload: {} });
      } catch (err: any) {
        dispatch({ type: ALERT, payload: { errors: err.response.data.msg } });
      }
  };
