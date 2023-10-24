"use client"
import * as React from 'react';
import { Chart } from "react-google-charts";
import styles from "./Graph.module.css"
import {helper,HelperChild} from "./helper"


export default function Graph() {
    const conditionalStyle = {
    backgroundColor:"#AB653F",
        borderRadius:"50%",
        color:"white",
        border:"none",
        padding:"5px"
    };
    const[option,setOption] = React.useState<HelperChild>(helper.Intraday)
    const [data, setData] = React.useState<(string | number)[][]>([["Year"],["Price"]])
    const loadStockData = async () => {
        const res = await fetch(option.apii)
        const data = await res.json()
        const temp = []
        let cnt=0
        for (const [key, value] of Object.entries(data[option.keyy]) as [string, { "1. open": string }][]) {
            const newArr = []
            if(cnt%3===0){
                if(option===helper.Intraday)
                newArr.push(key.split(' ')[1].substring(0, 5))
                else
                newArr.push(key)
            }
            else
                newArr.push("")
            newArr.push(parseFloat(value["1. open"] as string))
            temp.unshift(newArr)
            cnt++;
            if(temp.length === 200) break
        }
        console.log(temp);
        
        setData([
            ["Year","Price"],
            ...temp
        ]
        )
    }
    React.useEffect(() => {
        loadStockData()
    }, [option])
    
    
    const options = {
        title: "Company Performance",
        legend: { position: "bottom" },
        series: [{ color: "#AB653F" }],
    };
    
    return (

        <>
        {data.length>1 && (
        <div className={styles.container}>
        <Chart
            chartType="LineChart"
            width="100%"
            height="400px"
            data={data}
            options={options}
        />
        <div className={styles.buttons}>
            <button onClick={() => {setOption(helper.Intraday) 
            }} className={styles.button}
            style={option === helper.Intraday ? conditionalStyle : {}}
            >1D</button>
            <button onClick={() => {setOption(helper.Daily)
            }} className={styles.button}
            style={option === helper.Daily ? conditionalStyle : {}}>1W</button>
            <button onClick={() => {setOption(helper.Weekly)
            }} className={styles.button}
            style={option === helper.Weekly ? conditionalStyle : {}}>1M</button>
            <button onClick={() => {setOption(helper.Monthly)
            }} className={styles.button}
            style={option === helper.Monthly ? conditionalStyle : {}}>1Y</button>
        </div>
        </div>)}
        {data.length<1 && (
        <div className={styles.error}>No data Found</div>
      )}
        </>
    );
}