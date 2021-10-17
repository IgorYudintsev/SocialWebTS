import authReducer, {getAuthUserData, setAuthUserDataAC} from "./auth-reducer";

const INITIALIZED_SUCCESS = 'INITIALIZED_SUCCESS';
export type initialStateType = {
    initialized: boolean | null
}
let initialState: initialStateType = {
    initialized: false
}
export const appReducer = (state: initialStateType = initialState, action: InitializedSuccessType): initialStateType => {
    switch (action.type) {
        case INITIALIZED_SUCCESS:
            return {
                ...state,
                initialized: true,
            }
        default:
            return state;
    }
}
type InitializedSuccessType = {
    type: 'INITIALIZED_SUCCESS',
}
export const InitializedSuccess = (): InitializedSuccessType =>
    ({
        type: INITIALIZED_SUCCESS,

    })
export const initializeApp = () => (dispatch: any) => {
    let promise = dispatch(getAuthUserData())
    //делаем на будущее, когда будет много возвращаться промисов
    Promise.all([promise])
        .then(() => {
        dispatch(InitializedSuccess())
    })
}

export default authReducer;

















