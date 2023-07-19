import React, {FC, useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import s from './EnterIdCurrency.module.scss'

type EnterIdCurrencyPropsType = {
    idCur?: string
}

export const EnterIdCurrency: FC<EnterIdCurrencyPropsType> = ({idCur}) => {
    const [valueId, setValueId] = useState<number | string>('')
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
        <div>
            <input className={s.input_field} type={'number'} placeholder="ID…" value={valueId}
                   onChange={handleInputChange}/>
            <button onClick={handleSearchClick}>найти валюту</button>
        </div>
    )
}