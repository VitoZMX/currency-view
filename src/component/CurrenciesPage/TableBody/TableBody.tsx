import React from 'react'
import s from './../CurrenciesPage.module.scss'
import {useNavigate} from 'react-router-dom'
import {ReactComponent as ArrowSVG} from '../../../assets/image/arrow.svg'
import {CurrencyDataType} from '../../../types/types'

type TableBodyPropsType = {
    curData: CurrencyDataType[]
}

export function TableBody({curData}: TableBodyPropsType) {
    const navigate = useNavigate()

    const handleRedirectToMoreInfo = (id: number) => {
        navigate(`/currency/${id}`)
    }

    return (
        <tbody>
        {curData.map((row) => {
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
    )
}