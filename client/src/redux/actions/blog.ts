import { Dispatch } from "redux";
import { uploadImage } from "../../utils/imageUpload";
import { IBlog } from "../../utils/TypeScript";
import { ALERT, IAlertType } from "../types/alertTypes";

export const createBlog =
  (blog: IBlog, token: string) => async (dispatch: Dispatch<IAlertType>) => {
    let url;
    try {
      dispatch({ type: ALERT, payload: { loading: true } });
      if (typeof blog.thumbnail !== "string") {
        const pic = await uploadImage(blog.thumbnail);
        url = pic.url;
      } else {
        url = blog.thumbnail;
      }

      const newBlog = { ...blog, thumbnail: url };

      console.log({ newBlog, token });
      dispatch({ type: ALERT, payload: { loading: false } });
    } catch (err: any) {
      dispatch({ type: ALERT, payload: { errors: err.response.data.msg } });
    }
  };
