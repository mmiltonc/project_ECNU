import React from 'react';
import {FC } from 'react'
import CheckIcon from '@mui/icons-material/Check';
import { StaticImageData } from 'next/image';

interface CardProps {
    main: boolean;
    title?: string;
    subtitle?: string;
    descripcion: string | string[];
    bPrice: number;
    aPrice: number;
    image?: string | StaticImageData;
}

const Card: FC<CardProps> = ({ title, subtitle, descripcion, bPrice, aPrice, image }) => {
    return (
        <div className={`w-80 h-[450px] flex flex-col items-center rounded-3xl ${!image ? 'bg-red-700' : 'border-4 border-red-700'}`}>
            <h2 className='mt-20 text-2xl font-bold'>{title}</h2>
            <p className='text-xs'>{subtitle}</p>
            <div className='mt-8 flex flex-col'>
                {descripcion}
            </div>
            <div className='w-4/5 mt-10 flex justify-between'>
                <div className='flex flex-col justify-center items-center relative left-8'>
                    <p className='text-xs'>ANTES</p>
                    <span className='text-xl line-through text-black'>{`$${bPrice}`}</span>
                </div>
                <div className="absolute left-1/2 -ml-0.5 w-[3px] h-12 bg-black"></div>
                <div className='flex flex-col items-center'>
                    <p className='text-xs'>AHORA</p>
                    <span className='text-3xl font-bold'>{`$${aPrice}`}</span>
                </div>
            </div>
            <button className='w-40 h-10 mt-16 rounded-full bg-black'>INSCRIBIRME</ button>
        </div>
    )
};

export default Card;