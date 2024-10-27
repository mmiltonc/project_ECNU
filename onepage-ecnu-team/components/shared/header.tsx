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
                    <div className={`fixed bg-white h-screen text-black flex justify-center items-center text-[25px] tracking-[1px] overflow-hidden origin-top duration-300
                                    ${isMenuClicked ? 'w-full left-0' : 'w-0 right-0'}`}>
                        <ul className='w-screen h-[500px] text-center font-bold overflow-hidden whitespace-nowrap flex flex-col justify-between'>
                            <li><a href='#home' onClick={closeMenu}>Home</a></li>
                            <li><a href='#clasesyretos' onClick={closeMenu}>Clases & Retos</a></li>
                            <li><a href='#cambiosvisibles' onClick={closeMenu}>Cambios Visibles</a></li>
                            <li><a href='#guianutricional' onClick={closeMenu}>Guia Nutricional</a></li>
                            <li><a href='#quiensoy' onClick={closeMenu}>Quien Soy</a></li>
                            <li><a href='#motivaccion' onClick={closeMenu}>Motivaccion</a></li>
                            <li><a href='#faq' onClick={closeMenu}>Preguntas Frecuentes</a></li>
                            <li><a href='#contact' onClick={closeMenu}>Contacto</a></li>
                        </ul>
                    </div>
                </nav>
            </div>
        </header>
    )
}

export default Header;