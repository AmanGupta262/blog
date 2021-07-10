import { IUserLogin } from "../../utils/TypeScript";

export const login = (userLogin: IUserLogin) => async (dispatch: any) => {
  try {
    console.log(userLogin);
  } catch (err) {
    console.log(err);
  }
};
