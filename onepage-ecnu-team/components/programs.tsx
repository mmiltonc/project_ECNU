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
        <section className='flex flex-col -mt-64' id='clasesyretos'>
                <div className='flex flex-col pt-10 mb-10 ml-8 text-3xl font-bold lg:hidden'>
                    <span>CLASES</span>
                    <span className='text-black w-20 border-white-2 text-6xl relative -right-36 -top-4'>&</span>
                    <span className='relative left-52 w-20'>RETOS</span>
                </div>
                <div className='lg:block md:hidden sm:hidden 2sm:hidden lg:mt-[500px] lg:w-14 lg:ml-8'>
                    <span className='text-white text-6xl font-bold'>CLASES, PLANIFICAFIONES Y RETOS.</span>
                </div>
                <div className='w-full mt-4 lg:flex lg:justify-center lg:items-center lg:mt-20'>
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
                    <div className='w-full pt-20 flex flex-wrap justify-center gap-20'>
                        {isMobile ? (
                            <CardMobile 
                                main={false}
                                title='Inicial - Intermedio - Avanzado.'
                                subtitle='clases personalizadas 100%'
                                descripcion={DescripcionPlanificaciones}
                                bPrice={7200}
                                aPrice={8500}
                            />
                        ) : (
                            <>
                                <CardDesktop 
                                    main={true}
                                    type='presencial'
                                    title='Inicial - Intermedio - Avanzado. (+16)'
                                    subtitle='clases personalizadas 100%'
                                    descripcion='3 VECES POR SEMANA'
                                    bPrice={12300}
                                    aPrice={10500}
                                    linkWhapp='https://wa.link/4xql0h'
                                />
                                <CardDesktop 
                                    main={false}
                                    type='presencial'
                                    title='Inicial - Intermedio - Avanzado. (+16)'
                                    subtitle='clases personalizadas 100%'
                                    descripcion='2 VECES POR SEMANA'
                                    bPrice={9600}
                                    aPrice={8700}
                                    linkWhapp='https://wa.link/4xql0h'
                                />
                            </>
                            
                        )}
                    </div>
                )}
                {itemSelected === 'planificacion' && (
                    <div className='w-full pt-20 flex flex-wrap justify-center gap-20'>
                        {isMobile ? (
                            <>
                                <CardMobile 
                                    main={false}
                                    descripcion={DescripcionPlanificaciones}
                                    bPrice={17800}
                                    aPrice={16800}
                                />
                            </>
                        ) : (
                            <>
                                <CardDesktop 
                                    main={true}
                                    type='planificacion'
                                    arrayDescripcion={DescripcionPlanificaciones}
                                    bPrice={17800}
                                    aPrice={16800}
                                    linkWhapp='https://wa.link/4xql0h'
                                />
                            </>
                            
                        )}
                    </div>
                )}
                {itemSelected === 'reto' && (
                    <div className='w-full pt-20 flex flex-wrap justify-center gap-20'>
                        {isMobile ? (
                            <>
                                <CardMobile 
                                    main={false}
                                    descripcion={DescripcionRetoGrasa}
                                    bPrice={17800}
                                    aPrice={16800}
                                />
                            </>
                        ) : (
                            <>
                                <CardDesktop 
                                    main={true}
                                    title='Reto Perder Grasa'
                                    type='reto'
                                    arrayDescripcion={DescripcionRetoGrasa}
                                    bPrice={17800}
                                    aPrice={16800}
                                    linkWhapp='https://wa.link/4xql0h'
                                />
                            </>
                            
                        )}
                    </div>
                )}
                <div className='mt-8 pb-12 lg:w-full lg:flex lg:justify-center lg:items-center'>
                    {itemSelected === '' ? (
                        <span>Selecciona una de las opciones de entremamiento</span>
                    ) : (
                        <span className='text-sm'>Te quedaron dudas? Consultanos por WhatsApp</span>
                    )}
                </div>
        </section>
    )
}

export default Programs;