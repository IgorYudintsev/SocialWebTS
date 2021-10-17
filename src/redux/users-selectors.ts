import {AppStateType} from "./redux-store";
import {createSelector} from 'reselect';
import {usersType} from "./users-reducer";

//было
// export const GetUsers=(state:AppStateType)=>{
//     return state.usersPage.users;
// }

//получаем юзерсов
const GetUsersSelector = (state: AppStateType) => {
    return state.usersPage.users;
}

//                                    вставляем юзерсов    передаем в колбэк результат юзерсов
export const GetUsers = createSelector(GetUsersSelector, (users: Array<usersType>) => {
    return users.filter(f => true);
})

export const getPageSize = (state: AppStateType) => {
    return state.usersPage.pageSize;
}

export const getTotalUsersCount = (state: AppStateType) => {
    return state.usersPage.totalUsersCount;
}

export const getCurrentPage = (state: AppStateType) => {
    return state.usersPage.currentPage;
}

export const getIsFetching = (state: AppStateType) => {
    return state.usersPage.isFetching;
}

export const getFollowingInProgress = (state: AppStateType) => {
    return state.usersPage.followingInProgress;
}


