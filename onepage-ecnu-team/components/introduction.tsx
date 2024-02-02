"use client"

const Introduction = () => {
    return (
        <section className='w-auto bg-red-700
                         lg:h-[800px] lg:flex lg:flex-col lg:justify-center lg:items-center'>
                <div className='pt-10 mb-10 text-4xl font-bold ml-8
                                lg:flex lg:justify-center lg:items-center lg:text-8xl'>
                    <p className='lg:mt-32'>TEAM ECNU</p>
                </div>
                <div className='flex flex-col justify-end items-end
                                lg:justify-center lg:items-center mr-10 text-xl'>
                    <span className='w-50 mb-5 text-end'>NO ES UN GRUPO MÁS.</span>
                    <span className='w-50 mb-5 text-end'>TENEMOS UNA DIRECCIÓN Y UN OBJETIVO EN CONCRETO.</span>
                    <span className='w-[330px] mb-10 text-end lg:w-full lg:text-center'>BUSCAMOS CAMBIAR LA VIDA DE LAS PERSONAS, COMO YA LO HICIMOS CON MÁS DE</span>
                </div>
                <div className='pb-24 flex flex-col justify-end items-end mr-16
                                lg:justify-center lg:items-center lg:mr-0'>
                    <span className='w-16 text-5xl text-end font-bold text-gray-900
                                    lg:text-7xl lg:w-full lg:text-center'>300</span>
                    <span className='w-28 relative left-[25px] text-end 
                                    lg:text-center lg:w-full lg:text-3xl lg:left-0'>PERSONAS</span>
                </div>
                {/* <div className='-z-50 relative -top-[230px] -left-[20px]
                                lg:hidden lg:h-0'>
                    <div className="w-[0] h-[0] border-l-[450px] border-t-[200px] border-b-[200px] border-solid border-transparent border-l-red-700">
                    </div>
                    <hr className='w-[400px] h-3 border-0 relative -top-[12.5rem] shadow-line'></hr>
                </div> */}
        </section>
    )
}

export default Introduction;