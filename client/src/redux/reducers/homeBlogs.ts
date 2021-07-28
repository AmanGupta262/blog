import {
  IHomeBlogs,
  GET_HOME_BLOGS,
  IGetHomeBlogsType,
} from "../types/blogTypes";

const homeBlogsReducer = (
  state: IHomeBlogs[] = [],
  action: IGetHomeBlogsType
) => {
  switch (action.type) {
    case GET_HOME_BLOGS:
      return action.payload;
    default:
      return state;
  }
};

export default homeBlogsReducer;