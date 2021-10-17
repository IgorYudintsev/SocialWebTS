import React from 'react';
import Profile from "./Profile";
import {connect} from "react-redux";
import {
    getStatus,
    getUserProfile,
    profileType,
    updateStatus
} from "../../redux/profile-reducer";
import {AppStateType} from "../../redux/redux-store";
import { RouteComponentProps, withRouter} from 'react-router-dom';
import {compose} from "redux";
type PathParamsType = {
    userId: any
}
export type initialProfileStateType = MapStateToPropsType & MapDispatchPropsType;
export type RouteComponentPropsType = RouteComponentProps<PathParamsType> & initialProfileStateType

export type MapStateToPropsType = {
    profile: profileType
    status: string
    isAuth:boolean
    autorisedUserId:number | null,
}
export type MapDispatchPropsType = {
    getUserProfile: (userId: any) => void
    getStatus: (userId: any) => void
    updateStatus: (status:string) => void
}

//проблема: после того как мы вылогинились мы остаемся в профиле
//вместо того чтобы редиректиться в форму
class ProfileContainer extends React.Component<RouteComponentPropsType> {
    componentDidMount() {
        let userId = this.props.match.params.userId;
        if (!userId) {
            userId =this.props.autorisedUserId;
            if(!userId){
                //но так мы вмешиваемся во внутр. функционал->
                //жизненный цикл
                this.props.history.push('/login')
            }
        }
        this.props.getUserProfile(userId);
        this.props.getStatus(userId);
    }
    render() {
                 return (
            <div>
                <Profile {...this.props}
                         profile={this.props.profile}
                         status={this.props.status}
                         updateStatus={this.props.updateStatus}
                />
            </div>
        )
    }
}

let mapStateToProps = (state:AppStateType) => ({
    profile: state.profilePage.profile,
    status:state.profilePage.status,
    isAuth:state.auth.isAuth,//зарегистрирован ли я?
    autorisedUserId:state.auth.id //берем наш ID
})

export default compose<React.ComponentType>(
    connect(mapStateToProps,
        {getUserProfile,getStatus,updateStatus}),
    withRouter)(ProfileContainer)



