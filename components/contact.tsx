"use client"
import React from 'react'
import Container from './shared/container'
import Image from 'next/image'
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import InstagramIcon from '@mui/icons-material/Instagram';
const Contact = () => {

    return (
        <>
            <Container className='w-full h-[350px] flex flex-col justify-center items-center' id='contact'>
                    <div className='flex w-full'>
                        <h1 className='text-white text-4xl font-bold mt-20 mb-10 ml-auto mr-auto'>Contacto</h1>
                    </div>
                    <div className='w-[280px] lg:w-2/3'>
                        <p className='mb-8 text-center'>Aun te quedan preguntas? Contactanos y repasemos juntos las dudas</p>
                    </div>
                    <div className='flex items-center justify-between w-full mb-20 lg:w-64'>
                        <div><InstagramIcon className=' w-12 h-14'/></div>
                        <div><WhatsAppIcon className=' w-12 h-14'/></div>
                        <div className='relative rounded-full w-10 h-12'>
                            <Image
                            src='/images/tiktok.png'
                            alt='line'
                            fill
                            className='object-cover w-10 h-12'
                            />
                        </div>
                    </div>
            </Container>
        </>
    )
}

export default Contact;