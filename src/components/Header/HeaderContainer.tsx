import React from 'react';
import Header from "./Header";
import {getAuthUserData,  logout} from "../../redux/auth-reducer";
import {connect} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
export type initialStateTypes = {
    login: string | null,
    isAuth: boolean,
    // getAuthUserData: () => void
    logout: () => void
}

class HeaderContainer extends React.Component<initialStateTypes> {

    render() {
        return <Header {...this.props}/>
    }
}

const mapStateToProps = (state: AppStateType) => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login
});
//                                                      logout-санка из authReducer
export default connect(mapStateToProps, { logout})(HeaderContainer);

