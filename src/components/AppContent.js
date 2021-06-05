import React, { useState } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Filter from './Filters/Filter.js'
import Statistics from './Statistics.js'
import LinearProgress from '@material-ui/core/LinearProgress';

let styleLinearProgress = {
  top: "-4px",
  borderRadius: "3px"
};

export default function SimpleContainer() {

  const [isShowStat, setStatShowing] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [loadingStatus, setLoadingStatus] = useState();
  const [isError, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState();
  const [rows, setRows] = useState();


  function createData(dates, exchange, currency, amount, profit, profitpercent, history) {
    return {
      dates,
      exchange,
      currency,
      amount,
      profit,
      profitpercent,
      history: history,
    };
  }

  function createRows(data) {
    console.log(data);
    if (data && typeof data === "object") {
      let bufRows = [];
      for (let i = 0; i < data.length - 1; i += 2) {
        bufRows.push(
          createData(
            data[i].date.toLocaleDateString("ru-RU") + ' - ' + data[i + 1].date.toLocaleDateString("ru-RU"),
            'Bytetrade',
            data[i].currency,
            Number(data[i].usdAmount).toFixed(2),
            Number(data[i + 1].profitUSD).toFixed(2),
            Number(data[i + 1].percentProfit).toFixed(2),
            [
              {
                date: data[i].date.toLocaleDateString("ru-RU"),
                exchange: 'Bytetrade',
                currency: data[i].currency,
                side: data[i].side,
                amount: data[i].coinAmount,
                price: data[i].price
              },
              {
                date: data[i + 1].date.toLocaleDateString("ru-RU"),
                exchange: 'Bytetrade',
                currency: data[i + 1].currency,
                side: data[i + 1].side,
                amount: data[i + 1].coinAmount,
                price: data[i + 1].price
              }
            ]
          )
        );
      }
      setRows(bufRows.reverse());
    }
    else {
      setError(true);
      setErrorMessage(data);
    }
  }

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="md">
        <Typography component="div" style={{ height: '100vh' }} >
          <Filter
            setStatShowing={setStatShowing}
            // setData={setccxtResponse}
            setLoading={setLoading}
            setLoadingStatus={setLoadingStatus}
            setError={setError}
            setErrorMessage={setErrorMessage}
            createRows={createRows}
          />

          {isShowStat && !isLoading && !isError && <Statistics rows={rows} />}
          {isLoading && <>
            <LinearProgress style={styleLinearProgress} />
            <h3 style={{ color: "green", textAlign: "center" }}>{loadingStatus}</h3>
          </>}
          {isError && <h3 style={{ color: "red", textAlign: "center" }}>{errorMessage}</h3>}

        </Typography>
      </Container>
    </React.Fragment>
  );
}
