
import moment from '../node_modules/moment'
var ccxt = require('ccxt')


export default class ProfitCalculator {
    constructor(amount, currency, exchange, startDate, endDate, period) {
        this.amountUSD = amount;
        this.coinAmount = 0;
        this.currency = currency;
        this.exchange = exchange;
        this.startDate = startDate;
        this.endDate = endDate;
        this.period = period;
        this.deals = [];
    }

    setConditions(enterCondition, outCondition) {
        this.enterCondition = enterCondition;
        this.outCondition = outCondition;
        this.isInDeal = false;
        this.enterDiffCount = (enterCondition.length * 60) / this.period.slice(0, this.period.length - 1);
        this.outDiffCount = (outCondition.length * 60) / this.period.slice(0, this.period.length - 1);
    }

    getCurrency(value) {
        let currency = "";
        switch (this.currency) {
            case 1: currency = "BTC"; break;
            case 2: currency = "ETH"; break;
            case 3: currency = "XRP"; break;
        }
        return currency;
    }

    getExchange(value) {
        let exchange = "";
        switch (this.exchange) {
            case 0: exchange = "Binance"; break;
            case 1: exchange = "Bytetrade"; break;
        }
        return exchange;
    }

    async getOHLCV() {
        console.log("start loading data.");
        let ohlcv;
        try {
            switch (this.exchange) {
                case 0:
                    ohlcv = await new ccxt.binance().fetchOHLCV(this.getCurrency(this.currency) + '/USDT', this.period, Date.parse(this.startDate), 1000)
                    break;
                case 1:
                    ohlcv = await new ccxt.bytetrade().fetchOHLCV(this.getCurrency(this.currency) + '/USDT', this.period, Date.parse(this.startDate), 1000)
                    break;
            }
        } catch (e) {
            return "Something went wrong. Please try again!";
        }
        let endDateDiff = moment(this.endDate).add(this.period.slice(0, this.period.length - 1) * -1, this.period[this.period.length - 1]).toDate();

        if (ohlcv.length !== 0) {
            console.log("pending...");

            while (new Date(ohlcv[ohlcv.length - 1][0]) < endDateDiff) {
                let resp;
                switch (this.exchange) {
                    case 0:
                        resp = await new ccxt.binance().fetchOHLCV(this.getCurrency(this.currency) + '/USDT', this.period, ohlcv[ohlcv.length - 1][0], 1000)
                        break;
                    case 1:
                        resp = await new ccxt.bytetrade().fetchOHLCV(this.getCurrency(this.currency) + '/USDT', this.period, ohlcv[ohlcv.length - 1][0], 1000)
                        break;
                }
                ohlcv.push(...resp);
            }

            console.log("data is loaded.")

            let obj = ohlcv.map(element => {
                return {
                    date: new Date(element[0]),
                    open: element[1],
                    high: element[2],
                    low: element[3],
                    close: element[4],
                    volume: element[5]
                };
            })
            this.ohlcvList = obj;
            return obj;
        }
        else {
            console.log("No data. Choose other dates");
            return "No data. Choose other dates";
        }
    }

    getDiff(a, b) {
        let res = 0;
        a > b ?
            res = (((a - b) / a) * 100) * -1 :
            res = ((b - a) / a) * 100;
        return res;
    }

    async calculate() {
        console.log("start calculating...");
        if (this.ohlcvList.length != 0) {
            for (let i = this.enterDiffCount + 1; i < this.ohlcvList.length; i++) {
                this.isInDeal ? this.leaveDeal(i) : this.enterDeal(i);
            }
        }
        console.log("end calculating.")
        if (this.deals.length == 0) {
            console.log("No data. Choose other dates");
            return ("No data. Choose other dates");
        } else {
            return this.deals;
        }
    }

    enterDeal(i) {
        for (let iDiff = i - this.enterDiffCount; iDiff < i; iDiff++) {
            if (!this.isInDeal) {
                let diff = this.getDiff(this.ohlcvList[i].close, this.ohlcvList[iDiff].close);

                let isPriceGrowth = diff > 0;
                let isGrowthSatisfy = Math.abs(diff) >= this.enterCondition.value;

                let canEnterDeal = this.enterCondition.condition == 1 ?
                    isPriceGrowth && isGrowthSatisfy :
                    !isPriceGrowth && isGrowthSatisfy;

                if (canEnterDeal) {
                    console.log("enter deal...");
                    this.enterPosition = i;
                    this.addNewDeal(i);
                }
            } else {
                break;
            }
        }
    }

    leaveDeal(i) {
        let iDiff = (i - this.outDiffCount) < this.enterPosition ? this.enterPosition : i - this.outDiffCount;
        for (iDiff; iDiff < i; iDiff++) {
            if (this.isInDeal) {
                let diff = this.getDiff(this.ohlcvList[i].close, this.ohlcvList[iDiff].close);

                let isPriceGrowth = diff > 0;
                let isGrowthSatisfy = Math.abs(diff) >= this.outCondition.value;

                let canLeaveDeal = this.outCondition.condition == 1 ?
                    isPriceGrowth && isGrowthSatisfy :
                    !isPriceGrowth && isGrowthSatisfy;

                if (canLeaveDeal) {
                    console.log("leave deal...");
                    this.addNewDeal(i);
                }
            } else {
                break;
            }

        }
    }

    addNewDeal(i) {
        let tempAmount = this.isInDeal ? this.coinAmount : this.amountUSD / this.ohlcvList[i].close;
        let deal = {
            price: this.ohlcvList[i].close,
            coinAmount: this.isInDeal ? this.coinAmount : this.amountUSD / this.ohlcvList[i].close,
            usdAmount: this.isInDeal ? this.coinAmount * this.ohlcvList[i].close : this.amountUSD,
            date: this.ohlcvList[i].date,
            side: this.isInDeal ? "sell" : "buy",
            currency: this.getCurrency(this.currency),
            exchange: this.getExchange(this.exchange)
        };

        if (this.isInDeal) {
            deal.profitUSD = deal.usdAmount - this.deals[this.deals.length - 1].usdAmount;
            deal.percentProfit = this.getDiff(this.deals[this.deals.length - 1].usdAmount, deal.usdAmount)
        }

        this.deals.push(deal);
        this.amountUSD = this.isInDeal ? deal.usdAmount : 0;
        this.coinAmount = this.isInDeal ? 0 : deal.coinAmount;


        this.isInDeal = !this.isInDeal;
    }
}





