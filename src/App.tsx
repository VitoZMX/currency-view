import React, {useEffect} from 'react'
import './App.scss'
import {NavBar} from './component/Navbar/NavBar'
import {HashRouter, Navigate, Route, Routes} from 'react-router-dom'
import {CurrenciesPage} from './component/CurrenciesPage/CurrenciesPage'
import {CurrencyFullDataPage} from './component/CurrencyFullDataPage/CurrencyFullDataPage'
import {Preloader} from './component/common/Preloader'
import {Dispatch} from 'redux'
import {useDispatch, useSelector} from 'react-redux'
import {initializeApp} from './store/app-reducer'
import {AppStateType} from './store/store'
import {EnterIdCurrency} from './component/CurrencyFullDataPage/EnterIdCurrency/EnterIdСurrency'
import {HomePage} from './component/HomePage/HomePage'

export function App() {
    const dispatch: Dispatch<any> = useDispatch()
    const initialized = useSelector((state: AppStateType) => state.app.initialized)

    useEffect(() => {
        dispatch(initializeApp())
    }, [dispatch])

    if (initialized) return <Preloader/>

    return (
        <HashRouter>
            <NavBar/>
            <div className={'container'}>
                <Routes>
                    <Route path="/home" element={<HomePage/>}/>
                    <Route path="/currencies" element={<CurrenciesPage/>}/>
                    <Route path="/currency/:id" element={<CurrencyFullDataPage/>}/>
                    <Route path="/currency" element={<EnterIdCurrency/>}/>
                    <Route path="/*" element={<Navigate to={'/currencies'}/>}/>
                </Routes>
            </div>
        </HashRouter>
    )
}