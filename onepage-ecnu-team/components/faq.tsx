"use client"
import { useState } from 'react'
import Container from './shared/container'
import AccordionItem from './shared/accordion-item'
import Questions from '../public/data/faq.json'
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';
const Faq = () => {

    const [active, setActive] = useState([false, false, false, false])
    const isSomeActive = active.some((element) => element)
    const handleClick = () => {
        isSomeActive ? setActive([false, false, false, false, false]) : setActive([true, true, true, true, true])
    }

    return (
        <>
            <Container className='h-[850px] bg-white'>
                    <div className='w-full'>
                        <h1 className='flex justify-end pt-14 text-black text-2xl font-bold'>Preguntas Frecuentes</h1>
                    </div>
                    <div className='flex items-center justify-center w-full text-black'>
                        <button onClick={handleClick} 
                        className='flex flex-row items-center justify-center pt-10'>
                            <span className='text-sm'>{!isSomeActive ? "Cerrar todo" : "Ver todo"}</span>
                            <div className='relative w-2 h-2 transition-all ease-in-out duration-500'>
                                {!isSomeActive ? <ArrowCircleUpIcon/> : <ArrowCircleDownIcon />}
                            </div>
                        </button>
                    </div>
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
            </Container>
        </>
    )
}

export default Faq;