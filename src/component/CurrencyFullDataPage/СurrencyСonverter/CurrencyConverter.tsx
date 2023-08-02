import React, {ChangeEvent, useEffect, useState} from 'react'
import s from './CurrencyConverter.module.scss'

type CurrencyConverterPropsType = {
    scale: number
    rate: number
    name: string
}

export function CurrencyConverter({scale, rate, name}: CurrencyConverterPropsType) {
    const [bynValue, setBynValue] = useState<number>(rate)
    const [currencyValue, setCurrencyValue] = useState<number>(scale)

    useEffect(() => {
        setBynValue(rate)
        setCurrencyValue(scale)
    }, [scale, rate])

    const handleBynChange = (event: ChangeEvent<HTMLInputElement>): void => {
        const value: number = Number(event.target.value)
        const newBynValue: number = value / rate * scale
        setBynValue(value)
        setCurrencyValue(Number(newBynValue.toFixed(4)))
    }

    const handleCurChange = (event: ChangeEvent<HTMLInputElement>): void => {
        const value: number = Number(event.target.value)
        const newCurValue: number = value * rate / scale
        setCurrencyValue(value)
        setBynValue(Number(newCurValue.toFixed(4)))
    }

    return (
        <div className={s.converterContainer}>
            <h4 className={s.converterTitle}>Конвертер валют</h4>
            <div className={s.converterInputContainer}>
                <label className={s.converterLabel} htmlFor="byn">BYN:</label>
                <input className={s.converterInput} type="number" id="byn" name="BYN" value={bynValue}
                       onChange={handleBynChange}/>
            </div>
            <div className={s.converterInputContainer}>
                <label className={s.converterLabel} htmlFor={name}>{name}:</label>
                <input className={s.converterInput} type="number" id={name} name={name} value={currencyValue}
                       onChange={handleCurChange}/>
            </div>
        </div>
    )
}