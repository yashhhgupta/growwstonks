const env = process.env.KEY_API

export const helper = {
    Intraday : {
        apii : "https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=5min&apikey="+`${env}`,
        keyy : "Time Series (5min)",
    },
    Daily : {
        apii : "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=IBM&apikey="+`${env}`,
        keyy : "Time Series (Daily)",
    },
    Weekly : {
        apii : "https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY&symbol=IBM&apikey="+`${env}`,
        keyy : "Weekly Time Series",
    },
    Monthly : {
        apii : "https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=IBM&apikey="+`${env}`,
        keyy : "Monthly Time Series",
    },
}
// export const helper = {
//     Intraday : {
//         apii : "https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=5min&apikey=demo",
//         keyy : "Time Series (5min)",
//     },
//     Daily : {
//         apii : "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=IBM&apikey=demo",
//         keyy : "Time Series (Daily)",
//     },
//     Weekly : {
//         apii : "https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY&symbol=IBM&apikey=demo",
//         keyy : "Weekly Time Series",
//     },
//     Monthly : {
//         apii : "https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=IBM&apikey=demo",
//         keyy : "Monthly Time Series",
//     },
// }

export type Helper = typeof helper;

export type HelperChild =typeof helper.Intraday;