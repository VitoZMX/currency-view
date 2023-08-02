import React from 'react'

type ErrorComponentPropsType = {
    error: string
}

export function ErrorComponent({error}: ErrorComponentPropsType) {
    return (
        <p className="errorText">
            {error}
        </p>
    )
}