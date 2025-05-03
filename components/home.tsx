"use client"
import Image from 'next/image'
import { Tulpen_One, Nothing_You_Could_Do, Bebas_Neue, Montserrat } from 'next/font/google'
import { sendGTMEvent } from '@next/third-parties/google'

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
const montserrat = Montserrat({
    subsets: ['latin'], // Define los subconjuntos necesarios
    weight: ['400', '700'], // Opcional: especifica los pesos que usarás (normal, bold, etc.)
    variable: '--font-montserrat', // Variable CSS opcional para usar en tu CSS global
  });

const Home = () => {
    return (
        <section className='h-screen' id='home'>
            <Image
                src='/images/bgbw.jpeg'
                alt='ECNU Logo'
                fill
                className='video-background opacity-60 absolute'
            />
            <div className='flex flex-col justify-center items-center
                lg:justify-start lg:items-start'
            >
                <Image
                    src='/images/hormiga.png'
                    alt='ECNU Logo'
                    fill
                    className='relative top-16 lg:w-52 lg:left-4 lg:-top-2'
                />
                <p className='mt-8 text-2xl lg:text-[80px] lg:relative lg:top-44 lg:font-bold lg:ml-20 lg:mt-0 text-red-700' style={{ fontFamily: montserrat.style.fontFamily}}>EL CAMBIO NACE EN UNO.</p>
            </div>
            <div className='mt-28 flex flex-col justify-center items-center
                            lg:justify-start lg:items-start lg:relative lg:mt-52 lg:text-xl lg:ml-20'>
                <span className='w-8/12 text-center text-2xl lg:text-left lg:text-4xl' style={{ fontFamily: montserrat.style.fontFamily}}>Comenzá a transformar en <span className='font-bold'>90</span> días tu <span className='font-bold'>cuerpo</span> y tu <span className='font-bold'>mente</span> con mi sistema de entrenamiento online.</span>
            </div>
            <div className='mt-28 mb-24 lg:mt-28 flex flex-col justify-center items-center'>
                <button
                    className='w-[300px] h-16 border-2 border-red-700 text-red-700 rounded-full bg-gradient-to-r from-black to-gray-800 transition-transform duration-300 hover:scale-110'
                    onClick={() => sendGTMEvent({ event: 'buttonClicked', value: 'xyz' })}
                >
                    <a href='#clasesyretos' className='transition ease-in-out duration-350 text-2xl lg:text-2xl' style={{ fontFamily: bebasNeue.style.fontFamily}}>Quiero mi transformación</a>
                </button>
            </div>
        </section>
    )
}

export default Home;