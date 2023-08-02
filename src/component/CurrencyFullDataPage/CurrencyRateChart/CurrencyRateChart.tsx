import React, {useEffect} from 'react'
import {CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis} from 'recharts'
import s from './CurrencyRateChart.module.scss'
import {getRateCurrencyDynamics, updateStartEndDates} from '../../../store/currency-reducer'
import {Dispatch} from 'redux'
import {useDispatch, useSelector} from 'react-redux'
import {AppStateType} from '../../../store/store'

type CurrencyRateChartPropsType = {
    id: number
    startDate: string
    endDate: string
    scale: number
    abbreviation: string
}

export function CurrencyRateChart(props: CurrencyRateChartPropsType) {
    const {scale, abbreviation, id, startDate, endDate} = props
    const CurrencyRate = useSelector((state: AppStateType) => state.currency.CurrencyRate)
    const countMonth = useSelector((state: AppStateType) => state.currency.datePeriod.countMonth)
    const dispatch: Dispatch<any> = useDispatch()

    useEffect(() => {
        dispatch(updateStartEndDates(endDate, countMonth))
    }, [endDate, countMonth, dispatch])

    useEffect(() => {
        dispatch(getRateCurrencyDynamics(id, startDate, endDate))
    }, [id, startDate, endDate, dispatch])

    return (
        <>
            {CurrencyRate.length > 0 ? (
                <LineChart
                    width={350}
                    height={300}
                    data={CurrencyRate}
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
            ) : (
                <span className={s.notification}>
                    Данных по курсу на этот промежуток времени не найдено!
                </span>
            )}
        </>
    )
}