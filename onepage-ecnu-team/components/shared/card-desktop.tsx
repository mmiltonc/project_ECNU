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
    price: number;
    dPrice?: number;
    image?: string | StaticImageData;
    cantDias?: number;
}

const CardDesktop: FC<CardProps> = (
    {main, 
     type, 
     title, 
     subtitle, 
     descripcion, 
     arrayDescripcion, 
     price, 
     image, 
     cantDias,
    }) => {

    const generateLink = (numero:string, cantDias?:number): string => {
        const linkWhatsApp: string = `https://wa.me/${numero}?text=Hola Lucas! Me gustaría consultar sobre las clases en parque Saavedra para ${cantDias} veces por semana. Saludos`
        return linkWhatsApp
    }
    
    const onClick = () => {
        const link: string = generateLink('1167837231', cantDias)
        const url = window.open(link, '_blank')
        url?.focus()
    }

    return (
        <div className={`${type === 'presencial' ? 'w-[380px]' : 'w-[400px]'} h-[500px] flex flex-col items-center rounded-3xl border-2 border-red-700 ${!image && 'bg-white bg-opacity-20'}`}>
            {main && (<span className='relative h-10 px-8 bottom-[15px] -skew-x-12 flex justify-center items-center bg-red-700 font-bold'>RECOMENDADO</span>)}
            <h2 className={`${main ? 'mt-4' : 'mt-16'} text-xl text-center font-bold`}>{title}</h2>
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
            <div className='w-4/5 mt-10 flex justify-center items-center'>
                <div className='flex flex-col items-center'>
                    <span className='text-3xl font-bold'>{`$${price}`}</span>
                </div>
            </div>
            <button className='w-40 h-10 mt-8 rounded-xl bg-black bg-opacity-50' onClick={onClick}>INSCRIBIRME</ button>
            <span>cupos disponibles: 3</span>
        </div>
    )
};

export default CardDesktop;