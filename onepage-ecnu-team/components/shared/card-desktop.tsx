import React from 'react';
import {FC } from 'react'
import CheckIcon from '@mui/icons-material/Check';
import { StaticImageData } from 'next/image';

interface CardProps {
    main: boolean;
    type: string;
    title?: string;
    subtitle?: string;
    descripcion?: string;
    arrayDescripcion?: string[];
    bPrice: number;
    aPrice: number;
    image?: string | StaticImageData;
    linkWhapp: string;
}

const CardDesktop: FC<CardProps> = ({main, type, title, subtitle, descripcion, arrayDescripcion, bPrice, aPrice, image, linkWhapp }) => {
    
    const onClick = () => {
        console.log('entra en onClick: ', linkWhapp)
        const url = window.open(linkWhapp, '_blank')
        url?.focus()
    }
    
    return (
        <div className={`${type === 'presencial' ? 'w-[380px]' : 'w-[400px]'} h-[500px] flex flex-col items-center rounded-3xl border-2 border-red-700 ${!image && 'bg-white bg-opacity-20'}`}>
            {main && (<span className='relative h-10 px-8 bottom-[15px] -skew-x-12 flex justify-center items-center bg-red-700 font-bold'>RECOMENDADO</span>)}
            <h2 className={`${main ? 'mt-4' : 'mt-20'} text-xl text-center font-bold`}>{title}</h2>
            {subtitle && (<p className='text-xs mt-4'>{subtitle}</p>)}
            {type === 'presencial' && (
                <div className='mt-8 flex flex-col justify-center items-center'>
                    <div>
                        <span className='mr-2'>Dias:</span>
                        <span>Martes, Miércoles y Viernes</span>
                    </div>
                    <div>
                        <span className='mr-2'>Horarios:</span>
                        <span>18:00 a 19:20 / 19:20 a 20:40</span>
                    </div>
                </div>
            )}
            {type !== 'presencial' && (
                <div className='mx-4 flex flex-col justify-star items-star'>

                    {arrayDescripcion?.map((item) => {
                        return(
                            <div className='mb-4'>
                                <CheckIcon className='text-green-500'/>
                                <span className='w-full text-md text-center'>{item}</span>
                            </div>
                        )
                    })}
                </div>
            )}
            {descripcion && (<span className='mt-8 font-bold text-xl'>{descripcion}</span>)}
            <div className='w-4/5 mt-10 flex justify-between'>
                <div className='flex flex-col justify-center items-center relative left-8'>
                    <p className='text-xs'>ANTES</p>
                    <span className='text-xl line-through text-black'>{`$${bPrice}`}</span>
                </div>
                <div className="relative left-8 -ml-0.5 w-[3px] h-12 bg-black"></div>
                <div className='flex flex-col items-center'>
                    <p className='text-xs'>AHORA</p>
                    <span className='text-3xl font-bold'>{`$${aPrice}`}</span>
                </div>
            </div>
            <button className='w-40 h-10 mt-8 rounded-xl bg-black bg-opacity-50' onClick={onClick}>INSCRIBIRME</ button>
        </div>
    )
};

export default CardDesktop;