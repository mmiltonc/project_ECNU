"use client"
import Image from 'next/image'

const Products = () => {

    return (
        <>
            <section className='w-full h-full lg:w-auto lg:h-[450px]' id='products'>
                <div className='relative flex flex-col w-full h-[250px] lg:w-full lg:h-full lg:justify-center lg:items-center overflow-hidden'>
                    <div className='absolute top-0 left-0 flex w-[350%] h-full animate-slide border-none'>
                    <div className='relative w-full h-full'>
                        <Image
                        src='/images/merchandising.png'
                        alt='line'
                        fill
                        className='object-fill opacity-50'
                        />
                    </div>
                    <div className='relative w-full h-full'>
                        <Image
                        src='/images/merchandising.png'
                        alt='line'
                        fill
                        className='object-fill opacity-50'
                        />
                    </div>
                    </div>
                    <div className='relative z-10 flex flex-col items-center'>
                    <h1 className='text-white text-2xl font-bold mt-20 lg:mt-10 lg:mb-10 lg:text-6xl lg:w-full lg:text-center'>
                        PRODUCTOS ECNU
                    </h1>
                    <span className='text-5xl lg:w-full lg:text-center lg:text-9xl'>
                        PROXIMAMENTE
                    </span>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Products;