import React from 'react'
import {useNavigate} from 'react-router-dom'
import {MenuItemType} from '../../../../types/types'

type MenuItemPropsType = {
    item: MenuItemType;
}

export function MenuItem(props: MenuItemPropsType) {
    const navigate = useNavigate()

    const handleMenuItemClick = (url: string) => {
        navigate(`${url}`)
    }

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault()
        handleMenuItemClick(props.item.url)
    }

    return (
        <a href={props.item.url} key={props.item.url} onClick={handleClick}>
            {props.item.label}
        </a>
    )
}