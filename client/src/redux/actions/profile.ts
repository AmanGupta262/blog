import { IAuth } from "../types/authTypes";
import { ALERT, IAlertType } from "../types/alertTypes";
import { Dispatch } from "react";
import { checkImage, uploadImage } from "../../utils/imageUpload";


export const updateUser =
  (avatar: File, name: string, auth: IAuth) => async (dispatch: Dispatch<IAlertType>) => {
    if(!auth.access_token || !auth.user) return;

    let url = ''
    try {
        dispatch({type: ALERT, payload: { loading: true }});

        if(avatar) {
            const check = checkImage(avatar)
            if(check){
                return dispatch({type: ALERT, payload: { errors: check }});
            }

            const pic = await uploadImage(avatar);
            console.log(pic);
        }

        dispatch({ type: ALERT, payload: { loading: false } });
        
    } catch (err: any) {
        dispatch({type: ALERT, payload: {errors: err.response.data.message}});
    }
  };
