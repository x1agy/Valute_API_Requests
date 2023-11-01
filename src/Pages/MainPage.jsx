import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

function MainPage(){
    const [valuteData, setValuteData] = useState(false)
    const [valuteArray, setValuteArray] = useState([]);

    async function getData(){
        const response = await fetch("https://www.cbr-xml-daily.ru/daily_json.js")
        const jsonData = await response.json()
        setValuteData(jsonData)
        const array = [];
        for(const name in valuteData.Valute){
            array.push(valuteData.Valute[name])
        }
        setValuteArray(array)
    }
    useEffect(() => {
        getData()
    }, [])


    return(
        <Box>
            <Typography variant="h3">Курс валюты ЦБ РФ на {valuteData && valuteData.Date.slice(0, 10)} </Typography>
            <Typography>Последнее обновление: {valuteData && valuteData.PreviousDate.slice(0, 10)}</Typography>
            {valuteArray.map(item => {
                return(
                    <Typography sx={{mb:"10px"}}>
                        {item.CharCode} {item.Name}, nominal: {item.Nominal} <br/> value: {item.Value}
                    </Typography>
                )
            })}
        </Box>
    )
    
}

export default MainPage