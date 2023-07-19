import React from 'react'
import preloader from '../../assets/image/preloader.svg'
import s from './Preloader.module.scss'

type PreloaderPropsType = {
    mini?: boolean
}

export const Preloader: React.FC<PreloaderPropsType> = ({mini = false}) => {
    return (
        <div className={s.preloader_container} style={!mini ? {height: window.innerHeight - 50} : undefined}>
            <img alt={'preloader'}
                 style={!mini ? {width: 200} : {width: 120}}
                 src={preloader}/>
        </div>
    )
}