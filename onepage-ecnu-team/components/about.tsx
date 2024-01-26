"use client"
import Container from './shared/container'
import Image from 'next/image'

const About = () => {

    return (
        <>
            <Container className='w-full h-[350px] bg-white' id='quiensoy'>
                <div className='flex w-18'>
                    <h1 className='mt-20 text-black text-2xl font-bold'>¿Quien soy?</h1>
                    <div>
                        <Image
                            src='/images/arrows_down.png'
                            alt='line'
                            fill
                            className='relative w-18 h-36 top-6 left-20 rotate-90'
                        /> 
                    </div>
                </div>
                <div className='flex justify-center items-center w-[280px] ml-auto mr-auto'>
                    <p className='mt-8 text-center text-black'>Mi nombre es Lucas Pallotta, personal trainer orientado en salud y me he perfeccionado en el entrenamiento con el propio peso corporal hace más de 6 años. </p>
                </div>
            </Container>
            <div>
                <Image
                    src='/images/about_1.jpg'
                    alt='line'
                    fill
                    className='relative w-full h-[400px] object-cover'
                /> 
            </div>
            <Container className='w-full h-[350px] bg-white'>
                <div className='flex justify-center items-center w-[280px] ml-auto mr-auto'>
                    <p className='mt-16 text-center text-black'>He aprendido las herramientas necesarias para poder trasmitir los conocimientos para ayudar a las personas a lograr sus objetivos, no solo físicos, si no también mente y espíritu para persistir a lo largo de los años y lograr desarrollar el verdadero hábito que estás buscando.</p>
                </div>
            </Container>
        </>
    )
}

export default About;