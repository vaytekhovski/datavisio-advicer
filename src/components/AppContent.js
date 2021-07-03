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

export default function SimpleContainer(props) {

  const [isShowStat, setStatShowing] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [loadingStatus, setLoadingStatus] = useState();
  const [isError, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState();
  const [rows, setRows] = useState();
  const [profit, setProfit] = useState();


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

  function calculateProfit(data) {
    let bufProfit = {
      countOfProfitDeals: 0,
      countOfLossDeals: 0,
      totalCount: 0,
      profitAmount: 0,
      lossAmount: 0,
      totalAmount: 0
    };

    bufProfit.countOfProfitDeals = data.filter(x => x.profit > 0).length;
    bufProfit.countOfLossDeals = data.filter(x => x.profit < 0).length;
    bufProfit.totalCount = data.length;
    bufProfit.profitAmount = Math.round(data.filter(x => x.profit > 0).map(x => x.profit).reduce((a, b) => parseFloat(a) + parseFloat(b)));
    bufProfit.lossAmount = Math.round(data.filter(x => x.profit < 0).map(x => x.profit).reduce((a, b) => parseFloat(a) + parseFloat(b)));
    bufProfit.totalAmount = bufProfit.profitAmount + bufProfit.lossAmount;

    setProfit(bufProfit);
    return bufProfit.totalAmount;
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
      let profit = calculateProfit(bufRows.reverse());
      SendHistory(window.location.search, profit,bufRows[0].exchange,bufRows[0].currency, bufRows[0].dates);

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
            history={props.history}
          />

          {isShowStat && !isLoading && !isError && <Statistics rows={rows} profit={profit} />}
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

function SendHistory(search, profit, exchange, currency, dates) {
  postData('http://134.122.64.43:8895/api/Emulation/addHistory',
    {
      UserId: localStorage.getItem("userId"),
      Exchange: exchange,
      Currency: currency,
      Dates: dates,
      Search: search,
      profit, profit
    });
}

async function postData(url = '', data = {}) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *client
    body: JSON.stringify(data) // body data type must match "Content-Type" header
  });
  return await response.json(); // parses JSON response into native JavaScript objects
}
