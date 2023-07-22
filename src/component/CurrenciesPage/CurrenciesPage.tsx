import React from 'react'
import s from './CurrenciesPage.module.scss'
import {RateType} from '../../types/types'
import {useNavigate} from 'react-router-dom'
import {ReactComponent as ArrowSVG} from '../../assets/image/arrow.svg'

type CurrenciesPagePropsType = {
    rateDay: RateType[]
}

export function CurrenciesPage({rateDay}: CurrenciesPagePropsType) {
    const navigate = useNavigate()

    const handleRedirectToMoreInfo = (id: number) => {
        navigate(`/currency/${id}`)
    }

    return (
        <div className={'container'}>
            <table className={s.table}>
                <thead>
                <tr>
                    <th>Наименование иностранной валюты</th>
                    <th>Количество единиц иностранной валюты, буквенный код валюты</th>
                    <th>Официальный курс</th>
                    <th>Дата курса (ГГГГ.ММ.ДД)</th>
                </tr>
                </thead>
                <tbody>
                {rateDay.map((row) => {
                    const date = row.Date.split('T')[0].replace(/-/g, '.')
                    const rateClass = row.exchangeRateDifference && row.exchangeRateDifference > 0 ? 'positive' : 'negative'

                    return (
                        <tr key={row.Cur_ID} onClick={() => handleRedirectToMoreInfo(row.Cur_ID)}>
                            <td>{row.Cur_Name}</td>
                            <td>{row.Cur_Scale} {row.Cur_Abbreviation}</td>
                            <td className={`${s[rateClass]} ${rateClass}`}>
                                {row.exchangeRateDifference !== 0 && (<ArrowSVG/>)}
                                {row.Cur_OfficialRate} BYN
                            </td>
                            <td>{date}</td>
                        </tr>
                    )
                })}
                </tbody>
            </table>
        </div>
    )
}