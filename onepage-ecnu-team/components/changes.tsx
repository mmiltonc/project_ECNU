"use client"
import { useState } from 'react'
import Container from './shared/container'
import Image from 'next/image'
import Slider from './widgets/slider-item'
import Arrows from './widgets/arrows'
import adZequi from '../public/images/ad_zequi.jpg'
import adLean from '../public/images/ad_lean.jpg'
import adJuan from '../public/images/ad_juano.jpg'
import adGerman from '../public/images/ad_german.jpg'
const Changes = () => {
    const [itemActive, setItemActive] = useState<number>(1);
    const countItems = 4;

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
                    <h1 className={`text-black text-5xl font-bold  mt-16 ml-14 lg:text-7xl`}
                    >CAMBIOS VISIBLES.</h1>
                </div>
                <div className='w-full h-[650px]
                                lg:h-[750px]'>
                    <ul className='w-full'>
                        <Slider 
                            itemActive={itemActive}
                            id={1}
                            imagen={adZequi}
                            title="Ezequiel Blandini"
                            desc="“Lucas es un gran profesional y profe, siempre pendiente de las consultas. Vamos por mas ! “"
                        />
                        <Slider 
                            itemActive={itemActive}
                            id={2}
                            imagen={adLean}
                            title="Leandro Montemurro"
                            desc="“Lucas es un gran profesional y profe, siempre pendiente de las consultas. Vamos por mas ! “"
                        />
                        <Slider 
                            itemActive={itemActive}
                            id={3}
                            imagen={adJuan}
                            title="Juan Olivera"
                            desc="“Lucas es un gran profesional y profe, siempre pendiente de las consultas. Vamos por mas ! “"
                        />
                        <Slider 
                            itemActive={itemActive}
                            id={4}
                            imagen={adGerman}
                            title="Esteban Ferrari"
                            desc="“Lucas es un gran profesional y profe, siempre pendiente de las consultas. Vamos por mas ! “"
                        />
                    </ul>
                    <Arrows onClickPrev={()=> onPrev()} onClickNext={() => onNext()} />
                </div>
                <div className='w-full px-4 flex justify-center items-center gap-3'>
                    <button onClick={() => selectedChange(1)}>
                        <Image
                            src={adZequi}
                            alt='line'
                            fill
                            className='relative w-20 h-20 object-cover rounded border-2 border-gray-700'
                        /> 
                    </button>
                    <button onClick={() => selectedChange(2)}>
                        <Image
                            src={adLean}
                            alt='line'
                            fill
                            className='relative w-20 h-20 object-cover rounded border-2 border-gray-700'
                        /> 
                    </button>
                    <button onClick={() => selectedChange(3)}>
                        <Image
                            src={adJuan}
                            alt='line'
                            fill
                            className='relative w-20 h-20 object-cover rounded border-2 border-gray-700'
                        />                      
                    </button>
                    <button onClick={() => selectedChange(4)}>
                        <Image
                            src={adGerman}
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