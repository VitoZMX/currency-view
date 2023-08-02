import * as actionType from './actionTypes'
import {CurrencyDataType} from '../types/types'
import {BaseThunkType, InferActionsTypes} from './store'
import {currenciesAPI} from '../API/currenciesAPI'
import {subtractWorkday} from '../utils/utils'

const initialState = {
    currencies: [] as Array<CurrencyDataType>,
    errorLoading: '' as string
}

const currenciesReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case actionType.SET_ALL_CUR:
            return {
                ...state,
                currencies: action.currencies,
            }
        case actionType.SET_ERROR:
            return {
                ...state,
                errorLoading: action.error
            }
        default:
            return state
    }
}

export const actions = {
    setAllCurrencies: (currencies: CurrencyDataType[]) => ({
        type: actionType.SET_ALL_CUR,
        currencies: currencies
    } as const),
    setError: (error: string) => ({type: actionType.SET_ERROR, error: error} as const),
}

export const getAllCurrencies = (): ThunkType => async (dispatch) => {
    try {
        const currencies = await currenciesAPI.getAllCurrenciesRateDaily()
        const currenciesWithYesterdayRates = await Promise.all(
            currencies.map(async (item) => {
                const yesterday = await currenciesAPI.getPreviousRateOneCurrencies(item.Cur_ID, subtractWorkday(item.Date))
                const exchangeRateDifference = Number((item.Cur_OfficialRate - yesterday.Cur_OfficialRate).toFixed(4))

                return {...item, yesterday, exchangeRateDifference}
            })
        )
        dispatch(actions.setAllCurrencies(currenciesWithYesterdayRates))
    } catch (error) {
        dispatch(actions.setError('Ошибка получения списка валют, пожалуйста проверьте своё интернет соединение или повторите попытку позже.'))
    }
}

export type InitialStateType = typeof initialState
type ActionsType = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsType>

export default currenciesReducer