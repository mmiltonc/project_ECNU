"use client"
import { useState } from 'react'
import AccordionItem from '@/components/shared/accordion-item'
import Questions from '../public/data/faq.json'
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';
const Faq = () => {

    const [active, setActive] = useState([false, false, false, false, false, false, false, false, false, false])
    const isSomeActive = active.some((element) => element)
    const handleClick = () => {
        isSomeActive ? setActive([false, false, false, false, false, false, false ,false, false, false]) : setActive([true, true, true, true, true, true, true, true, true, true])
    }

    return (
        <>
            <section className='h-auto pb-16 bg-white px-10 
                                lg:pt-40 lg:flex lg:flex-row lg:px-0' 
                    id='faq'>
                <div className='lg:w-2/6 lg:min-h-[700px]'>
                    <div className='w-full lg:flex lg:justify-end'>
                        <h1 className='flex justify-center pt-14 text-black text-3xl font-bold
                                       lg:hidden'>
                        Preguntas Frecuentes</h1>
                    </div>
                    <div className='hidden lg:w-full lg:h-[200px] lg:text-black lg:block lg:ml-20'>
                        <h1 className='text-7xl w-26 font-extrabold tracking-[50px] pb-10'>PREGUNTAS</h1>
                        <h1 className='relative left-[95px] bottom-[183.05px] w-10 text-7xl text-center font-extrabold break-all tracking-widest'>FRECUENTES</h1>
                    </div>
                    <div className='flex items-center justify-center w-full text-black
                                    lg:relative lg:bottom-[245px] lg:left-[750px]'>
                        <button onClick={handleClick} 
                        className='flex flex-row justify-center items-center mt-10'>
                            <div className='relative w-10 h-10 transition-all ease-in-out duration-500'>
                                {!isSomeActive ? <ArrowCircleUpIcon className='lg:w-20 lg:h-20'/> : <ArrowCircleDownIcon className='lg:w-20 lg:h-20'/>}
                            </div>
                        </button>
                    </div>
                </div>
                <div className='lg:relative lg:right-40 lg:top-10 lg:w-4/6 lg:pr-20 lg:mt-20 lg:pb-20'>
                    <div className='w-full mt-2'>
                        {Questions.map((data, index) => {
                            return(
                                <div className='w-full' key={'question'+index}>
                                    <AccordionItem
                                        idx={data.idx}
                                        question={data.question}
                                        answer={data.answer}
                                        turn={active}
                                        setTurn={setActive}
                                    />
                                </div>
                            )
                        })}
                    </div>
                </div>
            </section>
        </>
    )
}

export default Faq;