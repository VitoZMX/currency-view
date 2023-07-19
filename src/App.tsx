import React, {useEffect, useState} from 'react'
import './App.scss'
import {NavBar} from './component/Navbar/NavBar'
import {HashRouter, Navigate, Route, Routes} from 'react-router-dom'
import {CurrenciesPage} from './component/CurrenciesPage/CurrenciesPage'
import {CurrencyFullDataPage} from './component/CurrencyFullDataPage/CurrencyFullDataPage'
import {currenciesAPI} from './API/currenciesAPI'
import {RateType} from './types/types'
import {Preloader} from './component/common/Preloader'
import {subtractWorkday} from './utils/utils'

export function App() {
    const [loading, setLoading] = useState(true)
    const [rateDay, setRateDay] = useState<RateType[]>([])

    useEffect(() => {
        currenciesAPI.getAllCurrenciesRateDaily().then((data) => {
            Promise.all(
                data.map((item) => {
                    return currenciesAPI.getPreviousRateOneCurrencies(item.Cur_ID, subtractWorkday(item.Date))
                        .then((res) => {
                            item.yesterday = res
                            item.exchangeRateDifference = Number((item.Cur_OfficialRate - res.Cur_OfficialRate).toFixed(4))
                        })
                })
            ).then(() => {
                setRateDay(data)
                setLoading(false)
                console.log(data)
            })
        })
    }, [])

    if (loading) return <Preloader/>

    return (
        <HashRouter>
            <NavBar/>
            <Routes>
                <Route path="/currencies" element={<CurrenciesPage rateDay={rateDay}/>}/>
                <Route path="/currency/:id" element={<CurrencyFullDataPage/>}/>
                <Route path="/currency" element={<CurrencyFullDataPage/>}/>
                <Route path="/*" element={<Navigate to={'/currencies'}/>}/>
            </Routes>
        </HashRouter>
    )
}