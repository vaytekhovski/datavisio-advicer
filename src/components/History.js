import React, { useState, useEffect } from 'react'
import Container from '@material-ui/core/Container';

import Button from '@material-ui/core/Button';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import LinearProgress from '@material-ui/core/LinearProgress';




async function getData(url = '') {
    // Default options are marked with *
    const response = await fetch(url, {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *client
        //   body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    return await response.json(); // parses JSON response into native JavaScript objects
}


export default function History() {
    const [history, setHistory] = useState();

    useEffect(() => {
        getData('http://134.122.64.43:8895/api/Emulation/history?userId=' + localStorage.getItem("userId"))
            .then(data => setHistory(data.history));
    })

    return (
        <>
            <Container maxWidth="md">
                <h1>History</h1>
                <div style={{ display: "flex", flexDirection: "column" }}>

                    {history ? history.map(element =>
                        <Button
                            style={{ justifyContent: "space-between" }}
                            color="inherit"
                            endIcon={<ArrowForwardIosIcon />}
                            href={"/dashboard" + element.search}>
                            <span style={{width:"200px"}}>Exchange: <strong>{element.exchange}</strong></span>
                            <span style={{width:"180px"}}>Currency: <strong>{element.currency}</strong></span>
                            <span style={{width:"220px"}}>Dates: <strong>{element.dates}</strong></span>
                            <span style={{width:"180px"}}>Profit: <strong style={{ color: element.profit > 0 ? "green" : "red" }}>{element.profit > 0 ? "+" : "-"}${Math.abs(element.profit)}</strong></span>
                        </Button>
                    )
                        :
                        <>
                            <h2>Loading...</h2>
                            <LinearProgress />

                        </>
                    }


                </div>

            </Container>
        </>
    )
}
