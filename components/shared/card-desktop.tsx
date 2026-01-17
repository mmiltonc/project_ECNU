import React, { ReactNode, useEffect, useRef } from "react";
import { FC } from "react";
import gsap from "gsap";
import { useMediaQuery } from "@/hooks/use-media-query";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import classNames from "classnames";

gsap.registerPlugin(ScrollTrigger);

interface CardProps {
  position: "left" | "right";
  parent: React.RefObject<HTMLDivElement>;
  className?: string;
  children?: ReactNode | ReactNode[];
}

const CardDesktop: FC<CardProps> = ({
  position,
  parent,
  className,
  children,
}) => {
  const cardRef = useRef(null);
  const isMobile = useMediaQuery("(max-width: 768px)");

  useEffect(() => {
    const mobileVertical = { y: 100 };
    const desktopHorizontal = { x: position === "left" ? -200 : 200 };

    const context = gsap.context(() =>
      gsap.fromTo(
        cardRef.current,
        {
          opacity: 0,
          ...(isMobile && mobileVertical),
          ...(!isMobile && desktopHorizontal),
        },
        {
          opacity: 1,
          ...(isMobile ? { y: 0 } : { x: 0 }),
          duration: 1,
          scrollTrigger: {
            trigger: parent.current,
            start: isMobile ? "top bottom-=200px" : "top bottom-=200px",
            end: isMobile ? "top bottom-=800px" : "top bottom-=600px",
            scrub: true,
          },
        }
      )
    );
    return () => context.revert();
  }, [parent, position, isMobile]);

  return (
    <div className={classNames("card", className)} ref={cardRef}>
      {children}
    </div>
  );
};

export default CardDesktop;
