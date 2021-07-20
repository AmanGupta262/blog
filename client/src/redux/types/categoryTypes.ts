import { ICategory } from "../../utils/TypeScript";

export const CREATE_CATEGORY = "CREATE_CATEGORY";

export interface ICreate{
    type: typeof CREATE_CATEGORY;
    payload: ICategory;
}

export type ICategoryType = ICreate;