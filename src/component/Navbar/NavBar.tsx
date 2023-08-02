import React from 'react'
import s from './NavBar.module.scss'
import {DropdownMenu} from './DropdownMenu/DropdownMenu'

export function NavBar() {
    const menuItems = [
        {id: 1, label: 'Главная', url: '/home'},
        {id: 2, label: 'Все валюты', url: '/currencies'},
        {id: 3, label: 'Поиск по id', url: '/currency'},
    ]

    return (
        <nav>
            <div className={s.container}>
                <h1 className={s.navbarBrand}>CurrencyView</h1>
                <DropdownMenu title="Menu" menuItems={menuItems}/>
            </div>
        </nav>
    )
}