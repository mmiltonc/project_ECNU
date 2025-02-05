"use client"
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

const Introduction = () => {
    return (
        <section className='w-auto h-[500px] bg-red-800 mx-auto
                         lg:h-[800px] lg:flex lg:flex-col lg:justify-center lg:items-center'>
                <div className='pt-2 mb-10 text-4xl font-bold lg:ml-8
                                lg:flex lg:justify-center lg:items-center lg:text-6xl'>
                    <p className='lg:mt-14'>Por qué ECNU Online mejoraría mi vida</p>
                </div>
                <div className='flex flex-col justify-end items-end text-xl
                                lg:justify-center lg:items-center lg:text-3xl'>
                    <span className='lg:w-[800px] mb-5 text-center'>La falta de tiempo para trasladarte de tu casa a un gimnasio, ya sea por
                                                        estudio, trabajo u otros motivos personales, ¿No te permite mantenerte
                                                        constante en el entrenamiento? ¿No encontras una guía en tu nuevo
                                                        camino?
                    </span>
                    <span className='lg:w-[800px] mb-5 text-center'>Elegí entre mis desafíos o planificaciones online y da el paso que cambiara tu
                                                        vida para siempre.
                    </span>
                </div>
        </section>
    )
}

export default Introduction;