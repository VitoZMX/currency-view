import React, {FC, useEffect, useState} from 'react'
import s from './EnterIdCurrency.module.scss'
import {useNavigate} from 'react-router-dom'
import {useSelector} from 'react-redux'
import {AppStateType} from '../../../store/store'
import {ErrorComponent} from '../../ErrorComponent/ErrorComponent'

type EnterIdCurrencyPropsType = {
    idCur?: string
}

export const EnterIdCurrency: FC<EnterIdCurrencyPropsType> = ({idCur}) => {
    const [valueId, setValueId] = useState<number | string>('')
    const error = useSelector((state: AppStateType) => state.currency.error)
    const navigate = useNavigate()

    useEffect(() => {
        if (idCur) setValueId(idCur)
    }, [idCur])

    const handleSearchClick = () => {
        navigate(`/currency/${valueId}`)
    }

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {value} = event.target
        setValueId(value)
    }

    return (
        <div className={s.enterIdContainer}>
            <input className={s.inputId} type="number" placeholder="ID…" value={valueId}
                   onChange={handleInputChange}/>
            <button className={s.btn} onClick={handleSearchClick}>найти валюту</button>
            {error && <ErrorComponent error={error}/>}
        </div>
    )
}