import React from 'react';
import styles from './../../Users/Users.module.css'
import preloader from "../../../assets/images/preloader.svg";

export const Preloader=()=>{
    return(
        <div className={styles.flexContainer}>
            <img className={styles.isFetching} src={preloader}/>
        </div>
    )
}