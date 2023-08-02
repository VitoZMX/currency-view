import React from 'react'
import s from '../NavBar.module.scss'
import {MenuItem} from './MenuItem/MenuItem'
import {MenuItemType} from '../../../types/types'

type DropdownMenuPropsType = {
    title: string
    menuItems: MenuItemType[]
}

export function DropdownMenu(props: DropdownMenuPropsType) {

    return (
        <div className={s.dropdown}>
            <button className={s.dropBtn}>{props.title}</button>
            <div className={s.dropdownContent}>
                {props.menuItems.map((item) => (
                    <MenuItem item={item} key={item.id}/>
                ))}
            </div>
        </div>
    )
}