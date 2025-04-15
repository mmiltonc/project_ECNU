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

const Card: FC<CardProps> = (
    {main, 
     type, 
     title, 
     subtitle, 
     descripcion, 
     arrayDescripcion,
     price,
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
        <div className={`w-80 ${type === 'presencial' ? 'h-[500px]' : 'h-[640px]'} flex flex-col items-center rounded-3xl border-2 border-red-700 bg-zinc-700`}>
            {main && (<span className='relative h-10 px-8 bottom-[15px] -skew-x-12 flex justify-center items-center bg-red-700 font-bold'>RECOMENDADO</span>)}
            <h2 className='w-full mt-10 text-2xl text-center font-bold'>{title}</h2>
            <p className='text-xs'>{subtitle}</p>
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
                <div className='mx-4 mt-10 flex flex-col justify-star items-star'>

                    {arrayDescripcion?.map((item) => {
                        return(
                            <div className='mb-4 flex'>
                                <CheckIcon className='text-green-500'/>
                                <span className='w-full text-md text-start'>{item}</span>
                            </div>
                        )
                    })}
                </div>
            )}
            <div className='mt-8 flex flex-col font-bold'>
                {descripcion}
            </div>
            <div className={`w-4/5 ${type === 'presencial' ? 'mt-10' : 'mt-0'} flex justify-center items-center`}>
                <div className='flex flex-col items-center'>
                    <span className='text-3xl font-bold'>{`$${price}`}</span>
                </div>
            </div>
            <button 
                className='w-40 h-10 mt-8 rounded-xl bg-black bg-opacity-50' 
                onClick={onClick}
            >
            INSCRIBIRME</ button>
            <span>cupos disponibles: 3</span>
        </div>
    )
};

export default Card;