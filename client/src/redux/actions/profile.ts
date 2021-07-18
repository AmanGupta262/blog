import { IAuth, IAuthType, AUTH } from "../types/authTypes";
import { ALERT, IAlertType } from "../types/alertTypes";
import { Dispatch } from "react";
import { checkImage, uploadImage } from "../../utils/imageUpload";
import { patchAPI } from "../../utils/FetchData";
import { checkPassword } from "../../utils/Valid";

export const updateUser =
  (avatar: File, name: string, auth: IAuth) =>
  async (dispatch: Dispatch<IAlertType | IAuthType>) => {
    if (!auth.access_token || !auth.user) return;

    let url = "";
    try {
      dispatch({ type: ALERT, payload: { loading: true } });

      if (avatar) {
        const check = checkImage(avatar);
        if (check) {
          return dispatch({ type: ALERT, payload: { errors: check } });
        }

        const pic = await uploadImage(avatar);
        url = pic.url;
      }

      dispatch({
        type: AUTH,
        payload: {
          access_token: auth.access_token,
          user: {
            ...auth.user,
            name: name ? name : auth.user.name,
            avatar: url ? url : auth.user.avatar,
          },
        },
      });

      const res = await patchAPI(
        `/users/update`,
        {
          name: name ? name : auth.user.name,
          avatar: url ? url : auth.user.avatar,
        },
        auth.access_token
      );

      dispatch({ type: ALERT, payload: { success: res.data.msg } });
    } catch (err: any) {
      dispatch({ type: ALERT, payload: { errors: err.response.data.message } });
    }
  };

export const resetPassword =
  (password: string, cf_password: string, token: string | undefined) =>
  async (dispatch: Dispatch<IAlertType | IAuthType>) => {
    if (!token) return;
    try {
      dispatch({ type: ALERT, payload: { loading: true } });

      const msg = checkPassword(password, cf_password);
      if (msg) return dispatch({ type: ALERT, payload: { errors: msg } });

      const res = await patchAPI("/users/reset_password", { password }, token);

      dispatch({ type: ALERT, payload: { success: res.data.msg } });
    } catch (err: any) {
      dispatch({ type: ALERT, payload: { errors: err.response.data.message } });
    }
  };
