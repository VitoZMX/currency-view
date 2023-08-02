import React from 'react'

export function TableHead() {

    return (
        <thead>
        <tr>
            <th>Наименование иностранной валюты</th>
            <th>Количество единиц иностранной валюты, буквенный код валюты</th>
            <th>Официальный курс</th>
            <th>Дата курса (ГГГГ.ММ.ДД)</th>
        </tr>
        </thead>
    )
}