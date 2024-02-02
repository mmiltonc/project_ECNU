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

    const selectedChange = (id: number) => {
        setItemActive(id)
    }

    return (
        <section className={`w-auto h-auto bg-white block
                            lg:h-[1200px] lg:pt-40`} 
                id='cambiosvisibles'>
                <div className='flex w-18 ml-10'>
                    <div>
                        <Image
                            src='/images/arrows_down.png'
                            alt='line'
                            fill
                            className='relative w-18 h-36 top-10'
                        /> 
                    </div>
                    <h1 className={`text-black text-5xl font-bold relative top-16 left-10
                                    lg:text-7xl`}
                    >CAMBIOS VISIBLES.</h1>
                </div>
                <div className='w-full h-[650px]
                                lg:h-[750px]'>
                    <ul className='w-full'>
                        <Slider 
                            itemActive={itemActive}
                            id={1}
                            imagen={FotoLuqui}
                            title="Lucas Pallotta"
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
                    <Arrows onClickPrev={()=> onPrev()} onClickNext={() => onNext()} />
                </div>
                <div className='w-full px-4 flex justify-center items-center gap-3'>
                    <button onClick={() => selectedChange(1)}>
                        <Image
                            src={FotoLuqui}
                            alt='line'
                            fill
                            className='relative w-20 h-20 object-cover rounded border-2 border-gray-700'
                        /> 
                    </button>
                    <button onClick={() => selectedChange(2)}>
                        <Image
                            src={FotoLuqui2}
                            alt='line'
                            fill
                            className='relative w-20 h-20 object-cover rounded border-2 border-gray-700'
                        /> 
                    </button>
                    <button onClick={() => selectedChange(3)}>
                        <Image
                            src={FotoLuqui}
                            alt='line'
                            fill
                            className='relative w-20 h-20 object-cover rounded border-2 border-gray-700'
                        />                      
                    </button>
                </div>
                <div>
                    <Image
                        src='/images/arrows_down.png'
                        alt='line'
                        fill
                        className='relative w-14 h-36 top-[70px] left-56 rotate-[270deg]
                                   lg:-top-2'
                    /> 
                </div>
        </section>
    )
}

export default Changes;