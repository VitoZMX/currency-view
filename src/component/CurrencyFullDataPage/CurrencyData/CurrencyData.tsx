import React from 'react'
import {CurrencyDataType} from '../../../types/types'
import s from './CurrencyData.module.scss'

type CurrencyDataPropsType = {
    curData: CurrencyDataType
}

export function CurrencyData({curData}: CurrencyDataPropsType) {
    const {
        Cur_ID,
        Date,
        Cur_Abbreviation,
        Cur_Scale,
        pastData,
        Cur_Name,
        Cur_OfficialRate
    } = curData

    const clearDate = Date.split('T')[0].replace(/-/g, '.')

    return (
        <div className={s.currencyData}>

            <div className={s.currencyRow}>
                <h4 className={s.currencyLabel}>Название валюты:</h4>
                <span className={s.currencyValue}>{Cur_Name}</span>
            </div>

            <div className={s.currencyRow}>
                <h4 className={s.currencyLabel}>Внутренний код валюты (id):</h4>
                <span className={s.currencyValue}>{Cur_ID}</span>
            </div>

            <div className={s.currencyRow}>
                <h4 className={s.currencyLabel}>{clearDate} курс составлет:</h4>
                <span className={s.currencyValue}>{Cur_Scale} {Cur_Abbreviation} - {Cur_OfficialRate} BYN</span>
            </div>

            <div className={s.currencyRow}>
                <h4 className={s.currencyLabel}>{pastData.Date} курс составлял:</h4>
                <span className={s.currencyValue}>{Cur_Scale} {Cur_Abbreviation} - {pastData.Cur_OfficialRate} BYN</span>
            </div>

        </div>
    )
}