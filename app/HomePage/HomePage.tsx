'use client'
import React from 'react'
import styles from "./HomePage.module.css"
import StockCard from '../components/StockCard/StockCard'
import Stock from '../components/StockCard/types'
import Link from 'next/link'
import {logolist} from "../../data/ImageData"
const tempStyle = {
  color: "black",
  fontWeight: "600",
  borderBottom: "2px solid #B66034"
}
const HomePage = () => {
  const env = process.env.KEY_API
  const [option, setOption] = React.useState("top_gainers")
  const [gainers, setGainers] = React.useState<Stock[]>([])
  const [losers, setLosers] = React.useState<Stock[]>([])
  const loadStockData = async () => {
    const res = await fetch("https://www.alphavantage.co/query?function=TOP_GAINERS_LOSERS&apikey="+`${env}`)
    // const res = await fetch("https://www.alphavantage.co/query?function=TOP_GAINERS_LOSERS&apikey=demo")
    const data = await res.json()
    console.log(data);
    
    setGainers(data.top_gainers)
    setLosers(data.top_losers)
  }
  React.useEffect(() => {
    loadStockData()
  }, [])
  
  return (
    <div className={styles.container}>
      <div className={styles.selector}>
        <div className={styles.options} onClick={() => {
          setOption("top_gainers")
        }}
          style={option === "top_gainers" ? tempStyle : {}}
        >
          Top Gainers
        </div>
        <div onClick={() => {
          setOption("top_losers")
        }} style={option === "top_losers" ? tempStyle : {}}>
          Top Losers
        </div>
      </div>
      {option === "top_gainers" && gainers && (
        <div className={styles.stocksContainer}>
          {gainers.map((stock, index) => {
            return (
              <Link href={{
                pathname: `/stock/${stock.ticker}`,
                query: {
                  price: stock.price,
                  percentage: stock.change_percentage,
                  ticker : stock.ticker,
                  image:logolist[index],
                }
              }} key={index}>
                <StockCard key={index} stock={stock} option={option} image={logolist[index]}/>
              </Link>
            )
          })}
        </div>
      )}
      {option === "top_gainers" && !gainers && (
        <div className={styles.error}>No data Found</div>
      )}
      {option === "top_losers" && losers &&(
        <div className={styles.stocksContainer}>
          {losers.map((stock, index) => {
            return (
              <Link href={{
                pathname: `/stock/${stock.ticker}`,
                query: {
                  price: stock.price,
                  percentage: stock.change_percentage
                }
              }} key={index}>
                <StockCard key={index} stock={stock} option={option} image={logolist[index]}/>
            </Link>

            )
          })}
        </div>
      )}
      {option === "top_losers" && !gainers && (
        <div className={styles.error}>No data Found</div>
      )}
    </div>
  )
}

export default HomePage