import React, { Dispatch, SetStateAction, useEffect, useRef } from 'react';
import {FC, ReactNode } from 'react'
import MinimizeIcon from '@mui/icons-material/Minimize';
import AddIcon from '@mui/icons-material/Add';

type Props = {
    idx: number,
    question: string,
    answer: string,
    turn: boolean[],
    setTurn: Dispatch<SetStateAction<boolean[]>>
}



const AccordionItem = ({idx, question, answer, turn, setTurn}:Props) => {

    const toggleAccordion = () => {
        let newTurn = [...turn!]
        newTurn[idx] = !newTurn[idx]
        setTurn!(newTurn)
    }

    return (
        <div className='flex items-center flex-col w-full text-black'>
            <button onClick={toggleAccordion}
            className={`rounded-xl bg-grey-400 shadow cursor-pointer w-full h-full ${turn![idx]} transition-all ease-in-out duration-700`}>
                <div>
                    <div className='flex items-center justify-between h-14 text-left'>
                        <span className='ml-2 text-sm font-bold text-red-700'>{question}</span>
                        <div className='text-red-700'>
                            {turn![idx] ? <AddIcon/> : <MinimizeIcon/>}
                        </div>
                    </div>
                    <div className={`x-4 overflow-hidden text-left  ${turn![idx] ? 'max-h-0' : 'max-h-40'} transition-all duration-200 ease-in-out`}>
                        <p className='py-1 ml-2 font-normal leading-normal text-justify whitespace-pre-line text-xs'>{answer}</p>
                    </div>
                </div>

            </button>
        </div>
    )
};

export default AccordionItem;