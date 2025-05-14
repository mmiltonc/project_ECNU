import React, { useEffect, useRef } from "react";
import { FC } from "react";
import { StaticImageData } from "next/image";
import gsap from "gsap";
import { useMediaQuery } from "@/hooks/use-media-query";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PlansTypes } from "@/app/types/formData";

gsap.registerPlugin(ScrollTrigger);

interface CardProps {
  main: boolean;
  position: "left" | "right";
  type: string;
  image?: string | StaticImageData;
  setPlan: (value: string) => void;
  setOpen: (value: boolean) => void;
  plan: PlansTypes;
  parent: React.RefObject<HTMLDivElement>;
}

const CardDesktop: FC<CardProps> = ({
  main,
  position,
  image,
  type,
  setPlan,
  setOpen,
  parent,
  plan,
}) => {
  const cardRef = useRef(null);
  const isMobile = useMediaQuery("(max-width: 800px)");

  const handleOpen = () => {
    setPlan(plan);
    setOpen(true); // Llama a la función para actualizar el estado
  };


  useEffect(() => {
    const mobileMovement = { left: -200, right: 200 };
    const desktopMovement = { left: -200, right: 200 };

    const x = isMobile ? mobileMovement : desktopMovement;
    const isMobileBottom = isMobile && position === "right";

    gsap.fromTo(
      cardRef.current,
      { opacity: 0, x: x[position] },
      {
        opacity: 1,
        x: 0,
        duration: 1,
        scrollTrigger: {
          trigger: parent.current,
          start: isMobileBottom ? "top bottom-=600px" : "top bottom-=0px",
          end: isMobileBottom ? "top bottom-=1000px" : "top bottom-=400px",
          scrub: true,
        },
      }
    );
  }, [parent, position, isMobile]);

  return (
    <div
      className='card'
      style={{
        backgroundImage: image ? `url(${image})` : undefined,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      ref={cardRef}
    >
      {main && (
        <span
          className="relative h-10 px-8 bottom-[20px] -skew-x-12 rounded-xl flex justify-center items-center
             bg-red-700 font-bold"
        >
          RECOMENDADO
        </span>
      )}
      {type === "plan" && (
        <button
          className={`w-40 relative px-8 h-10 mt-8 rounded-xl bg-red-700 -skew-x-12 top-[91.5%]`}
          onClick={handleOpen}
        >
          COMPRAR
        </button>
      )}
    </div>
  );
};

export default CardDesktop;
