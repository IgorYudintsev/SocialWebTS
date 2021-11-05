import React from 'react';
import Profile from "./Profile";
import {connect} from "react-redux";
import {
    getStatus,
    getUserProfile,
    profileType, savePhoto,
    updateStatus
} from "../../redux/profile-reducer";
import {AppStateType} from "../../redux/redux-store";
import {RouteComponentProps, withRouter} from 'react-router-dom';
import {compose} from "redux";

type PathParamsType = {
    userId: any
}
export type initialProfileStateType = MapStateToPropsType & MapDispatchPropsType;
export type RouteComponentPropsType = RouteComponentProps<PathParamsType> & initialProfileStateType
export type MapStateToPropsType = {
    profile: profileType
    status: string
    isAuth: boolean
    autorisedUserId: number | null,
}
export type MapDispatchPropsType = {
    getUserProfile: (userId: any) => void
    getStatus: (userId: any) => void
    updateStatus: (status: string) => void
    savePhoto: (file: File) => void,
}


class ProfileContainer extends React.Component<RouteComponentPropsType> {
    refereshProfile() {
        //вставляем сюда всю логику
        let userId = this.props.match.params.userId;
        if (!userId) {
            userId = this.props.autorisedUserId;
            if (!userId) {
                //но так мы вмешиваемся во внутр. функционал->
                //жизненный цикл
                this.props.history.push('/login')
            }
        }
        this.props.getUserProfile(userId);
        this.props.getStatus(userId);
    }

    componentDidMount() {
        //принцип: монтируется первый раз
        //просто вывзываем
        this.refereshProfile()
    }

    componentDidUpdate() {
        //принцип: перерисовывается когда приходят свежие пропсы
        //вывзываем если поменялся userId
        if (this.props.match.params.userId) {
            this.refereshProfile()
        }
    }

    render() {
        return (
            <div>
                <Profile {...this.props}
                         isOwner={!this.props.match.params.userId}
                         savePhoto={this.props.savePhoto}
                         profile={this.props.profile}
                         status={this.props.status}
                         updateStatus={this.props.updateStatus}
                />
            </div>
        )
    }
}

let mapStateToProps = (state: AppStateType) => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    isAuth: state.auth.isAuth,
    autorisedUserId: state.auth.id
})

export default compose<React.ComponentType>(
    connect(mapStateToProps,                                    //Это ThunkCreator
        {getUserProfile, getStatus, updateStatus, savePhoto}),
    withRouter)(ProfileContainer)



