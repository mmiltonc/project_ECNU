"use client"
import { useEffect, useState, useRef } from 'react'
import CardMobile from './shared/card-mobile'
import CardDesktop from './shared/card-desktop'
import Image from 'next/image'
import DescripcionPlanificaciones from '../public/data/planificaciones.json'
import DescripcionRetoGrasa from '../public/data/reto-grasa.json'
import AnimatedText from './shared/animatedText'
import { Tulpen_One, Nothing_You_Could_Do, Bebas_Neue, Domine } from 'next/font/google'

const tulpenOne = Tulpen_One({
    subsets: ['latin'],
    weight: '400',
    display: 'swap',
})
const nothingYouCouldDo = Nothing_You_Could_Do({
    subsets: ['latin'],
    weight: '400',
    display: 'swap',
})
const bebasNeue = Bebas_Neue({
    subsets: ['latin'],
    weight: '400',
    display: 'swap',
})
interface Coachs {
    [key: string]: string[];
}

const Programs = () => {
    const sectionRef = useRef(null);
    const [itemSelected, setItemSelected] = useState('')
    const [selectedPlace, setSelectedPlace] = useState<string>('')
    const [selectedCoach, setSelectedCoach] = useState<string>('') 
    const [hasAnimated, setHasAnimated] = useState(false);
    const isMobile = (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));

    const handleSelected = (item: string) => {
        setItemSelected(item)
    }

    useEffect(() => {

    },[itemSelected])

    const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            const spans = entry.target.querySelectorAll("span");
  
            if (entry.isIntersecting && !hasAnimated) {
              // Cuando el elemento está en vista y no se ha animado aún
              spans.forEach((span, index) => {
                span.style.animationDelay = `${index * 1}s`;
                span.classList.add("animate-fade-in-left");
                span.classList.remove("opacity-0");
              });
              setHasAnimated(true); // Marcar como animado
            } else if (!entry.isIntersecting && hasAnimated) {
              // Cuando el elemento sale de vista y ya se ha animado
              spans.forEach((span) => {
                span.classList.remove("animate-fade-in-left");
                span.classList.add("opacity-0");
              });
              setHasAnimated(false); // Resetear el estado para permitir una nueva animación
            }
          });
        },
        { threshold: 0.5 } // Activar cuando el 50% del elemento está en vista
      );

    return (
        <section ref={sectionRef} className='w-auto flex flex-col lg:mt-0' id='clasesyretos'>
                <div className='flex flex-col pt-10 mb-10 ml-4 text-4xl font-bold lg:hidden'>
                    <AnimatedText text={["PLANIFICACIONES ONLINE", "Y RETOS"]} className='text-white text-4xl font-bold'/>
                </div>
                <div className='lg:block md:hidden sm:hidden 2sm:hidden lg:mt-[100px] lg:ml-8'>
                    {/* <span className='text-white text-8xl font-bold'>CLASES, PLANIFICACIONES Y RETOS.</span> */}
                    <AnimatedText text={["PLANIFICACIONES ONLINE", "Y RETOS"]} className='text-white text-7xl font-bold'/>
                </div>
                <div className='w-full h-auto mt-4 
                                lg:flex lg:flex-col lg:justify-center lg:items-center lg:mt-20'>
                    <>
                        <div className='flex justify-center items-center mt-14'>
                            <p className='w-[60%] text-center text-5xl'>PERSONALIZA TUS ENTRENAMIENTOS CON MIS
                            PLANIFICACIONES ONLINE</p>
                        </div>
                        <div className='w-full flex flex-wrap justify-center gap-20 lg:mt-20'>
                            {isMobile ? (
                                <>
                                    <CardMobile 
                                        main={false}
                                        type='planificacion'
                                        title='Planificacion de rutinas'
                                        arrayDescripcion={DescripcionPlanificaciones}
                                        price={16800}
                                        dPrice={45}
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
                                    />
                                    <CardDesktop 
                                        main={false}
                                        type='planificacion'
                                        title='Planificacion de rutinas'
                                        arrayDescripcion={DescripcionPlanificaciones}
                                        price={18800}
                                        dPrice={45}
                                    />
                                </>
                                
                            )}
                        </div>
                        <div className='flex justify-center items-center mt-14 mb-14'>
                            <p className='w-[55%] text-center text-2xl'>Mis planificaciones online están diseñadas
                                específicamente en base a tus preferencias y
                                objetivos seleccionados. Esta pensado para todos los
                                niveles. Con esta modalidad podrás entrenar desde
                                tu casa y sin materiales. También se pueden utilizar
                                barras en cualquier parque cercano a tu domicilio.
                                Obtendrás dos planificaciones online por mes y se
                                irán modificando de manera mensual para que sean
                                desafiantes y logremos optimizar los mejores
                                resultados posibles.</p>
                        </div>
                        <div className='flex justify-center items-center mt-14'>
                            <p className='w-[60%] text-center text-5xl'>EMPIEZA TU TRANSFORMACION CON MIS
                            DESAFIOS ONLINE</p>
                        </div>
                        <div className='w-full flex flex-wrap justify-center gap-20 lg:mt-20'>
                        {isMobile ? (
                            <>
                                <CardMobile 
                                    main={true}
                                    type='reto'
                                    title='Reto Perder Grasa'
                                    arrayDescripcion={DescripcionRetoGrasa}
                                    price={16800}
                                    dPrice={45}
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
                                />
                            </>
                            
                        )}
                    </div>
                    </>
                </div>
        </section>
    )
}

export default Programs;