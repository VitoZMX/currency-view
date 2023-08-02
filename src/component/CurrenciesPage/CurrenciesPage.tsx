import React from 'react'
import s from './CurrenciesPage.module.scss'
import {TableBody} from './TableBody/TableBody'
import {TableHead} from './TableHead/TableHead'
import {useSelector} from 'react-redux'
import {AppStateType} from '../../store/store'
import {ErrorComponent} from '../ErrorComponent/ErrorComponent'

export function CurrenciesPage() {
    const curData = useSelector((state: AppStateType) => state.currencies.currencies)
    const error = useSelector((state: AppStateType) => state.currencies.errorLoading)

    if (curData.length === 0 && error) return <ErrorComponent error={error}/>

    return (
        <table className={s.table}>
            <TableHead/>
            <TableBody curData={curData}/>
        </table>
    )
}