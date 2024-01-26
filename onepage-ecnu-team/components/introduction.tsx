"use client"
import Container from './shared/container'

const Introduction = () => {
    return (
        <div className='lg:bg-black lg:h-[800px] lg:flex lg:flex-col lg:justify-center lg:items-center'>
                <div className='pt-10 mb-10 text-3xl font-bold
                                lg:flex lg:justify-center lg:items-center lg:text-8xl'>
                    <p className='lg:mt-32'>TEAM ECNU</p>
                </div>
                <div className='flex flex-col justify-end items-end
                                lg:justify-center lg:items-center'>
                    <span className='w-48 mb-5 text-end'>NO ES UN GRUPO MÁS.</span>
                    <span className='w-50 mb-5 text-end'>TENEMOS UNA DIRECCIÓN Y UN OBJETIVO EN CONCRETO.</span>
                    <span className='w-[235px] mb-10 text-end lg:w-full lg:text-center'>BUSCAMOS CAMBIAR LA VIDA DE LAS PERSONAS, COMO YA LO HICIMOS CON MÁS DE</span>
                </div>
                <div className='pb-24 flex flex-col justify-end items-end
                                lg:justify-center lg:items-center'>
                    <span className='w-16 text-3xl text-end font-bold text-red-700
                                    lg:text-7xl lg:w-full lg:text-center'>300</span>
                    <span className='w-22 text-end lg:text-center lg:w-full lg:text-2xl'>PERSONAS</span>
                </div>
                <div className='-z-50 relative -top-[230px] -left-[20px]
                                lg:opacity-0 lg:h-0'>
                    <div className="w-[0] h-[0] border-l-[360px] border-t-[200px] border-b-[200px] border-solid border-transparent border-l-red-700">
                    </div>
                    <hr className='w-[400px] h-3 border-0 relative -top-[12.5rem] shadow-line'></hr>
                </div>
        </div>
    )
}

export default Introduction;