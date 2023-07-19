import React from 'react'
import s from '../NavBar.module.scss'
import {useNavigate} from 'react-router-dom'

type DropdownMenuPropsType = {
    title: string;
    menuItems: MenuItem[];
};

type MenuItem = {
    id: number;
    label: string;
    url: string;
};

export function DropdownMenu(props: DropdownMenuPropsType) {
    const navigate = useNavigate()

    const handleMenuItemClick = (url: string) => {
        navigate(`${url}`)
    }

    return (
        <div className={s.dropdown}>
            <button className={s.drop_btn}>Меню</button>
            <div className={s.dropdown_content}>
                {props.menuItems.map((item) => (
                    <a href={item.url} key={item.url} onClick={(e) => {
                        e.preventDefault()
                        handleMenuItemClick(item.url)
                    }}>{item.label}</a>
                ))}
            </div>
        </div>
    )
}