import { Box, Button, FormControl, InputLabel, MenuItem, Select, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

function MainPage(){
    const [valuteData, setValuteData] = useState(false);
    const [valuteArray, setValuteArray] = useState([]);
    const [valuteBase, setValuteBase] = useState("RUB")


    useEffect(() => {
        fetch("https://www.cbr-xml-daily.ru/daily_json.js")
            .then(data => data.json())
            .then(data => setValuteData(data))
    }, [])


    function convertToArray(){
        const array = [
            {
                CharCode: "RUB",
                Name: "Российский рубль",
                Nominal: 1,
                Previous: 1,
                Value: 1
            },
        ];
        for(const name in valuteData.Valute){
            array.push(valuteData.Valute[name])
        }
        setValuteArray(array)
    }


    function changeValuteBase(e){
        setValuteBase(e.target.value)
        const baseIndex = valuteArray.findIndex(item => item.CharCode === e.target.value)
        const baseCoff = 1 / valuteArray[baseIndex].Value;
        valuteArray.map(item => item.Value = (baseCoff * (item.Value)).toFixed(4))
        setValuteArray(valuteArray)
    }

    return(
        <Box>
            <Typography variant="h3">Курс валюты ЦБ РФ на {valuteData && valuteData.Date.slice(0, 10)} </Typography>
            <Typography>Последнее обновление: {valuteData && valuteData.PreviousDate.slice(0, 10)}</Typography>

            <Button
                variant="outlined"
                onClick={() => convertToArray()}
            >load</Button>
            <br />

            <FormControl 
                sx={{width:"200px", mt:"20px"}}
            >
                <InputLabel>BASE</InputLabel>
                <Select
                value={valuteBase}
                label="BASE"
                onChange={(e) => changeValuteBase(e)}
                >
                {valuteArray.map(item =>{
                    return(
                        <MenuItem value={item.CharCode}>{item.CharCode}</MenuItem>
                    )
                })}
                </Select>
            </FormControl>

            {valuteArray.map(item => {
                return(
                    <Typography sx={{mb:"10px"}}>
                        {item.CharCode} {item.Name}, nominal: {item.Nominal} <br/> value: {item.Value} {item.Previous > item.Value ? ' ▼' : " ▲"}
                    </Typography>
                )
            })}
        </Box>
    )
    
}

export default MainPage