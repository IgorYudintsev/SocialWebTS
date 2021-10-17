import React from 'react';
import styles from "./Users.module.css";
import {usersType} from "../../redux/users-reducer";
import {NavLink} from "react-router-dom";


type propsType = {
    pageSize: number
    totalUserscount: number
    onPageChange: (pageNumber: number) => void
    currentPage: number
    follow: (id: number) => void
    unfollow: (id: number) => void
    user: usersType
    followingInProgress: Array<any>
}

//выносим User в отдельную компоненту
export const User = ({user,followingInProgress,unfollow,follow}: propsType) => {
    //let m=user;//вначале подставили этот костыль, а теперь удалии
    return (
        <div>
            <span>
                <div>
                   <NavLink to={'/profile/' + user.id}>
                        <img src={user.photos.small != null
                            ? user.photos.small
                            : 'https://e7.pngegg.com/pngimages/613/636/png-clipart-computer-icons-user-profile-male-avatar-avatar-heroes-logo.png'}
                             className={styles.picture}/>
                    </NavLink>
                </div>
                <div>
                    {user.followed
                        ? <button disabled={followingInProgress.some(id => id === user.id)}
                                  onClick={() => {
                                      unfollow(user.id)
                                  }} className={styles.margForBtn}>UNFollow</button>
                        : <button disabled={followingInProgress.some(id => id === user.id)}
                                  onClick={() => {
                                      follow(user.id)
                                  }} className={styles.margForBtn}>Follow</button>
                    }
                </div>
            </span>
            <span>
                        <div className={styles.marg}>{user.name}</div>
                        <div className={styles.marg}>{user.status}</div>

                    </span>
            <span>
                        <div className={styles.marg}>{"user.location.country"}</div><div
                className={styles.marg}>{"user.location.city"}</div>
                    </span>
        </div>
    )
}




