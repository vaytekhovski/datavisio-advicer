import React, { useState, useEffect } from 'react';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputAdornment from '@material-ui/core/InputAdornment';
import Slider from '@material-ui/core/Slider';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';

import { DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import styles from '../../styles/filter.module.css'
import DateFnsUtils from '@date-io/date-fns';
import ConditionFiler from './ConditionFilter.js'
import moment from '../../../node_modules/moment'


import ProfitCalculator from '../../ccxtService';

const TimePeriods = [
    {
        value: 0,
        label: '1m',
    },
    {
        value: 10,
        label: '3m',
    },
    {
        value: 20,
        label: '5m',
    },
    {
        value: 30,
        label: '15m',
    },
    {
        value: 40,
        label: '30m',
    },
    {
        value: 50,
        label: '1h',
    },
    {
        value: 60,
        label: '2h',
    },
    {
        value: 70,
        label: '4h',
    },
    {
        value: 80,
        label: '6h',
    },
    {
        value: 90,
        label: '8h',
    },
    {
        value: 100,
        label: '12h',
    },
];
function valuetext(value) {
    return `${value}°C`;
}

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
        maxWidth: 300,
    },
    chips: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    chip: {
        margin: 2,
    },
    noLabel: {
        marginTop: theme.spacing(3),
    },
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const Conditions = [
    'PRICE',

];

function getStyles(name, personName, theme) {
    return {
        fontWeight:
            personName.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}


export default function Filter(props) {
    const [exchange, setExchange] = React.useState(1);
    const [currency, setCurrency] = React.useState(1);
    const [startDate, setStartDate] = React.useState(moment(Date.now()).add(-30, 'd'));
    const [endDate, setEndDate] = React.useState(Date.now());
    const [amount, setAmount] = React.useState(1000);
    const [timePeriod, setTimePeriod] = React.useState(30);
    const [enterCondition, setEnterCondition] = React.useState({});
    const [outCondition, setOutCondition] = React.useState({});
    const [deals, setDeals] = React.useState();


    const handleExchangeChange = (event) => {
        setExchange(event.target.value);
    };

    const handleCurrencyChange = (event) => {
        setCurrency(event.target.value);
    };

    const handleStartDateChange = (date) => {
        setStartDate(date);
    };

    const handleEndDateChange = (date) => {
        setEndDate(date);
    };
    const handleAmountChange = (value) => {
        setAmount(value.target.value);
    }
    const handleTimePeriodChange = (event,value) => {
        setTimePeriod(value);
    }

    const onEnterConditionChange = (value) => {
        setEnterCondition(value);
    }

    const onOutConditionChange = (value) => {
        setOutCondition(value);
    }

    const handleSubmit = () => {
        // props.setData({});
        props.setError(false);
        props.setLoading(true);
        props.setLoadingStatus("Loading data from Bytetrade...")
        let pc = new ProfitCalculator(
            amount,
            currency,
            exchange,
            new Date(startDate),
            new Date(endDate),
            TimePeriods.find(t => t.value == timePeriod).label
        );

        if (enterCondition.checked && outCondition.checked) {
            pc.setConditions(enterCondition, outCondition);

            pc.getOHLCV().then(res => {
                if (typeof res !== "object") {
                    props.setLoading(false);
                    props.setErrorMessage(res);
                    props.setError(true);
                } else {
                    props.setLoadingStatus("Calculating profit...");
                    pc.calculate().then(res => {
                        props.setLoading(false);
                        if (typeof res !== "object" || res.lenght == 0) {
                            props.setErrorMessage(res);
                            props.setError(true);
                        } else {
                            console.log("end calculating"); 
                            setDeals(res);
                            props.createRows(res);
                            props.setStatShowing(true);

                        }
                    })
                }
            });
        } else {
            props.setLoading(false);
            props.setErrorMessage("Please check enter and out conditions");
            props.setError(true);
        }



    }

    const classes = useStyles();
    const theme = useTheme();


    return (

        <div className={styles.filterContainer}>
            <div className={styles.raw}>
                <Box style={{ width: '33%' }}>
                    <InputLabel htmlFor="standard-adornment-amount">Amount</InputLabel>
                    <Input
                        style={{ minWidth: '99%' }}

                        id="standard-adornment-amount"
                        value={amount}
                        onChange={handleAmountChange}
                        startAdornment={<InputAdornment position="start">$</InputAdornment>}
                    />
                </Box>
                <Box style={{ width: '33%' }}>
                    <FormControl className={styles.formControl} style={{ minWidth: '99% !important' }}
                    >
                        <InputLabel id="demo-simple-select-label">Exchange</InputLabel>
                        <Select

                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={exchange}
                            onChange={handleExchangeChange}
                        >
                            <MenuItem value={1}>Bytetrade</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
                <Box style={{ width: '33%' }}>
                    <FormControl className={styles.formControl} style={{ minWidth: '99% !important' }}
                    >
                        <InputLabel id="demo-simple-select-label">Currency</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={currency}
                            onChange={handleCurrencyChange}
                        >
                            <MenuItem value={1}>BTC</MenuItem>
                            <MenuItem value={2}>ETH</MenuItem>
                            {/* <MenuItem value={3}>XRP</MenuItem> */}

                        </Select>
                    </FormControl>
                </Box>

            </div>
            <div className={styles.raw}>
                <Box style={{ width: '50%' }}>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <DateTimePicker
                            style={{ minWidth: '99%' }}
                            label="Start Date"
                            maxDate={new Date()}
                            value={startDate}
                            onChange={handleStartDateChange}
                            animateYearScrolling
                        />
                    </MuiPickersUtilsProvider>
                </Box>
                <Box style={{ width: '50%' }}>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <DateTimePicker
                            style={{ minWidth: '99%' }}
                            maxDate={new Date()}
                            label="End Date"
                            value={endDate}
                            onChange={handleEndDateChange}
                            animateYearScrolling
                        />
                    </MuiPickersUtilsProvider>
                </Box>
            </div>
            <div className={styles.raw}>

                <Box style={{ width: '100%' }}>
                    <InputLabel id="demo-simple-select-label">Time period</InputLabel>
                    <Slider
                        labelId="demo-simple-select-label"
                        defaultValue={15}
                        getAriaValueText={valuetext}
                        aria-labelledby="discrete-slider-custom"
                        marks={TimePeriods}
                        value={timePeriod}
                        step={null}
                        onChange={handleTimePeriodChange}
                    />
                </Box>
            </div>
            <div className={styles.raw}>
                <Box style={{ width: '50%' }}>
                    <InputLabel id="demo-mutiple-chip-label">Enter condition</InputLabel>
                    {Conditions.map((condition, index) =>
                        <ConditionFiler condition={condition} key={index} onChange={onEnterConditionChange} conditionArrow={2} />
                    )}

                </Box>
                <Box style={{ width: '50%' }}>
                    <InputLabel id="demo-mutiple-chip-label">Out condition</InputLabel>
                    {Conditions.map((condition, index) =>
                        <ConditionFiler condition={condition} key={index} onChange={onOutConditionChange} conditionArrow={1} />
                    )}
                </Box>
            </div>
            <div className={styles.raw}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSubmit}>
                    Check
                </Button>
            </div>
        </div>
    );
}

