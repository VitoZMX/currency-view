import React, {useEffect, useState} from 'react'
import s from './ExchangeDifference.module.scss'
import {ReactComponent as ArrowSVG} from '../../../assets/image/arrow.svg'

type ExchangeDifferencePropsType = {
    Name: string
    Scale: number
    exchangeRateDifference: number
    Rate: number
}

export function ExchangeDifference({exchangeRateDifference, Rate, Name, Scale}: ExchangeDifferencePropsType) {
    const [rateClass, setRateClass] = useState<'positive' | 'negative' | ''>('')

    useEffect(() => {
        if (exchangeRateDifference > 0) {
            setRateClass('positive')
        } else {
            setRateClass('negative')
        }
    }, [exchangeRateDifference])

    return (
        <div className={s.currencyRate}>
            <span className={s.currencyName}>{Scale} {Name}</span>
            <span className={s.currencyRateValue}>{Rate} BYN</span>
            <span className={`${s.currencyDifference} ${s[rateClass]} ${rateClass}`}>
                 {exchangeRateDifference} <ArrowSVG/>
            </span>
        </div>
    )
}