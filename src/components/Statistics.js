import React from 'react'
import styles from '../styles/statistics.module.css'
import Table from './Table.js'

export default function Statistics(props) {
    return (
        <>
            <div className={styles.statisticsContainer}>
                {props.rows && <Table rows={props.rows} />}
            </div>
        </>
    )
}