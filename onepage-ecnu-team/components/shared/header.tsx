"use client"
import {useState} from 'react'

const Header = () => {

    const [isMenuClicked, setIsMenuClicked] = useState(false)

    const updateMenu = () => {
        setIsMenuClicked(!isMenuClicked)
    }

    const closeMenu = () => {
        setIsMenuClicked(false)
    }

    return (
        <header>
            <div>
                <nav className='fixed w-16 h-14 right-0 z-50 block
                                lg:ml-6'>
                    <button className='menu-bar w-full flex flex-col items-end justify-center absolute top-5 right-6 z-50' id='menu' onClick={updateMenu}>
                        <div className={`icon-menu w-10 h-1 mb-2 border-2 border-blue transition-all duration-300 ease-out ${isMenuClicked ? '-rotate-45 bg-black relative top-3' : 'bg-white'}`}></div>
                        <div className={`icon-menu w-10 h-1 mb-2 border-2 border-blue transition-all duration-300 ease-out ${isMenuClicked ? 'rotate-45 bg-black' : 'bg-white'}`}></div>
                        <div className={`icon-menu w-11 h-1 mb-2 border-2 border-blue transition-all duration-300 ease-out ${isMenuClicked && 'hidden'}`}></div>
                    </button>
                    <div className={`fixed bg-white opacity-[94%] h-screen text-black flex justify-center items-center text-3xl tracking-[1px] overflow-hidden origin-top duration-300
                                    ${isMenuClicked ? 'w-full left-0' : 'w-0 right-0'}`}>
                        <ul className='w-screen h-[500px] text-left pl-40 font-bold overflow-hidden whitespace-nowrap flex flex-col justify-between text-transform: uppercase'>
                            <li className='py-2 pl-2 hover:bg-gray-200'><a href='#home' onClick={closeMenu}>Inicio</a></li>
                            <li className='ml-4 py-2 pl-2 hover:bg-gray-200'><a href='#clasesyretos' onClick={closeMenu}>Gym virtual & Planificaciones</a></li>
                            <li className='py-2 pl-2 hover:bg-gray-200'><a href='#products' onClick={closeMenu}>Productos</a></li>
                            <li className='ml-4 py-2 pl-2 hover:bg-gray-200'><a href='#cambiosvisibles' onClick={closeMenu}>Cambios Visibles</a></li>
                            <li className='py-2 pl-2 hover:bg-gray-200'><a href='#quiensoy' onClick={closeMenu}>Quien Soy</a></li>
                            <li className='ml-4 py-2 pl-2 hover:bg-gray-200'><a href='#motivaccion' onClick={closeMenu}>Motivaccion</a></li>
                            <li className='py-2 pl-2 hover:bg-gray-200'><a href='#faq' onClick={closeMenu}>Preguntas Frecuentes</a></li>
                            <li className='ml-4 py-2 pl-2 hover:bg-gray-200'><a href='#contact' onClick={closeMenu}>Contacto</a></li>
                        </ul>
                    </div>
                </nav>
            </div>
        </header>
    )
}

export default Header;