import {connect} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {
    follow,
    requestUsers,
    setCurrentPage,
    toggleFollowingProgress,
    unfollow,
    usersType
} from "../../redux/users-reducer";
import React from "react";
import {Users} from "./Users";
import {Preloader} from "../common/Preloader/Preloader";
import {compose} from "redux";
import {
    getCurrentPage, getFollowingInProgress,
    getIsFetching,
    getPageSize,
    getTotalUsersCount, GetUsers,
} from "../../redux/users-selectors";


export type initialStateType = {
    users: Array<usersType>,
    pageSize: number,
    totalUsersCount: number,
    currentPage: number,
    follow: (id: number) => void,
    unfollow: (id: number) => void,
    setCurrentPage: (currentPage: number) => void,
    isFetching: boolean
    followingInProgress: Array<any>
    GetUsers: (currentPage: number, pageSize: number) => void
 }

class UsersContainer extends React.Component<initialStateType> {
    componentDidMount() {
        let {currentPage,pageSize}=this.props
        this.props.GetUsers(currentPage, pageSize);
    }

    onPageChange = (pageNumber: number) => {
        let {pageSize}=this.props
        this.props.GetUsers(pageNumber, pageSize);
    }

    render() {
        return (
            <>
                {this.props.isFetching ? <Preloader/> : null}
                <Users
                    pageSize={this.props.pageSize}
                    totalUserscount={this.props.totalUsersCount}
                    onPageChange={this.onPageChange}
                    currentPage={this.props.currentPage}
                    unfollow={this.props.unfollow}
                    follow={this.props.follow}
                    users={this.props.users}
                    followingInProgress={this.props.followingInProgress}
                />
            </>
        )
    }
}

function mapStateToProps(state: AppStateType) {
    return {
        users: GetUsers(state),
        // users: GetUsersSuperSelector(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state)
    }
}

export default compose<React.ComponentType>(
    connect(mapStateToProps, {
        follow, unfollow, setCurrentPage,
        toggleFollowingProgress, GetUsers: requestUsers
    }))
(UsersContainer)


















