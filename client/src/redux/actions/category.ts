import { Dispatch } from "redux";
import { IAlertType, ALERT } from "../types/alertTypes";
import { postAPI, getAPI, patchAPI } from "../../utils/FetchData";

export const createCategory =
  (name: string, access_token: string) =>
  async (dispatch: Dispatch<IAlertType>) => {
    try {
        dispatch({ type: ALERT, payload: { loading: true } });

        dispatch({ type: ALERT, payload: { loading: false } });
    } catch (err: any) {
      dispatch({ type: ALERT, payload: { errors: err.response.data.msg } });
    }
  };
