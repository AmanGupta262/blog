import { Dispatch } from "react";
import { postAPI } from "../../utils/FetchData";
import { IUserLogin } from "../../utils/TypeScript";
import { AUTH, GlobalType } from "../types/globalTypes";

export const login = (userLogin: IUserLogin) => async (dispatch: Dispatch<GlobalType>) => {
  try {
    const res = await postAPI("login", userLogin);
    console.log(res);
    dispatch({
        type: AUTH,
        payload: {
            token: res.data.access_token,
            user: res.data.user,
        }
    })
  } catch (err: any) {
    console.log(err.response.data.msg);
  }
};
