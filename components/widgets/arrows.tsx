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
        <div className={`hidden relative top-72 w-full px-8 z-10 justify-between items-center text-red-700
                         lg:px-0 lg:w-[1000px] lg:top-[350px] lg:mx-auto lg:flex`}>
            <button onClick={onClickPrev}><ArrowBackIosIcon/></button>
            <button onClick={onClickNext}><ArrowForwardIosIcon/></button>
        </div>
    )
}

export default Arrows;