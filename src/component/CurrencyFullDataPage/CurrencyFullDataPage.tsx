import React, {ChangeEvent, useEffect, useState} from 'react'
import s from './CurrencyFullDataPage.module.scss'
import {useNavigate, useParams} from 'react-router-dom'
import {currenciesAPI} from '../../API/currenciesAPI'
import {RateType} from '../../types/types'
import {Preloader} from '../common/Preloader'
import {EnterIdCurrency} from './EnterIdCurrency/EnterIdСurrency'
import {subtractWorkday} from '../../utils/utils'
import {CurrencyRateChart} from './CurrencyRateChart/CurrencyRateChart'
import {ReactComponent as ArrowSVG} from '../../assets/image/arrow.svg'

export type PathParamsType = {
    id?: string
}

export function CurrencyFullDataPage() {
    const [loading, setLoading] = useState<boolean>(false)
    const [userErrorSearch, setUserErrorSearch] = useState<boolean>(false)
    const [ratesCurrency, setRatesCurrency] = useState<RateType>()
    const [data, setData] = useState<RateType>()
    const [countMonth, setCountMonth] = useState('1')
    const CurIdUrl = useParams<PathParamsType>().id
    const [rateClass, setRateClass] = useState<'positive' | 'negative' | ''>('')
    const [startDate, setStartDate] = useState<string>('')
    const [endDate, setEndDate] = useState<string>('')
    const navigate = useNavigate()

    const handleClick = () => {
        navigate('/currencies')
    }
    const handleChangeSelectMonth = (event: ChangeEvent<HTMLSelectElement>) => {
        setCountMonth(event.target.value as string)
    }

    useEffect(() => {
        if (!CurIdUrl) {
            setData(undefined)
            setRatesCurrency(undefined)
            setUserErrorSearch(false)
            return
        }
        setLoading(true)

        currenciesAPI.getRatesCurrency(Number(CurIdUrl))
            .then((res) => {

                if (res) {
                    res.Date = res.Date.split('T')[0]
                    setStartDate(res.Date)
                    setEndDate(() => {
                        const oldDate = new Date(res.Date)
                        oldDate.setMonth(oldDate.getMonth() - Number(countMonth))
                        return String(oldDate)
                    })
                    setData(res)
                } else {
                    currenciesAPI.getOneCurrencies(Number(CurIdUrl))
                        .then((res) => {
                                if (res.Cur_DateEnd) {
                                    res.Cur_DateEnd = res.Cur_DateEnd.split('T')[0].replace(/-/g, '.')
                                    res.Cur_DateStart = res.Cur_DateStart.split('T')[0].replace(/-/g, '.')
                                    setStartDate(res.Cur_DateEnd)
                                    setEndDate(res.Cur_DateStart)
                                    setData(res)
                                } else {
                                    setData(undefined)
                                    setRatesCurrency(undefined)
                                    setUserErrorSearch(true)
                                    setLoading(false)
                                    console.log('ID валюты указан не верно!')
                                }
                            }
                        ).then(() => {
                        setUserErrorSearch(true)
                        setData(undefined)
                        setRatesCurrency(undefined)
                        setLoading(false)
                    })
                }
            })
    }, [CurIdUrl, countMonth])

    useEffect(() => {
        if (!data) return

        currenciesAPI.getPreviousRateOneCurrencies(data.Cur_ID, subtractWorkday(data.Date))
            .then((res) => {
                    const rateDifference = Number(Number(Number(data.Cur_OfficialRate) - Number(res.Cur_OfficialRate)).toFixed(4))
                    if (rateDifference > 0) {
                        setRateClass('positive')
                    } else {
                        setRateClass('negative')
                    }
                    setRatesCurrency({
                        ...data,
                        yesterday: res,
                        exchangeRateDifference: rateDifference
                    })
                }
            ).then(() => setLoading(false))
    }, [data])

    if (loading && !ratesCurrency) {
        return <Preloader/>
    }

    return (
        <div className={'container'}>
            {ratesCurrency ? (
                <div>
                    <EnterIdCurrency idCur={CurIdUrl}/>
                    <div className={s.fullDataText}>
                        <div>
                            <h2>{ratesCurrency.Cur_Name}</h2>
                            <p>{ratesCurrency.yesterday?.Date} курс
                                составлял: {ratesCurrency.Cur_Scale} {ratesCurrency.Cur_Abbreviation} - {ratesCurrency.yesterday?.Cur_OfficialRate} BYN</p>
                            <p>Внутренний код валюты (id): {ratesCurrency.Cur_ID}</p>
                            <i>Все даты указаны в формате ГГГГ.ММ.ДД</i>
                        </div>
                        <div>
                            <p>Актуальная информация на:
                                <time dateTime={ratesCurrency.Date}> {ratesCurrency.Date.replace(/-/g, '.')}</time>
                            </p>
                            <h2>{ratesCurrency.Cur_Scale} {ratesCurrency.Cur_Abbreviation} - {ratesCurrency.Cur_OfficialRate} BYN</h2>
                            <h2 className={`${s[rateClass]} ${rateClass}`}>{ratesCurrency.exchangeRateDifference && ratesCurrency.exchangeRateDifference > 0 && '+'}{ratesCurrency.exchangeRateDifference} BYN <ArrowSVG/>
                            </h2>
                        </div>
                    </div>
                    <div className={s.schedule}>
                        <CurrencyRateChart scale={ratesCurrency.Cur_Scale}
                                           abbreviation={ratesCurrency.Cur_Abbreviation} id={ratesCurrency.Cur_ID}
                                           startDate={endDate}
                                           endDate={startDate}/>
                        <div>
                            <label>Выберете за сколько последних месяц
                                от {ratesCurrency.Date} отобразить график </label>
                            <select id="number-select" name="number" value={countMonth}
                                    onChange={handleChangeSelectMonth}>
                                {Array.from({length: 11}, (_, i) => (
                                    <option key={i} value={i + 1}>
                                        {i + 1}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
            ) : (
                <>
                    {userErrorSearch ?
                        (<div className={s.textNotification}>Валюта с ID {CurIdUrl} не найдена. Пожалуйста,
                            убедитесь в правильности введенного ID или ознакомьтесь со <span
                                onClick={handleClick}>списком</span> всех доступных валют.
                        </div>)
                        :
                        (<div className={s.textNotification}>Введите ID валюты или ознакомьтесь со <span
                            onClick={handleClick}>списком</span> всех
                            доступных валют.</div>)}
                    <EnterIdCurrency idCur={CurIdUrl}/>
                </>
            )}
        </div>
    )
}