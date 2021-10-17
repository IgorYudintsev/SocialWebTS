import {combineReducers, applyMiddleware, createStore, Store, compose} from 'redux'
import profileReducer from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";
import sideBarReducer from "./sideBar-reducer";
import usersReducer from "./users-reducer";
import authReducer from "./auth-reducer";
import thunkMiddleware from 'redux-thunk'
import reducer, {reducer as formReducer} from 'redux-form'
import {appReducer} from "./app-reducer";

let reducers = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    sidebar: sideBarReducer,
    usersPage:usersReducer,
    auth:authReducer,
    form:formReducer,
    app:appReducer
});
//@ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers,  composeEnhancers(
       applyMiddleware(thunkMiddleware)
));

export type AppStateType = ReturnType<typeof reducers>
// let store: Store = createStore(reducers,applyMiddleware(thunkMiddleware));
//@ts-ignore
window.__store__=store;
export default store;



























