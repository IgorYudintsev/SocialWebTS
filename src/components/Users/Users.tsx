import React from 'react';
import {usersType} from "../../redux/users-reducer";
import {Paginator} from "../common/Paginator/Paginator";
import {User} from "./User";

type propsType = {
    pageSize: number
    totalUserscount: number
    onPageChange: (pageNumber: number) => void
    currentPage: number
    follow: (id: number) => void
    unfollow: (id: number) => void
    users: Array<usersType>
    followingInProgress: Array<any>
}


export const Users = ({pageSize, totalUserscount, onPageChange, currentPage, ...props}: propsType) => {
    return (
        <div>
            <Paginator pageSize={pageSize} totalItemsCount={totalUserscount} onPageChange={onPageChange}
                       currentPage={currentPage} portionSize={10}/>
            {/*переименовали totalItemsCount=totalUserscount, добавили portionSize={10}*/}
            {props.users.map(m => <User key={m.id} pageSize={pageSize} totalUserscount={totalUserscount}
                                        onPageChange={onPageChange}
                                        currentPage={currentPage} follow={props.follow} unfollow={props.unfollow}
                                        user={m} followingInProgress={props.followingInProgress}/>
            )}
        </div>
    )
}
















