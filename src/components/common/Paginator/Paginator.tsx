import React from 'react';
import styles from "./Paginator.module.css";

type propsType = {
    pageSize: number
    totalUserscount: number
    onPageChange: (pageNumber: number) => void
    currentPage: number
    // follow: (id: number) => void
    // unfollow: (id: number) => void
    // users: Array<usersType>
    // followingInProgress: Array<any>
}

export const Paginator = ({ pageSize, totalUserscount, onPageChange, currentPage}:propsType) => {
    let pageCount = Math.ceil(totalUserscount / pageSize);
    let pages = [];
    for (let i = 1; i <= pageCount; i++) {
        pages.push(i);
    }
    return (
        <div>
            <div className={styles.pagesBlock}>
                {pages.map(p =>
                    <span className={currentPage === p ? styles.selectedPage : styles.pages}
                          onClick={(event) => {
                              onPageChange(p)
                          }}>{p}</span>
                )}
            </div>
        </div>
    )
}








