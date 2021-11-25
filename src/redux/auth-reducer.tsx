import {authAPI, securityAPI} from "../api/api";
import {stopSubmit} from "redux-form";

const SET_USER_DATA = 'samurai/auth/SET_USER_DATA';
const GET_CAPTCHA_URL_SUCCESS = 'samurai-network/auth/GET_CAPTCHA_URL_SUCCESS';
export type initialStateType = {
    id: number | null,
    email: string | null,
    login: string | null,
    isAuth: boolean,
    captchaUrl?: null | string
}
let initialState: initialStateType = {
    id: null,
    email: null,
    login: null,
    isAuth: false,
    captchaUrl: ''
}
type actionType = setUserDataACType | getCaptchaACType
const authReducer = (state: initialStateType = initialState, action: actionType): initialStateType => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.payload,
            }
        case GET_CAPTCHA_URL_SUCCESS: {
            return {...state, ...action.payload}
        }
        default:
            return state;
    }
}
type setUserDataACType = {
    type: 'samurai/auth/SET_USER_DATA',
    payload: initialStateType
}
export const setAuthUserDataAC = (id: number | null, email: string | null, login: string | null, isAuth: boolean): setUserDataACType =>
    ({
        type: SET_USER_DATA,
        payload: {id, email, login, isAuth,}
    })
export const getAuthUserData = () => async (dispatch: any) => {
    let response = await authAPI.me()   //возвращаем
    if (response.data.resultCode === 0) {
        let {id, email, login} = response.data.data;
        dispatch(setAuthUserDataAC(id, email, login, true));
        // dispatch(setAuthUserDataAC(response.data.data)) ;

    }
}
export const login = (email: string, password: string, rememberMe: boolean) => async (dispatch: any) => {
    let response = await authAPI.login(email, password, rememberMe)

    if (response.data.resultCode === 0) {
        dispatch(getAuthUserData())
    } else {
        // если 10 код ошибки запросим капчу URL
        if (response.data.resultCode === 10) {
            dispatch(getCaptchaUrl())
            //В initialState запишется значение и так покажется каптча
        }
        let message = response.data.messages.length > 0 ? response.data.messages[0] : "Some Error";
        dispatch(stopSubmit('login', {_error: message}));
    }
}



export const logout = () => async (dispatch: any) => {
    let response = await authAPI.logout()

    if (response.data.resultCode === 0) {
        dispatch(setAuthUserDataAC(null, null, null, false))//зануляем все значения
    }
}

type getCaptchaACType = {
    type: 'samurai-network/auth/GET_CAPTCHA_URL_SUCCESS',
    payload: initialStateType
}
export const getCaptchaSuccess = (captchaUrl: string) => {
    return ({
        type: GET_CAPTCHA_URL_SUCCESS,
        payload: {captchaUrl}
    })
}

export const getCaptchaUrl = () => async (dispatch: any) => {
    let response = await securityAPI.getCaptchaUrl()
    const captchaUrl = response.data.url
    dispatch(getCaptchaSuccess(captchaUrl))
}


export default authReducer;










