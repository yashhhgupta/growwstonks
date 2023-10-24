import React from 'react'
import styles from "./StockPage.module.css"
import { BiSolidUpArrow } from 'react-icons/bi'
import { BiSolidDownArrow } from 'react-icons/bi'
import Graph from '@/app/components/Graph/Graph'

export default async function StockPage({ searchParams }: {
  searchParams: {
    price: string,
    percentage: string,
    ticker: string,
    image: string
  }
}) {
  const env = process.env.KEY_API
  const res = await fetch("https://www.alphavantage.co/query?function=OVERVIEW&symbol="+`${searchParams.ticker}`+"&apikey="+`${env}`)
  // const res = await fetch("https://www.alphavantage.co/query?function=OVERVIEW&symbol=IBM&apikey=demo")
  const stockData = await res.json()
  
  const info ={
    price:searchParams.price,
    percentage:parseFloat(searchParams.percentage).toFixed(2).toString(),
  }
  const tempData =[
    {
      title : "Market Cap",
      value: "$"+stockData.MarketCapitalization
    },
    {
      title : "P/E Ratio",
      value: stockData.PERatio
    },
    {
      title : "Beta",
      value: stockData.Beta
    },
    {
      title : "Dividend Yield",
      value: parseFloat(stockData.DividendYield).toFixed(2).toString() + "%"
    },
    {
      title: "Profit Margin",
      value: stockData.ProfitMargin
    }
  ]
  
  return (
    <>
    {!stockData &&(
      <div className={styles.error}>
        Compnay data not found
      </div>
    )}
    {stockData &&(
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.left}>
          <img src={searchParams.image} className={styles.img}></img>
          <div className={styles.title}>
            <div style={{color:"black"}}>
              {stockData.Name}
            </div>
            <div>{stockData.Symbol},{stockData.AssetType}</div>
            <div>NSQ</div>
          </div>
        </div>
        <div className={styles.right}>
          <div className={styles.price}>${info.price}</div>
          <div className={styles.percentage}
         style={info.percentage[0] === "-" ? { color: "red" } : { color: "green" }}
          >{info.percentage}% {info.percentage[0] !== "-" ?
              <BiSolidUpArrow /> :
              <BiSolidDownArrow />}</div>
          </div>
      </div>
      <Graph/>
      <div className={styles.body}>
        <div className={styles.about}>
          About {stockData.Name}
        </div>
        <div className={styles.desc}>
        <div style={{fontWeight:450, fontSize:"14px", color: "#6E645E"}}>
        {stockData.Description}
        </div>
        <div className={styles.tags}>
          <div className={styles.tag}>Industry: {stockData.Industry}</div>
          <div className={styles.tag}>Sector: {stockData.Sector}</div>
        </div>
        <div className={styles.priceRegion}>
          <div>
            <div className={styles.priceTitle}>52-Week Low</div>
            <div className={styles.priceValue}>${stockData["52WeekLow"]}</div>
          </div>
            <div className={styles.priceBar}>
                Current Price: ${info.price}<BiSolidDownArrow/></div>
          <div>
            <div className={styles.priceTitle}>52-Week High</div>
            <div className={styles.priceValue}>${stockData["52WeekHigh"]}</div>
          </div>
        </div>
        <div className={styles.footer}>
          {
            tempData.map((item,index) => {
              return (
                <div key={index}>
                  <div className={styles.priceTitle}>{item.title}</div>
                  <div className={styles.priceValue}>{item.value}</div>
                  </div>
              )
            })
          }
        </div>
        </div>
      </div>
    </div>
    )}
    </>
  )
}





