"use client"
import { useState } from 'react'
import Image from 'next/image'
import Slider from './widgets/slider-item'
import Arrows from './widgets/arrows'
import adZequi from '../public/images/ad_zequi.jpg'
import adLean from '../public/images/ad_lean.jpg'
import adJuan from '../public/images/ad_juano.jpg'
import adGerman from '../public/images/ad_german.jpeg'
import adEsteban from '@/public/images/ad_esteban.jpg'

const Changes = () => {
    const [itemActive, setItemActive] = useState<number>(1);
    const countItems = 5;

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

    const selectedChange = (id: number, e: React.MouseEvent) => {
        e.preventDefault();
        setItemActive(id)
    }

    return (
        <section className={`w-auto h-auto bg-white block
                            lg:h-[1200px] lg:pt-40`} 
                id='cambiosvisibles'>
                <div className='flex w-18 ml-10'>
                    <h1 className={`text-black text-3xl md:text-5xl font-bold  mt-16 ml-14 lg:text-7xl`}
                    >CAMBIOS VISIBLES.</h1>
                </div>
                <div className='w-full h-[530px]
                                lg:h-[750px]'>
                    <ul className='w-full'>
                        <Slider 
                            itemActive={itemActive}
                            id={1}
                            imagen={adZequi}
                            title="Ezequiel Blandini"
                            desc="“Lucas me llevo por el camino de la autoconfianza, aprendí mucho a confiar en mi potencial y es una gran guía para continuar caminando hacia mis objetivos.“"
                        />
                        <Slider 
                            itemActive={itemActive}
                            id={2}
                            imagen={adLean}
                            title="Leandro Montemurro"
                            desc="“Apasionado por la calistenia, con años de experiencia, combina motivación, disciplina y conocimiento para llevar a sus alumnos a su mejor forma. Su enfoque no solo mejora el rendimiento físico, sino que también fortalece la mentalidad para superar cualquier desafío.“"
                        />
                        <Slider 
                            itemActive={itemActive}
                            id={3}
                            imagen={adJuan}
                            title="Juan Olivera"
                            desc="“Con Lucas encontré una persona que está pendiente de mis necesidades y es una gran ayuda, realmente encontré con el una actividad apasionante y un gran guía.“"
                        />
                        <Slider 
                            itemActive={itemActive}
                            id={4}
                            imagen={adEsteban}
                            title="Esteban Ferrari"
                            desc="“Está al pie para lo que necesites, eso me ayudó mucho a encaminarme con mis objetivos y también de qué manera plantearlos a largo plazo.“"
                        />
                        <Slider 
                            itemActive={itemActive}
                            id={5}
                            imagen={adGerman}
                            title="Germán Svariati"
                            desc="“Llegar a mi estado fue gracias a vos por haberme enseñado a que lo que hay que fortalecer es la mente para poder lograr un objetivo físico. En nuestros encuentros virtuales nos enseñaste a entender eso y otras cosas que me hacen avanzar y empoderarme para alcanzar mi meta.“"
                        />
                    </ul>
                    <Arrows onClickPrev={()=> onPrev()} onClickNext={() => onNext()} />
                </div>
                <div className='w-full px-4 flex justify-center items-center gap-3'>
                    <button onClick={(e) => selectedChange(1,e)}>
                        <Image
                            src={adZequi}
                            alt='line'
                            fill
                            className='relative w-20 h-20 object-cover rounded border-2 border-gray-700'
                        /> 
                    </button>
                    <button onClick={(e) => selectedChange(2, e)}>
                        <Image
                            src={adLean}
                            alt='line'
                            fill
                            className='relative w-20 h-20 object-cover rounded border-2 border-gray-700'
                        /> 
                    </button>
                    <button onClick={(e) => selectedChange(3, e)}>
                        <Image
                            src={adJuan}
                            alt='line'
                            fill
                            className='relative w-20 h-20 object-cover rounded border-2 border-gray-700'
                        />                      
                    </button>
                    <button onClick={(e) => selectedChange(4, e)}>
                        <Image
                            src={adEsteban}
                            alt='line'
                            fill
                            className='relative w-20 h-20 object-cover rounded border-2 border-gray-700'
                        />                      
                    </button>
                    <button onClick={(e) => selectedChange(5, e)}>
                        <Image
                            src={adGerman}
                            alt='line'
                            fill
                            className='relative w-20 h-20 object-cover rounded border-2 border-gray-700'
                        />                      
                    </button>
                </div>
        </section>
    )
}

export default Changes;