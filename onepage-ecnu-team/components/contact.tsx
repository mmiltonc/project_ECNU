"use client"
import { useState } from 'react'
import Container from './shared/container'

const Contact = () => {

    const [formData, setFormData] = useState({
        nombre: '',
        email: '',
        mensaje: ''
    })
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(e)
    }

    return (
        <>
            <Container className='w-full h-[750px]' id='contact'>
                    <div className='flex w-4'>
                        <h1 className='text-white text-4xl font-bold mt-20 mb-10'>Contacto</h1>
                    </div>
                    <div className='w-[280px]'>
                        <p className='mb-8'>Aun te quedan preguntas? Contactanos y repasemos juntos las dudas</p>
                    </div>
                    <div>
                        <div></div>
                        <div></div>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className='flex flex-col'>
                            <label htmlFor='name'>Nombre</label>
                            <input 
                                required
                                type='text' 
                                name="nombre" 
                                className='p-2 rounded-xl text-black' 
                                onChange={(e) => setFormData({...formData, [e.target.name]: e.target.value})}
                                value={formData.nombre}
                            />
                        </div>
                        <div className='flex flex-col'>
                            <label htmlFor='email'>Email</label>
                            <input 
                                required
                                type='email' 
                                autoComplete='off' 
                                name='email' 
                                className='p-2 rounded-xl text-black' 
                                minLength={5}
                                maxLength={50}
                                onChange={(e) => setFormData({...formData, [e.target.name]: e.target.value})}
                                value={formData.email}
                            />
                        </div>
                        <div className='flex flex-col'>
                            <label htmlFor='message'>Mensaje</label>
                            <textarea
                                required
                                rows={4}
                                placeholder='Escribinos las dudas!'
                                maxLength={1000}
                                name='mensaje'
                                className='p-2 rounded-xl text-black'
                                onChange={(e) => setFormData({...formData, [e.target.name]: e.target.value})}
                                value={formData.mensaje}
                            />
                        </div>
                        <button type='submit' className='ml-auto mr-auto mt-4 flex justify-center items-center p-4 rounded-full bg-white text-black'>Enviar</button>
                    </form>
            </Container>
            <div className='relative w-full h-14 top-4 bg-red-700 rounded-tl-2xl rounded-br-2xl'></div>
        </>
    )
}

export default Contact;