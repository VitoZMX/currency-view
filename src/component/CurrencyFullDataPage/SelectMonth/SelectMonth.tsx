import React, {ChangeEvent} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {AppStateType} from '../../../store/store'
import {updateCountMonth} from '../../../store/currency-reducer'
import {Dispatch} from 'redux'
import s from './SelectMonth.module.scss'

export type SelectMonthPropsType = {
    Date: string
}

export function SelectMonth({Date}: SelectMonthPropsType) {
    const countMonth = useSelector((state: AppStateType) => state.currency.datePeriod.countMonth)
    const DateV = Date.split('T')[0].replace(/-/g, '.')
    const dispatch: Dispatch<any> = useDispatch()

    const handleChangeSelectMonth = (event: ChangeEvent<HTMLSelectElement>) => {
        dispatch(updateCountMonth(event.target.value as string))
    }

    return (
        <div>
            <label>Выберете за сколько последних месяцев от {DateV} отобразить график</label>
            <select className={s.selectMonth} id="number-select" name="number" value={countMonth}
                    onChange={handleChangeSelectMonth}>

                {Array.from({length: 11}, (_, i) => (
                    <option key={i} value={i + 1}>
                        {i + 1}
                    </option>
                ))}

            </select>
        </div>
    )
}