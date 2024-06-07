"use client"
import Image from 'next/image'

const About = () => {
    const isMobile = (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
    return (
        <>
            <section className='w-full h-auto bg-white' id='quiensoy'>
                <div className='flex w-18'>
                    <h1 className='mt-20 ml-10 text-black text-3xl font-bold
                                   lg:text-6xl'
                    >¿Quienes somos?</h1>
                    <div>
                        <Image
                            src='/images/arrows_down.png'
                            alt='line'
                            fill
                            className='relative w-10 lg:w-30 h-20 lg:h-40 top-10 left-20 rotate-90'
                        /> 
                    </div>
                </div>
                {isMobile ? (
                    <div className='flex flex-col'>
                        <div className='flex justify-center items-center w-[280px] ml-auto mr-auto'>
                            <p className='my-8 text-center text-black text-xl'>Mi nombre es Lucas Pallotta, personal trainer orientado en salud y me he perfeccionado en el entrenamiento con el propio peso corporal hace más de 6 años. </p>
                        </div>
                        <div>
                            <Image
                                src='/images/about_1.jpg'
                                alt='line'
                                fill
                                className='relative w-full h-[400px] object-cover rounded-full'
                            /> 
                        </div>
                        <div className='flex justify-center items-center w-[280px] ml-auto mr-auto'>
                            <p className='my-16 text-center text-black text-xl'>He aprendido las herramientas necesarias para poder trasmitir los conocimientos para ayudar a las personas a lograr sus objetivos, no solo físicos, si no también mente y espíritu para persistir a lo largo de los años y lograr desarrollar el verdadero hábito que estás buscando.</p>
                        </div>
                    </div>
                ) : (
                    <div className='w-full lg:flex lg:flex-row'>
                        <div className='w-2/4 flex flex-col pb-20'>
                            <div className='w-full flex justify-center'>
                                <Image
                                    src='/images/about_1.jpg'
                                    alt='line'
                                    fill
                                    className='relative w-[400px] ml-20 h-[400px] object-cover p-8 rounded-full'
                                /> 
                            </div>
                            <div className='w-full flex flex-col justify-center items-center text-2xl'>
                                <div className='flex justify-center items-center w-3/4 ml-auto mr-auto'>
                                    <p className='mt-8 text-center text-black'>Mi nombre es Lucas Pallotta, personal trainer orientado en salud y me he perfeccionado en el entrenamiento con el propio peso corporal hace más de 6 años. </p>
                                </div>
                                <div className='flex justify-center items-center w-3/4 ml-auto mr-auto'>
                                    <p className='mt-16 text-center text-black'>He aprendido las herramientas necesarias para poder trasmitir los conocimientos para ayudar a las personas a lograr sus objetivos, no solo físicos, si no también mente y espíritu para persistir a lo largo de los años y lograr desarrollar el verdadero hábito que estás buscando.</p>
                                </div>
                            </div>
                        </div>
                        <div className='w-2/4 flex flex-col pb-20'>
                            <div className='w-full flex justify-center'>
                                <Image
                                    src='/images/JulianCebuhar.png'
                                    alt='line'
                                    fill
                                    className='relative w-[400px] ml-20 h-[400px] object-cover p-8 rounded-full'
                                /> 
                            </div>
                            <div className='w-full flex flex-col justify-center items-center text-2xl'>
                                <div className='flex justify-center items-center w-3/4 ml-auto mr-auto'>
                                    <p className='mt-8 text-center text-black'>Atleta, Profesor de educación física (2012-2015)</p>
                                </div>
                                <div className='flex justify-center items-center w-3/4 ml-auto mr-auto'>
                                    <p className='mt-8 text-center text-black'>Comencé la calistenia en 2018 como parte de mi rutina habitual y me he perfeccionado desde aquel entonces. Ingrese a E.C.N.U en 2021, al día de hoy no solo ejerzo como profesor, si no también es mi medio de aprendizaje para seguir perfeccionándome y transmitir los conocimientos logrados.</p>
                                </div>
                                <div className='flex justify-center items-center w-3/4 ml-auto mr-auto'>
                                    <p className='mt-16 text-center text-black'>Busco ayudar e introducir la disciplina en mis alumnos para mostrarles el camino correcto hacia el éxito, entrenar de manera inteligente, pero también lograr transmitir lo importante de auto superarnos.</p>
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