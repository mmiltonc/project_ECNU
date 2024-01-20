"use client"
import Container from './shared/container'
import Image from 'next/image'

const Home = () => {
    return (
        <Container className='h-screen'>
                <Image
                    src='/images/background.jpg'
                    alt='ECNU fondo'
                    fill
                    className='absolute object-cover -z-50'
                />
                <div className='flex flex-col justify-center items-center'>
                    <Image
                        src='/images/logo.png'
                        alt='ECNU Logo'
                        fill
                        className='relative top-5'
                    />
                    <p>EL CAMBIO NACE EN UNO</p>
                </div>
                <div className='mt-28 flex flex-col justify-center items-center'>
                    <span className='w-44 mb-5 text-center'>TODO CAMBIO CONLLEVA UNA GRAN</span>
                    <span className='w-8/12 mb-5 text-center font-bold'>RESPONSABILIDAD, ACTITUD Y DISCIPLINA</span>
                    <span className='w-8/12 mb-10 text-center'>QUE TENEMOS QUE AFRONTAR</span>
                </div>
                <div className='mt-28 mb-24 flex flex-col justify-center items-center'>
                    <button className='w-44 h-14 border-4 border-red-700 text-red-700 rounded-full'>
                        + INFO
                    </button>
                </div>
        </Container>
    )
}

export default Home;