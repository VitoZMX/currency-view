import * as actionType from './actionTypes'
import {CurrencyDataType, CurrencyRateType, DatePeriodType} from '../types/types'
import {BaseThunkType, InferActionsTypes} from './store'
import {currenciesAPI} from '../API/currenciesAPI'
import {subtractWorkday} from '../utils/utils'

const initialState = {
    loadingCurData: true as boolean,
    error: '' as string,
    currencyData: {} as CurrencyDataType,
    CurrencyRate: [] as CurrencyRateType[],
    datePeriod: {
        countMonth: '1',
        startDate: '',
        endDate: ''
    } as DatePeriodType
}

const currencyReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case actionType.SET_CUR_DATA:
            return {
                ...state,
                currencyData: action.curData,
                error: '',
                loadingCurData: false
            }
        case actionType.SET_CURRENCY_RATE:
            return {
                ...state,
                CurrencyRate: action.CurRate
            }
        case actionType.SET_COUNT_MONTH:
            return {
                ...state,
                datePeriod: {
                    ...state.datePeriod,
                    countMonth: action.countMonth
                }
            }
        case actionType.SET_DATE_PERIOD:
            return {
                ...state,
                datePeriod: {
                    ...state.datePeriod,
                    startDate: action.payload.startDate.split('T')[0],
                    endDate: action.payload.endDate.split('T')[0],
                    countMonth: action.payload.countMonth
                }
            }
        case actionType.SET_ERROR:
            return {
                ...state,
                loadingCurData: false,
                error: action.error
            }
        default:
            return state
    }
}

export const actions = {
    setCurrencyData: (curData: CurrencyDataType) => ({type: actionType.SET_CUR_DATA, curData: curData} as const),
    setStarEndDate: (curRate: DatePeriodType) => ({type: actionType.SET_DATE_PERIOD, payload: curRate} as const),
    setCurrencyRate: (curRate: CurrencyRateType[]) => ({type: actionType.SET_CURRENCY_RATE, CurRate: curRate} as const),
    setError: (error: string) => ({type: actionType.SET_ERROR, error: error} as const),
    setCountMonth: (count: string) => ({type: actionType.SET_COUNT_MONTH, countMonth: count} as const),
}

export const getCurrencyData = (id: string): ThunkType => async (dispatch) => {
    try {
        const currencyData = await currenciesAPI.getRatesCurrency(Number(id))
        const pastData = await currenciesAPI.getPreviousRateOneCurrencies(currencyData.Cur_ID, subtractWorkday(currencyData.Date))
        const exchangeRateDifference = Number((currencyData.Cur_OfficialRate - pastData.Cur_OfficialRate).toFixed(4))
        const currenciesWithYesterdayRates = {...currencyData, pastData, exchangeRateDifference}

        dispatch(updateStartEndDates(currenciesWithYesterdayRates.Date, initialState.datePeriod.countMonth))
        dispatch(actions.setCurrencyData(currenciesWithYesterdayRates))
    } catch (error) {
        dispatch(actions.setError('Ошибка получения данных валюты, пожалуйста проверьте правильность введенного id.'))
    }
}

export const updateStartEndDates = (endDate: string, count: string): ThunkType => async (dispatch) => {
    const StartDate = new Date(endDate)
    StartDate.setMonth(StartDate.getMonth() - Number(count))

    dispatch(actions.setStarEndDate({startDate: String(StartDate.toISOString()), endDate: endDate, countMonth: count}))
}

export const updateCountMonth = (count: string): ThunkType => async (dispatch) => {
    dispatch(actions.setCountMonth(count))
}

export const getRateCurrencyDynamics = (id: number, startDate: string, endDate: string): ThunkType => async (dispatch) => {
    try {
        const currencyRate = await currenciesAPI.getRateCurrencyDynamics(id, new Date(startDate).toISOString(), new Date(endDate).toISOString())

        dispatch(actions.setCurrencyRate(currencyRate))
    } catch (error) {
        // handle error
    }
}

export type InitialStateType = typeof initialState
type ActionsType = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsType>

export default currencyReducer