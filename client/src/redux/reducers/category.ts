import { ICategoryType, CREATE_CATEGORY } from "../types/categoryTypes";
import { ICategory } from "../../utils/TypeScript";

const categoryReducer = (state: ICategory[] = [], action: ICategoryType): ICategory[] => {
    switch (action.type) {
        case CREATE_CATEGORY:
            return [action.payload, ...state]

        default:
            return state;
    }
}

export default categoryReducer;