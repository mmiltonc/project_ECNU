"use client"
import Container from './shared/container'

const Changes = () => {

    return (
        <>
            <Container className='w-full h-[750px] '>
                    <div className='flex w-4'>
                        <h1 className='text-white text-4xl font-bold mt-20 mb-10'>Guia Nutricional Basica</h1>
                    </div>
                    <div className='w-[280px]'>
                        <p className='mb-8'>Alguna vez haz oído que “los abdominales se hacen en la cocina” Esta expresión es mucho más real de lo que uno se imagina.</p>
                        <p className='mb-8'>Si queres entrenar bien, ganar músculo y mejorar tu rendimiento es importante que te alimentes bien. Quiero que mis alumnos logren dar sus primeros pasos con esta guía, te ayudare a que comprendas cual es la función de cada alimento. </p>
                        <p>Aunque también debes entender que esta guía es genérica y no personalizada, te recomiendo el seguimiento de un profesional para algo más detallado.</p>
                    </div>
            </Container>
            <div className='relative w-full h-14 top-4 bg-red-700 rounded-tl-2xl rounded-br-2xl'></div>
        </>
    )
}

export default Changes;