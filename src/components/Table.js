import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
});





function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row" style={{ whiteSpace: 'noWrap' }}>
          {row.dates}
        </TableCell>
        <TableCell align="right">{row.exchange}</TableCell>
        <TableCell align="right">{row.currency}</TableCell>
        <TableCell align="right">{row.amount}</TableCell>
        <TableCell align="right" style={{ color: row.profit > 0 ? "green" : "red" }}>{row.profit}</TableCell>
        <TableCell align="right" style={{ color: row.profitpercent > 0 ? "green" : "red" }}>{row.profitpercent}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                History
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Exchange</TableCell>
                    <TableCell>Currency</TableCell>
                    <TableCell>Side</TableCell>
                    <TableCell align="right">Amount</TableCell>
                    <TableCell align="right">Price ($)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.history.map((historyRow, index) => (
                    <TableRow key={index}>
                      <TableCell component="th" scope="row">
                        {historyRow.date}
                      </TableCell>
                      <TableCell>{historyRow.exchange}</TableCell>
                      <TableCell>{historyRow.currency}</TableCell>
                      <TableCell>{historyRow.side}</TableCell>
                      <TableCell align="right">{historyRow.amount}</TableCell>
                      <TableCell align="right">{historyRow.price}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}



export default function CollapsibleTable(props) {


  return (
    <TableContainer component={Paper} style={{ boxShadow: '0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)' }}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Dates</TableCell>
            <TableCell align="right">Exchange</TableCell>
            <TableCell align="right">Currency</TableCell>
            <TableCell align="right">Amount&nbsp;($)</TableCell>
            <TableCell align="right">Profit&nbsp;($)</TableCell>
            <TableCell align="right">Profit&nbsp;(%)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.rows && props.rows.map((row, index) => (
            <Row key={row.name} row={row} key={index} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
