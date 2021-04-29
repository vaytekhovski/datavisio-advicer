import React from 'react'
import styles from '../styles/statistics.module.css'
import Table from './Table.js'

export default function Statistics(){
    return(
        <>
            <div className={styles.statisticsContainer}>
                <Table/>
            </div>
        </>
    )
}