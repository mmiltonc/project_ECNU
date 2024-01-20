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
        <li className={`flex flex-col items-center w-full absolute left-0 mt-8 ${itemActive === id ? "opacity-100" : "opacity-0"}`}>
            <span className="relative top-12 z-10 text-black font-bold text-3xl bg-white opacity-50 rounded-lg pl-4 pr-4">{title}</span>
            <div className='w-full'>
                <Image
                src={imagen}
                alt='ECNU Logo'
                fill
                className='relative object-cover w-full h-[500px]'
            />
            </div> 
            <div className="relative -top-32 rounded-lg w-[320px] h-28 ml-auto mr-auto bg-black opacity-70">
                <span className='relative top-4 left-4'>{desc}</span>
                <div className='relative left-52 top-2 flex text-red-700'>
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