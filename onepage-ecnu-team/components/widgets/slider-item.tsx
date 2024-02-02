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
        <li className={`flex flex-col items-center justify-center w-full absolute left-0 mt-8 ${itemActive === id ? "opacity-100" : "opacity-0"} transition ease-linear duration-500`}>
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
            <div className={`relative -top-36 rounded-lg w-[320px] h-32 mx-auto bg-black opacity-70
                            lg:w-[400px]`}>
                <span className='w-full h-auto px-4 pt-4 flex justify-start items-start'>{desc}</span>
                <div className='w-full pr-4 flex justify-end items-end text-red-700 lg:mt-8'>
                    <StarIcon/>
                    <StarIcon/>
                    <StarIcon/>
                    <StarIcon/>
                </div>
            </div>
        </li>
    )
}

export default SliderItem;