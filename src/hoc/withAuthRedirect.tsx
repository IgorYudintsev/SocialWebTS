import React, {ComponentType} from 'react';
import {Redirect} from "react-router-dom";
import {DialogGeneralState} from "../components/Dialogs/Dialogs";
import {
    MapDispatchPropsType,
    MapStateToPropsType,
    RouteComponentPropsType
} from "../components/Profile/ProfileContainer";
import {AppStateType} from "../redux/redux-store";
import {connect} from "react-redux";


type mapStateToPropsForDirectType={
    isAuth:boolean
}
//                              state:Типизация редюсеров
let mapStateToPropsForDirect = (state:AppStateType):mapStateToPropsForDirectType => ({
    isAuth: state.auth.isAuth
})

export function withAuthRedirect <T>(Component: ComponentType<T>) {
    function RedirectComponent(props: mapStateToPropsForDirectType) {
        // деструктуризация достань из пропса остаточные
        let {isAuth, ...restProps}=props
            if (isAuth == false) return <Redirect to={'/Login'}/>
        return <Component {...restProps as T}/>
    }

    let ConnectedAuthRedirectComponent=connect(mapStateToPropsForDirect)(RedirectComponent)
    return ConnectedAuthRedirectComponent

}










































