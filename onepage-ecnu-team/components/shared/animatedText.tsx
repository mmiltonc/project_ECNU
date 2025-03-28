"use client"
import {motion, useAnimation, useInView} from "framer-motion"
import { useEffect, useRef, useState } from "react"

type AnimatedTextProps = {
    text: string | string[];
    el?: keyof JSX.IntrinsicElements;
    className?: string;
}

const defaultAnimations = ({
    hidden: {
        opacity: 0,
        y: 5,
        transition: {
            duration: 0.001,
        }
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.001,
        }
    }
})

const AnimatedText = ({
    text,
    el: Wrapper = "p",
    className,
}: AnimatedTextProps) => {
    const ref = useRef(null);
    const isInView = useInView(ref, {amount: 0.5, once: true});
    const textArray = Array.isArray(text) ? text : [text];
    const controls = useAnimation()
    const [hasAnimated, setHasAnimated] = useState(false);

 useEffect(() => {
        if (isInView && !hasAnimated) {
            controls.start("visible");
            setHasAnimated(true);
        }
    }, [isInView, hasAnimated, controls]);

    return (
      <Wrapper className={className}>
        <span className="sr-only">{text}</span>
        <motion.span 
            ref={ref}
            initial="hidden" 
            animate={controls} 
            variants={{
                visible: {transition: { staggerChildren: 0.1}},
                hidden: {}
            }}
            aria-hidden
        >
            {textArray.map((line, index) => (
                <span className="block" key={index}>
                    {line.split(" ").map((word, i) => (
                        <span className="inline-block" key={i}>
                            {word.split("").map((char, index) => (
                                <motion.span 
                                    className="inline-block"
                                    variants={defaultAnimations} key={index}
                                >
                                    {char}
                                </motion.span>
                            ))}
                            <span className="inline-block">&nbsp;</span>
                        </span>
                    ))}
                </span>
            ))}
        </motion.span>
      </Wrapper>
    )
}

export default AnimatedText;