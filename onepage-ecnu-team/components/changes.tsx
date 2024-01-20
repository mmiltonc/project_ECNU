"use client"
import { useState } from 'react'
import Container from './shared/container'
import Image from 'next/image'
import Slider from './widgets/slider-item'
import Arrows from './widgets/arrows'
import FotoLuqui from '../public/images/bg_reto_grasa.jpg'
import FotoLuqui2 from '../public/images/background.jpg'
const Changes = () => {
    const [itemActive, setItemActive] = useState<number>(1);
    const countItems = 3;
    
    const onPrev = () => {
        setItemActive(itemActive - 1)
        if(itemActive === 1) {
            setItemActive(countItems)
        }
    }
    const onNext = () => {
        setItemActive(itemActive + 1)
        if(itemActive >= countItems) {
            setItemActive(1)
        }
    }
    return (
        <Container className=' w-full h-[800px] bg-white'>
                <div className='flex w-18'>
                    <div>
                        <Image
                            src='/images/arrows_down.png'
                            alt='line'
                            fill
                            className='relative w-18 h-36 top-10'
                        /> 
                    </div>
                    <h1 className='text-black text-2xl font-bold relative top-24 left-10'>Cambios Visibles</h1>
                </div>
                <div className='w-full'>
                    <ul className='w-full'>
                        <Slider 
                            itemActive={itemActive}
                            id={1}
                            imagen={FotoLuqui}
                            title="Lucas Pallota"
                            desc="“Lucas es un gran profesional y profe, siempre pendiente de las consultas. Vamos por mas ! “"
                        />
                        <Slider 
                            itemActive={itemActive}
                            id={2}
                            imagen={FotoLuqui2}
                            title="Milton Collard"
                            desc="“Lucas es un gran profesional y profe, siempre pendiente de las consultas. Vamos por mas ! “"
                        />
                        <Slider 
                            itemActive={itemActive}
                            id={3}
                            imagen={FotoLuqui}
                            title="Juan Perez"
                            desc="“Lucas es un gran profesional y profe, siempre pendiente de las consultas. Vamos por mas ! “"
                        />
                    </ul>
                    <Arrows onClickPrev={()=> onPrev()} onClickNext={() => onNext()}/>
                </div>
                <div>
                    <Image
                        src='/images/arrows_down.png'
                        alt='line'
                        fill
                        className='relative w-14 h-36 top-[557px] left-56 rotate-[270deg]'
                    /> 
                </div>
        </Container>
    )
}

export default Changes;