import React, { useEffect, useRef} from 'react';
import {FC } from 'react'
import CheckIcon from '@mui/icons-material/Check';
import { StaticImageData } from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PlansTypes } from '@/app/types/formData';

gsap.registerPlugin(ScrollTrigger);

interface CardProps {
    main: boolean;
    index: number;
    type: string;
    image?: string | StaticImageData;
    setPlan: (value: string) => void;
    setOpen: (value: boolean) => void;
    plan: PlansTypes | null;
}

const CardDesktop: FC<CardProps> = (
    {main,
     index,
     image,
     type,
     setPlan,
     setOpen,
     plan
    }) => {


    const cardRef = useRef(null);

    const generateLink = (numero:string, cantDias?:number): string => {
        const linkWhatsApp: string = `https://wa.me/${numero}?text=Hola Lucas! Me gustaría consultar sobre las clases en parque Saavedra para ${cantDias} veces por semana. Saludos`
        return linkWhatsApp
    }

    // const onClick = () => {
    //     const link: string = generateLink('1167837231', cantDias)
    //     const url = window.open(link, '_blank')
    //     url?.focus()
    // }

    const handleOpen = () => {
      setPlan(plan)
      setOpen(true); // Llama a la función para actualizar el estado
    };


    useEffect(() => {
        const directions = [
          { x: -200, y: 0 },   // Izquierda
          { x: 200, y: 0 }     // Derecha
        ];

        // Obtener la dirección basada en el índice
        const { x, y } = directions[index % directions.length];

        // Animación con GSAP y ScrollTrigger
        gsap.fromTo(
          cardRef.current,
          { opacity: 0, x, y },
          {
            opacity: 1,
            x: 0,
            y: 0,
            duration: 1,
            scrollTrigger: {
              trigger: cardRef.current,
              start: 'top 150%',
              scrub: true
            }
          }
        );
      }, [index]);






    return (
        <div className={`w-[350px] min-h-[600px] max-h-[600px] flex flex-col items-center rounded-3xl border-2 border-red-700
            ${!image && 'bg-white'}`}
            style={{
                backgroundImage: image ? `url(${image})` : undefined,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
            ref={cardRef} key={index}>
            {main && (<span className='relative h-10 px-8 bottom-[20px] -skew-x-12 rounded-xl flex justify-center items-center
             bg-red-700 font-bold'>RECOMENDADO</span>)}
            {type === 'plan' && (
              <button
                className={`w-40 relative px-8 h-10 mt-8 rounded-xl bg-red-700 -skew-x-12 top-[91.5%]`}
                onClick={handleOpen}
              >COMPRAR
              </ button>
            )}
        </div>
    )
};

export default CardDesktop;