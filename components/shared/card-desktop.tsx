import React, { ReactNode, useEffect, useRef } from "react";
import { FC } from "react";
import { StaticImageData } from "next/image";
import gsap from "gsap";
import { useMediaQuery } from "@/hooks/use-media-query";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PlansTypes } from "@/app/types/formData";
import classNames from "classnames";

gsap.registerPlugin(ScrollTrigger);

interface CardProps {
  position: "left" | "right";
  image?: string | StaticImageData;
  parent: React.RefObject<HTMLDivElement>;
  className?: string;
  children?: ReactNode | ReactNode[];
}

const CardDesktop: FC<CardProps> = ({
  position,
  image,
  parent,
  className,
  children,
}) => {
  const cardRef = useRef(null);
  const isMobile = useMediaQuery("(max-width: 800px)");

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
          start: isMobileBottom ? "top bottom-=600px" : "top bottom-=200px",
          end: isMobileBottom ? "top bottom-=1000px" : "top bottom-=800px",
          scrub: true,
        },
      }
    );
  }, [parent, position, isMobile]);

  return (
    <div
      className={classNames("card", className)}
      style={{
        backgroundImage: image ? `url(${image})` : undefined,
      }}
      ref={cardRef}
    >
      {children}
    </div>
  );
};

export default CardDesktop;
