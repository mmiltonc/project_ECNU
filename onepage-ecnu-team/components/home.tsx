"use client"
import Container from './shared/container'
import Image from 'next/image'

const Home = () => {
    return (
        <section className='h-screen' id='home'>
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className='video-background opacity-40 absolute'
                    src={require("../public/videos/ecnuvideo.mp4")}
                >
                </video>
                <div className='flex flex-col justify-center items-center 
                    lg:justify-start lg:items-start'
                >
                    <Image
                        src='/images/logo-white.png'
                        alt='ECNU Logo'
                        fill
                        className='relative top-5 lg:w-72 lg:-left-10 lg:-top-2'
                    />
                    <p className='lg:text-7xl lg:relative lg:top-44 lg:font-bold lg:ml-20 text-red-700'>EL CAMBIO NACE EN UNO</p>
                </div>
                <div className='mt-28 flex flex-col justify-center items-center
                                lg:justify-start lg:items-start lg:relative lg:mt-52 lg:text-xl lg:ml-20'>
                    <span className='w-44 mb-5 text-center lg:text-left lg:w-full'>TODO CAMBIO CONLLEVA UNA GRAN</span>
                    <span className='w-8/12 mb-5 text-center font-bold lg:text-left'>RESPONSABILIDAD, ACTITUD Y DISCIPLINA</span>
                    <span className='w-8/12 mb-10 text-center lg:text-left'>QUE TENEMOS QUE AFRONTAR</span>
                </div>
                <div className='mt-28 mb-24 flex flex-col justify-center items-center'>
                    <button className='w-44 h-14 border-4 border-red-700 text-red-700 rounded-full transition ease-out duration-500'>
                        <a href='#clasesyretos' className='transition ease-in-out duration-350'>+ INFO</a>
                    </button>
                </div>
        </section>
    )
}

export default Home;