import React from 'react'
import s from './NavBar.module.scss'
import {DropdownMenu} from './DropdownMenu/DropdownMenu'

export function NavBar() {
    const menuItems = [
        {id: 1, label: 'Курсы валют', url: '/currencies'},
        {id: 2, label: 'Поиск по id', url: '/currency'},
    ]

    return (
        <nav>
            <div className={s.container}>
                <h1 className={s.navbar__brand}>CurrencyView</h1>
                <DropdownMenu title="Menu" menuItems={menuItems}/>
            </div>
        </nav>
    )
}