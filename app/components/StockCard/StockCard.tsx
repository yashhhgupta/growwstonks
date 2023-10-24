'use client'
import React from 'react'
import styles from './StockCard.module.css'
import Stock from './types'
import { BiSolidUpArrow, BiSolidDownArrow } from 'react-icons/bi'
interface StockCardProps {
  key: number,
  stock: Stock,
  option: string,
  image : any
}
const StockCard = (prop: StockCardProps) => {
  const { stock, option,image } = prop
  const [stockData, setStockData] = React.useState<Stock>(
    { ...stock, change_percentage: parseFloat(stock.change_percentage).toFixed(2).toString(), }
  )
  return (
    <>
      <div className={styles.card}>
        <div className={styles.upper}>
          <img src={image} className={styles.img}></img>
          <div className={styles.title}>{stockData.ticker}</div>
        </div>
        <div className={styles.lower}>
          <div className={styles.percentage}
            style={option == "top_gainers" ? { color: "green" } : { color: "red" }}
          >{stockData.change_percentage}%
            {option == "top_gainers" ?
              <BiSolidUpArrow /> :
              <BiSolidDownArrow />}
          </div>
          <div className={styles.price}>${stockData.price}</div>
        </div>
      </div>
    </>
  )
}

export default StockCard