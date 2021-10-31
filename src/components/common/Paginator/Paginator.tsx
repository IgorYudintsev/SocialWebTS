import React, {useState} from 'react';
import styles from "./Paginator.module.css";

type propsType = {
    pageSize: number
    totalItemsCount: number   //переименовали вместо totalUsersCount
    onPageChange: (pageNumber: number) => void
    currentPage: number
    portionSize:number   //пердаем размер порции
}

export const Paginator = ({pageSize, totalItemsCount, onPageChange, currentPage, portionSize = 10}: propsType) => {
    let pageCount = Math.ceil(totalItemsCount / pageSize);
    let pages = [];
    for (let i = 1; i <= pageCount; i++) {
        pages.push(i);
    }

    let portionCount = Math.ceil(pageCount / portionSize) //portionSize-получаем из пропс
    //узнаем сколько порций у нас получится
    let [portionNumber, setPortionNumber] = useState(1)
    //здесь хранится номер порции
    let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
    //левая граница порции
    let rightPortionPageNumber = portionNumber * portionSize;
    //правая граница порции

    return (
        <div>
            <div className={styles.pagesBlock}>
                {portionNumber > 1 && <button onClick={() => {
                    setPortionNumber(portionNumber - 1)
                }}>prev</button>}
                {/*левая кнопка prev, которая появляется, когда есть куда возвращаться*/}
                {pages
                    .filter(f => f >= leftPortionPageNumber && f <= rightPortionPageNumber)
                    //раньше заливали все номера, чейчас делим на порции
                    .map(p =>
                        <span className={
                            currentPage === p ? styles.selectedPage : styles.pages}
                              onClick={(event) => {
                                  onPageChange(p)
                              }}>{p}</span>
                    )}
                {portionCount > portionNumber &&
                <button onClick={() => {setPortionNumber(portionNumber + 1)
                }}>next</button>}
                {/*правая кнопка next, которая исчезает, когда есть куда идти вперед*/}
            </div>
        </div>
    )
}








