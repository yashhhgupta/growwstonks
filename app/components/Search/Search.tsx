"use client"
import React from 'react'
import styles from "./Search.module.css"
import { BiSearchAlt2 } from "react-icons/bi"
import useDebounce from '@/hooks/useDebounce'

type SearchedData={
    "1. symbol":string,
    "2. name":string,
}
const Search = () => {
    const env = process.env.KEY_API
    const [arr,setArr] = React.useState<SearchedData[]>([])
    const [search,setSearch] = React.useState<string>("")
    const debouncedSearch = useDebounce(search, 500);
    const loadStockData = async () => {
    // const res = await fetch("https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords="+`${search}`+"&apikey="+`${env}`)
    const res = await fetch("https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=tesco&apikey=demo")
    const data = await res.json()
    setArr(data.bestMatches);
    }
    React.useEffect(() => {
        if (debouncedSearch)
            loadStockData()
    }, [debouncedSearch])
    const InputHandler =(event:any)=>{
        setSearch(event.target.value)
    }
    
  return (
    <div className={styles.container}>
        <div className={styles.search} 
        style={search===""?{borderRadius:"30px"}:{}}
        >
          <BiSearchAlt2 style={{ color: "white", fontSize: "20px" }} />
          <input type="text" placeholder="Search stocks and etfs" className={styles.input} onChange={InputHandler} />
        </div>
        { search.length>0 && arr &&
        <div className={styles.box}>
        {   
            arr.map((item : SearchedData,index)=>{
                const name = item["2. name"]
                const ticker = item["1. symbol"]
                return(
                    
                        <div className={styles.item} key={index}>
                        {name} {ticker}
                        </div>
                
                )
            })
        }
            {arr.length===0 && <div className={styles.item}>No results found</div>}
        </div>
    }
    </div>
  )
}

export default Search