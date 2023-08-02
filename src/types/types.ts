export type CurrencyDataType = {
    Cur_ID: number
    Date: string
    Cur_Abbreviation: string
    Cur_Scale: number
    pastData: CurrencyRateType
    Cur_Name: string
    Cur_OfficialRate: number
    exchangeRateDifference: number
}

export type CurrencyRateType = {
    Cur_ID: number
    Date: string
    Cur_OfficialRate: number
}

export type MenuItemType = {
    id: number
    label: string
    url: string
}

export type DatePeriodType = {
    countMonth: string
    startDate: string
    endDate: string
}