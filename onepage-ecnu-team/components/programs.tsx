"use client"
import CardMobile from './shared/card-mobile'
import CardDesktop from './shared/card-desktop'
import Image from 'next/image'
import DescripcionPlanificaciones from '../public/data/planificaciones.json'
import DescripcionRetoGrasa from '../public/data/reto-grasa.json'
import { useEffect, useState } from 'react'

const Programs = () => {

    const [itemSelected, setItemSelected] = useState('')
    const isMobile = (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));

    const handleSelected = (item: string) => {
        setItemSelected(item)
    }

    useEffect(() => {

    },[itemSelected])

    return (
        <section className='w-auto flex flex-col
                            lg:mt-0' id='clasesyretos'>
                <div className='flex flex-col pt-10 mb-10 ml-4 text-4xl font-bold lg:hidden'>
                    <span>CLASES</span>
                    <span className='text-white w-20 border-white-2 text-4xl relative'>PLANIFICACIONES</span>
                    <span className='relative w-26'>Y RETOS</span>
                </div>
                <div className='lg:block md:hidden sm:hidden 2sm:hidden lg:mt-[100px] lg:w-14 lg:ml-8'>
                    <span className='text-white text-8xl font-bold'>CLASES, PLANIFICACIONES Y RETOS.</span>
                </div>
                <div className='w-full h-auto mt-4 
                                lg:flex lg:justify-center lg:items-center lg:mt-20 lg:pb-20'>
                    <button className='w-full h-[190px] lg:h-[500px]' onClick={() => handleSelected('presencial')}>
                        <Image
                            src='/images/clases-presenciales.jpg'
                            alt='line'
                            fill
                            className={`relative w-full object-cover transition duration-300 ease-in-out hover:opacity-100 ${itemSelected === 'presencial' ? 'opacity-100' : 'opacity-40'}`}
                        />
                        <span className='relative bottom-28 text-center font-bold text-2xl lg:bottom-64'>Clases Presenciales</span>
                    </button>
                    <button className='relative bottom-8 w-full h-[200px] lg:h-[500px] lg:bottom-0' onClick={() =>handleSelected('planificacion')}>
                        <Image
                            src='/images/clases-online.jpg'
                            alt='line'
                            fill
                            className={`relative w-full object-cover transition duration-300 ease-in-out hover:opacity-100 ${itemSelected === 'planificacion' ? 'opacity-100' : 'opacity-40'}`}
                        />
                        <span className='relative bottom-28 text-center font-bold text-2xl lg:bottom-64'>Planificaciones Online</span>
                    </button>
                    <button className='relative bottom-16 w-full h-[200px] lg:h-[500px] lg:bottom-0' onClick={() => handleSelected('reto')}>
                        <Image
                            src='/images/retos.jpg'
                            alt='line'
                            fill
                            className={`relative w-full object-cover transition duration-300 ease-in-out hover:opacity-100 ${itemSelected === 'reto' ? 'opacity-100' : 'opacity-40'}`}
                        />
                        <span className='relative bottom-28 text-center font-bold text-2xl lg:bottom-64'>Retos</span>
                    </button>
                </div>
                {itemSelected === 'presencial' && (
                    <div className='w-full flex flex-wrap justify-center gap-20'>
                        {isMobile ? (
                            <>
                                <CardMobile 
                                    main={true}
                                    type='presencial'
                                    title='Inicial - Intermedio - Avanzado (+16)'
                                    subtitle='clases personalizadas 100%'
                                    descripcion='3 VECES POR SEMANA'
                                    price={8500}
                                    linkWhapp='https://wa.link/4xql0h'
                                />
                                <CardMobile 
                                    main={false}
                                    type='presencial'
                                    title='Inicial - Intermedio - Avanzado (+16)'
                                    subtitle='clases personalizadas 100%'
                                    descripcion='2 VECES POR SEMANA'
                                    price={8500}
                                    linkWhapp='https://wa.link/4xql0h'
                                />
                            </>
                        ) : (
                            <>
                                <CardDesktop 
                                    main={true}
                                    type='presencial'
                                    title='Inicial - Intermedio - Avanzado (+16)'
                                    subtitle='clases personalizadas 100%'
                                    descripcion='3 VECES POR SEMANA'
                                    price={10500}
                                    linkWhapp='https://wa.link/4xql0h'
                                />
                                <CardDesktop 
                                    main={false}
                                    type='presencial'
                                    title='Inicial - Intermedio - Avanzado (+16)'
                                    subtitle='clases personalizadas 100%'
                                    descripcion='2 VECES POR SEMANA'
                                    price={8700}
                                    linkWhapp='https://wa.link/4xql0h'
                                />
                            </>
                            
                        )}
                    </div>
                )}
                {itemSelected === 'planificacion' && (
                    <div className='w-full pt-2 flex flex-wrap justify-center gap-20
                                    lg:pt-20'>
                        {isMobile ? (
                            <>
                                <CardMobile 
                                    main={false}
                                    type='planificacion'
                                    title='Planificacion de rutinas'
                                    arrayDescripcion={DescripcionPlanificaciones}
                                    price={16800}
                                    dPrice={45}
                                    linkWhapp='https://wa.link/4xql0h'
                                />
                            </>
                        ) : (
                            <>
                                <CardDesktop 
                                    main={true}
                                    type='planificacion'
                                    title='Planificacion de rutinas'
                                    arrayDescripcion={DescripcionPlanificaciones}
                                    price={16800}
                                    dPrice={45}
                                    linkWhapp='https://wa.link/4xql0h'
                                />
                            </>
                            
                        )}
                    </div>
                )}
                {itemSelected === 'reto' && (
                    <div className='w-full pt-2 flex flex-wrap justify-center gap-20'>
                        {isMobile ? (
                            <>
                                <CardMobile 
                                    main={true}
                                    type='reto'
                                    title='Reto Perder Grasa'
                                    arrayDescripcion={DescripcionRetoGrasa}
                                    price={16800}
                                    dPrice={45}
                                    linkWhapp='https://wa.link/4xql0h'
                                />
                            </>
                        ) : (
                            <>
                                <CardDesktop 
                                    main={true}
                                    title='Reto Perder Grasa'
                                    type='reto'
                                    arrayDescripcion={DescripcionRetoGrasa}
                                    price={16800}
                                    dPrice={45}
                                    linkWhapp='https://wa.link/4xql0h'
                                />
                            </>
                            
                        )}
                    </div>
                )}
                <div className='w-full mt-2 mb-12 text-center
                                lg:w-full lg:flex lg:justify-center lg:items-center'>
                    {itemSelected === '' ? (
                        <div className='lg:hidden'>
                            <div className="arrow text-red-700">
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                        </div>
                    ) : (
                        <div className='mt-10'>
                            <span className='text-sm'>Te quedaron dudas? Consultanos por WhatsApp</span>
                        </div>
                    )}
                </div>
        </section>
    )
}

export default Programs;