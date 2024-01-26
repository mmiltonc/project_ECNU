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
    const isMobile = (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
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
        <section className={`w-full ${isMobile ? 'h-[800px]' : 'h-[1000px]'} bg-white`} id='cambiosvisibles'>
                <div className='flex w-18 ml-10'>
                    <div>
                        <Image
                            src='/images/arrows_down.png'
                            alt='line'
                            fill
                            className='relative w-18 h-36 top-10'
                        /> 
                    </div>
                    <h1 className={`text-black ${isMobile ? 'text-2xl' : 'text-5xl'} font-bold relative top-24 left-10`}>CAMBIOS VISIBLES</h1>
                </div>
                <div className='w-full'>
                    <ul className='w-full'>
                        <Slider 
                            itemActive={itemActive}
                            id={1}
                            isMobile={isMobile}
                            imagen={FotoLuqui}
                            title="Lucas Pallota"
                            desc="“Lucas es un gran profesional y profe, siempre pendiente de las consultas. Vamos por mas ! “"
                        />
                        <Slider 
                            itemActive={itemActive}
                            id={2}
                            isMobile={isMobile}
                            imagen={FotoLuqui2}
                            title="Milton Collard"
                            desc="“Lucas es un gran profesional y profe, siempre pendiente de las consultas. Vamos por mas ! “"
                        />
                        <Slider 
                            itemActive={itemActive}
                            id={3}
                            isMobile={isMobile}
                            imagen={FotoLuqui}
                            title="Juan Perez"
                            desc="“Lucas es un gran profesional y profe, siempre pendiente de las consultas. Vamos por mas ! “"
                        />
                    </ul>
                    <Arrows onClickPrev={()=> onPrev()} onClickNext={() => onNext()} isMobile={isMobile}/>
                </div>
                <div>
                    <Image
                        src='/images/arrows_down.png'
                        alt='line'
                        fill
                        className='relative w-14 h-36 top-[557px] left-56 rotate-[270deg]'
                    /> 
                </div>
        </section>
    )
}

export default Changes;