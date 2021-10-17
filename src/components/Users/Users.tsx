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
            <Paginator pageSize={pageSize} totalUserscount={totalUserscount} onPageChange={onPageChange}
                       currentPage={currentPage}/>
            {props.users.map(m => <User key={m.id} pageSize={pageSize} totalUserscount={totalUserscount}
                                        onPageChange={onPageChange}
                                        currentPage={currentPage} follow={props.follow} unfollow={props.unfollow}
                                        user={m} followingInProgress={props.followingInProgress}/>
                // <div key={m.id}>
                // <span>
                //     <div>
                //        <NavLink to={'/profile/' + m.id}>
                //             <img src={m.photos.small != null
                //                 ? m.photos.small
                //                 : 'https://e7.pngegg.com/pngimages/613/636/png-clipart-computer-icons-user-profile-male-avatar-avatar-heroes-logo.png'}
                //                  className={styles.picture}/>
                //         </NavLink>
                //     </div>
                //     <div>
                //         {m.followed
                //             ? <button disabled={props.followingInProgress.some(id => id === m.id)}
                //                       onClick={() => {
                //                           props.unfollow(m.id)
                //                       }} className={styles.margForBtn}>UNFollow</button>
                //             : <button disabled={props.followingInProgress.some(id => id === m.id)}
                //                       onClick={() => {
                //                           props.follow(m.id)
                //                       }} className={styles.margForBtn}>Follow</button>
                //         }
                //     </div>
                // </span>
                //         <span>
                //             <div className={styles.marg}>{m.name}</div>
                //             <div className={styles.marg}>{m.status}</div>
                //
                //         </span>
                //         <span>
                //             <div className={styles.marg}>{"m.location.country"}</div><div
                //             className={styles.marg}>{"m.location.city"}</div>
                //         </span>
                //     </div>

            )}
        </div>
    )
}
















