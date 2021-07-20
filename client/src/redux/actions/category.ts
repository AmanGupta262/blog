import { Dispatch } from "redux";
import { IAlertType, ALERT } from "../types/alertTypes";
import { postAPI, getAPI, patchAPI } from "../../utils/FetchData";
import { CREATE_CATEGORY, ICategoryType } from "../types/categoryTypes";

export const createCategory = (name: string, token: string) =>
  async (dispatch: Dispatch<IAlertType | ICategoryType>) => {
    try {
      dispatch({ type: ALERT, payload: { loading: true } });

      const res = await postAPI("category", { name }, token);

      dispatch({
        type: CREATE_CATEGORY,
        payload: res.data.category,
      });

      dispatch({ type: ALERT, payload: { loading: false } });
    } catch (err: any) {
      dispatch({ type: ALERT, payload: { errors: err.response.data.msg } });
    }
  };
