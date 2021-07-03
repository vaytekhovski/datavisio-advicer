import React from 'react'
import styles from '../styles/statistics.module.css'
import Table from './Table.js'
import Box from '@material-ui/core/Box';


export default function Statistics(props) {
    return (
        <>
            <div className={styles.statisticsContainer}>
                <div className={styles.profitContainer}>
                    <Box className={styles.profitBox} style={{backgroundColor:"#c6ffc8"}}><h1>{props.profit.countOfProfitDeals}</h1><h4>Count of profit deals</h4></Box>
                    <Box className={styles.profitBox} style={{backgroundColor:"#ffc6c6"}}><h1>{props.profit.countOfLossDeals}</h1><h4>Count of loss deals</h4></Box>
                    <Box className={styles.profitBox} style={{backgroundColor:"#fffbc6"}}><h1>{props.profit.totalCount}</h1><h4>Total count of deals</h4></Box>
                    <Box className={styles.profitBox} style={{backgroundColor:"#c6ffc8"}}><h1>$ {props.profit.profitAmount}</h1><h4>Profit amount</h4></Box>
                    <Box className={styles.profitBox} style={{backgroundColor:"#ffc6c6"}}><h1>$ {props.profit.lossAmount}</h1><h4>Loss amount</h4></Box>
                    <Box className={styles.profitBox} style={{backgroundColor:"#fffbc6"}}><h1>$ {props.profit.totalAmount}</h1><h4>Total amount</h4></Box>
                </div>
                {props.rows && <Table rows={props.rows} />}
            </div>
        </>
    )
}