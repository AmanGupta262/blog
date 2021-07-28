import { Dispatch } from "redux";
import { postAPI, getAPI } from "../../utils/FetchData";
import { uploadImage } from "../../utils/imageUpload";
import { IBlog } from "../../utils/TypeScript";
import { ALERT, IAlertType } from "../types/alertTypes";
import { GET_HOME_BLOGS, IGetHomeBlogsType } from "../types/blogTypes";

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

      const res = await postAPI('/blog/create', newBlog, token);
      
      dispatch({ type: ALERT, payload: { loading: false } });
    } catch (err: any) {
      dispatch({ type: ALERT, payload: { errors: err.response.data.msg } });
    }
  };

export const getHomeBlogs =
  () => async (dispatch: Dispatch<IAlertType | IGetHomeBlogsType>) => {
    try {
      dispatch({ type: ALERT, payload: { loading: true } });

      const res = await getAPI("/blog/home");
      dispatch({ type: GET_HOME_BLOGS, payload: res.data.blogs });

      dispatch({ type: ALERT, payload: { loading: false } });
    } catch (err: any) {
      dispatch({ type: ALERT, payload: { errors: err.response.data.msg } });
    }
  };
