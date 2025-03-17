import {FC } from 'react'
import { StaticImageData } from 'next/image';
import Image from "next/image"
import StarIcon from '@mui/icons-material/Star';

interface SliderItemProps{
    itemActive: number;
    id: number;
    imagen: string | StaticImageData;
    title: string;
    desc: string;
}

const SliderItem: FC<SliderItemProps> = ({itemActive, id, imagen, title, desc}) => {
    return (
        <li className={`flex flex-col items-center justify-center w-full h-auto absolute left-0 mt-8 ${itemActive === id ? "opacity-100" : "opacity-0"} transition ease-linear duration-500`}>
            <span className="relative top-12 z-10 text-black font-bold text-3xl bg-white opacity-50 rounded-lg pl-4 pr-4">{title}</span>
            <div className='w-full'>
                <Image
                src={imagen}
                alt='ECNU Logo'
                fill
                className={`relative object-cover mx-auto w-full h-[550px] rounded-md shadow-xl
                            lg:w-3/5 lg:h-[650px]`}
            />
            </div> 
            <div className={`relative -top-40 rounded-lg ${id === 2 || id === 5? 'w-[400px] lg:w-[500px]' : 'w-[320px]'} mx-auto bg-black opacity-70`}>
                <span className='w-full p-4 flex justify-start items-start'>{desc}</span>
            </div>
        </li>
    )
}

export default SliderItem;