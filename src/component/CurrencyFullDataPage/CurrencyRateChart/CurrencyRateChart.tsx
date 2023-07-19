import React, {useEffect, useState} from 'react'
import {CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis} from 'recharts'
import {currenciesAPI} from '../../../API/currenciesAPI'
import {Preloader} from '../../common/Preloader'
import {CurrencyRateChartType} from '../../../types/types'
import s from './CurrencyRateChart.module.scss'

type CurrencyRateChartPropsType = {
    id: number
    startDate: string
    endDate: string
    scale: number
    abbreviation: string
    setEndDate?: Function
}

export function CurrencyRateChart({scale, abbreviation, id, startDate, endDate}: CurrencyRateChartPropsType) {
    const [currencyRateChart, setCurrencyRateChart] = useState<CurrencyRateChartType[] | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        currenciesAPI.getRateCurrencyDynamics(id, new Date(startDate).toISOString(), new Date(endDate).toISOString())
            .then(res =>
                setCurrencyRateChart(res)
            ).then(() => setLoading(false))
    }, [id, startDate, endDate])

    if (loading) {
        return <Preloader mini={true}/>
    }

    return (
        <div>
            {currencyRateChart && currencyRateChart.length > 0 ? (
                <LineChart
                    width={350}
                    height={300}
                    data={currencyRateChart}
                    margin={{
                        top: 20,
                        right: 20,
                        left: 0,
                        bottom: 20
                    }}
                >
                    <CartesianGrid strokeDasharray="4 4"/>
                    <XAxis dataKey="Date"/>
                    <YAxis/>
                    <Tooltip/>
                    <Legend/>
                    <Line
                        type="monotone"
                        dataKey="Cur_OfficialRate"
                        stroke="#da6767"
                        activeDot={{r: 8}}
                        name={`Курс ${scale} ${abbreviation} - BYN`}
                    />
                </LineChart>
            ) : (<div className={s.notification}>Данных по курсу на этот промежуток времени не
                найдено!</div>)}
        </div>
    )
}