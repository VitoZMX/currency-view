import React, {useEffect} from 'react'
import {useParams} from 'react-router-dom'
import {Preloader} from '../common/Preloader'
import {EnterIdCurrency} from './EnterIdCurrency/EnterIdСurrency'
import {CurrencyRateChart} from './CurrencyRateChart/CurrencyRateChart'
import {getCurrencyData} from '../../store/currency-reducer'
import {Dispatch} from 'redux'
import {useDispatch, useSelector} from 'react-redux'
import {AppStateType} from '../../store/store'
import {CurrencyData} from './CurrencyData/CurrencyData'
import {ExchangeDifference} from './ExchangeDifference/ExchangeDifference'
import s from './CurrencyFullDataPage.module.scss'
import {SelectMonth} from './SelectMonth/SelectMonth'
import {CurrencyConverter} from './СurrencyСonverter/CurrencyConverter'

export type PathParamsType = {
    id?: string
}

export function CurrencyFullDataPage() {
    const dispatch: Dispatch<any> = useDispatch()
    const curData = useSelector((state: AppStateType) => state.currency.currencyData)
    const loading = useSelector((state: AppStateType) => state.currency.loadingCurData)
    const error = useSelector((state: AppStateType) => state.currency.error)
    const datePeriod = useSelector((state: AppStateType) => state.currency.datePeriod)
    const CurIdUrl = useParams<PathParamsType>().id

    useEffect(() => {
        if (!CurIdUrl) return
        dispatch(getCurrencyData(CurIdUrl))
    }, [dispatch, CurIdUrl])

    if (loading) return <Preloader/>

    if (error) return <EnterIdCurrency idCur={CurIdUrl}/>

    return (
        <>
            <EnterIdCurrency idCur={CurIdUrl}/>

            <div className={s.box}>
                <CurrencyData curData={curData}/>
                <ExchangeDifference Rate={curData.Cur_OfficialRate}
                                    exchangeRateDifference={curData.exchangeRateDifference}
                                    Name={curData.Cur_Name} Scale={curData.Cur_Scale}/>
            </div>

            <div className={s.reversBox}>
                <CurrencyRateChart id={curData.Cur_ID} startDate={datePeriod.startDate} endDate={datePeriod.endDate}
                                   scale={curData.Cur_Scale} abbreviation={curData.Cur_Abbreviation}/>
                <div>
                    <SelectMonth Date={curData.Date}/>
                    <CurrencyConverter scale={curData.Cur_Scale} rate={curData.Cur_OfficialRate}
                                       name={curData.Cur_Abbreviation}/>
                </div>
            </div>
        </>
    )
}