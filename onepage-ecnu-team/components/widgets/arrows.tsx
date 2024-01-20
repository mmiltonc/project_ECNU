import {FC } from 'react'
import { StaticImageData } from 'next/image';
import Image from "next/image"
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
interface ArrowsProps{
    onClickPrev: () => void;
    onClickNext: () => void;
}

const Arrows: FC<ArrowsProps> = ({onClickPrev, onClickNext}) => {
    return (
        <div className='relative top-72 w-80 z-10 flex justify-between items-center text-red-700'>
            <button onClick={onClickPrev}><ArrowBackIosIcon/></button>
            <button onClick={onClickNext}><ArrowForwardIosIcon/></button>
        </div>
    )
}

export default Arrows;