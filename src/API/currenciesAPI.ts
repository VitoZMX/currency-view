import axios from 'axios'
import {CurrencyRateChartType, RateType} from '../types/types'
import {subtractWorkday} from '../utils/utils'

const url = 'https://api.nbrb.by/exrates/'
export const instance = axios.create({
    baseURL: url,
})

export const currenciesAPI = {
    async getAllCurrencies() {
        return fetch(`${url}currencies`)
            .then(response => response.json())
    },
    async getOneCurrencies(id: number) {
        return fetch(`${url}currencies/${id}`)
            .then(response => response.json())
    },
    async getPreviousRateOneCurrencies(ID: number, data: string) {
        const previousDate = subtractWorkday(new Date(data))
        return instance.get<CurrencyRateChartType[]>(`rates/Dynamics/${ID}?startDate=${previousDate}&endDate=${previousDate}`).then(response => {
            const data = response.data[0]
            data.Date = data.Date.split('T')[0].replace(/-/g, '.')
            return data
        })
    },
    async getAllCurrenciesRateDaily() {
        return instance.get<RateType[]>('rates?periodicity=0').then(res => res.data)
    },
    async getAllCurrenciesRateMonth() {
        return instance.get<RateType[]>('rates?periodicity=1').then(res => res.data)
    },
    async getRatesCurrency(Cur_ID: number) {
        try {
            return await instance.get<RateType>(`rates/${Cur_ID}`).then(res => res.data)
        } catch (error) {
            return null
        }
    },
    async getRateCurrencyDynamics(ID: number, from: string, to: string) {
        return instance.get<CurrencyRateChartType[]>(`rates/Dynamics/${ID}?startDate=${from}&endDate=${to}`).then(response => {
            const data = response.data
            data.forEach((item) => {
                item.Date = item.Date.split('T')[0].replace(/-/g, '.')
            })
            return data
        })
    }
}