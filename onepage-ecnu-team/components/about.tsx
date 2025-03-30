"use client"
import { useEffect, useState } from 'react'
import Image from 'next/image'

const About = () => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        // Esta lógica solo se ejecutará en el cliente
        const userAgent = navigator.userAgent;
        const mobileRegex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
        setIsMobile(mobileRegex.test(userAgent));
    }, []);

    const x = 42;



    return (
        <>
            <section className='w-full h-auto bg-white pt-36' id='quiensoy'>
                <div className='flex w-18 justify-end pr-28'>
                    <div className='flex flex-col'>
                        <h3 className='mt-20 ml-10 text-black text-3xl font-bold
                        lg:text-2xl'>CONOCEME</h3>
                        <h1 className='mt-4 ml-10 text-black text-3xl font-bold
                                    lg:text-6xl'
                        >¿QUIÉN SOY?</h1>
                    </div>
                </div>
                {isMobile ? (
                    <div className='flex flex-col'>
                        <div className='flex justify-center items-center w-[280px] ml-auto mr-auto'>
                            <p className='my-8 text-center text-black text-xl'>Hola, soy Lucas Pallotta, atleta e instructor de calistenia de alto rendimiento. A lo largo de los años, he desarrollado herramientas para el control y la armonización de la mente y el cuerpo. Mi principal don es la disciplina , y me apasiona ayudar a quienes están dispuestos a permitirme influenciar en sus vidas.
                            La actividad física va mucho mas allá de simplemente alcanzar un cuerpo saludable o esbelto. Para mi, es un canalizador fundamental de energía, tanto positiva como negativa, que nos permite transformar nuestras emociones y pensamientos en acción. A través del ejercicio, no solo fortalecemos nuestros músculos; también cultivamos nuestro autoestima y desarrollamos la perseverancia necesaria para alcanzar nuestros sueños.</p>
                        </div>
                        <div>
                            <Image
                                src='/images/about_1.jpg'
                                alt='line'
                                fill
                                className='relative w-[350px] h-[350px] ml-auto mr-auto object-cover rounded-full'
                            />
                        </div>
                    </div>
                ) : (
                    <div className='w-full lg:flex lg:flex-row'>
                        <div className='flex pb-40 lg:pb-20 pt-32 lg:pt-14'>
                            <div className='w-full flex justify-center'>
                                <Image
                                    src='/images/antes_despues_luqui.jpeg'
                                    alt='line'
                                    fill
                                    className='relative ml-14 mt-10 h-[550px] rounded-lg'
                                />
                            </div>
                            <div className='w-full flex flex-col justify-center items-center text-2xl'>
                                <div className='flex justify-center items-center w-3/4 ml-auto mr-auto'>
                                    <p className='text-left text-black'>Hola, soy Lucas Pallotta, atleta e instructor de calistenia de alto rendimiento. A lo largo de los años, he desarrollado herramientas para el control y la armonización de la mente y el cuerpo. Mi principal don es la disciplina , y me apasiona ayudar a quienes están dispuestos a permitirme influenciar en sus vidas.
                                    La actividad física va mucho mas allá de simplemente alcanzar un cuerpo saludable o esbelto. Para mi, es un canalizador fundamental de energía, tanto positiva como negativa, que nos permite transformar nuestras emociones y pensamientos en acción. A través del ejercicio, no solo fortalecemos nuestros músculos; también cultivamos nuestro autoestima y desarrollamos la perseverancia necesaria para alcanzar nuestros sueños.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </section>
        </>
    )
}

export default About;