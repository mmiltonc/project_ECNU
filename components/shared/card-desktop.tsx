import React, { useEffect, useRef} from 'react';
import {FC } from 'react'
import { StaticImageData } from 'next/image';
import gsap from 'gsap';
import { useMediaQuery } from "@/hooks/use-media-query"
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface CardProps {
    main: boolean;
    index: number;
    type: string;
    typeVideo: string;
    image?: string | StaticImageData;
    setTypeSelected?: (value: string) => void;
    setOpen?: (value: boolean) => void;
}

const CardDesktop: FC<CardProps> = (
    {main,
     index,
     image,
     type,
     typeVideo,
     setTypeSelected,
     setOpen
    }) => {

    const cardRef = useRef(null);
    const isMobile = useMediaQuery("(max-width: 800px)")

    const handleOpen = () => {
        if (setOpen && setTypeSelected) {
          setTypeSelected(typeVideo)
          setOpen(true); 
        }
    };

    useEffect(() => {


      if (!isMobile) {
        const directions = [
          { x: -200, y: 0 },   // Izquierda
          { x: 200, y: 0 }     // Derecha
        ];
  
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
              start: 'top 200%',
              scrub: true
            }
          }
        );
      }

    }, [index, isMobile]);

    return (
        <div className={`w-[330px] min-h-[570px] max-h-[570px] flex flex-col items-center rounded-3xl border-2 border-red-700
            ${!image && 'bg-white'} lg:w-[350px] lg:min-h-[600px] lg:max-h-[600px]`}
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