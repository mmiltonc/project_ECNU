"use client"
import Image from 'next/image'
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
                        className='relative top-16 lg:w-72 lg:-left-10 lg:-top-2'
                    />
                    <p className='mt-8 lg:text-[150px] lg:relative lg:top-44 lg:font-bold lg:ml-20 lg:mt-0 text-red-700' style={{ fontFamily: bebasNeue.style.fontFamily}}>EL CAMBIO NACE EN UNO.</p>
                </div>
                <div className='mt-28 flex flex-col justify-center items-center
                                lg:justify-start lg:items-start lg:relative lg:mt-52 lg:text-xl lg:ml-20'>
                    <span className='w-60 mb-7 text-center text-2xl lg:text-left lg:w-full lg:text-4xl' style={{ fontFamily: nothingYouCouldDo.style.fontFamily}}>todo cambio conlleva una gran</span>
                    <span className='w-8/12 mb-5 text-center font-bold text-3xl lg:text-left lg:text-5xl' style={{ fontFamily: tulpenOne.style.fontFamily}}>RESPONSABILIDAD, ACTITUD Y DISCIPLINA</span>
                </div>
                <div className='mt-28 mb-24 lg:mt-16 flex flex-col justify-center items-center'>
                    <button className='w-44 h-14 border-2 border-red-700 text-red-700 rounded-full transition ease-out duration-500'>
                        <a href='#clasesyretos' className='transition ease-in-out duration-350 lg:text-2xl' style={{ fontFamily: bebasNeue.style.fontFamily}}>UNIRTE AL CAMBIO</a>
                    </button>
                </div>
        </section>
    )
}

export default Home;