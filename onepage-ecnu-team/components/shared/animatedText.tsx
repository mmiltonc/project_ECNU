"use client"
import {motion, useAnimation, useInView} from "framer-motion"
import { useEffect, useRef } from "react"

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
    const isInView = useInView(ref, {amount: 0.5});
    const textArray = Array.isArray(text) ? text : [text];
    const controls = useAnimation()

    useEffect(() => {
        let timeout: NodeJS.Timeout;
        const show = () => {
            controls.start("visible");
            timeout = setTimeout(async() => {
                await controls.start("hidden");
                controls.start("visible");
            }, 500);
        };

        if (isInView) {
            controls.start("visible");
        } else {
            controls.start("hidden");
        }
    }, [isInView])

    return (
      <Wrapper className={className}>
        <span className="sr-only">{text}</span>
        <motion.span 
            ref={ref}
            initial="hiddenn" 
            animate={isInView ? "visible" : "hidden"} 
            variants={{
                visible: {transition: { staggerChildren: 0.1}},
                hidden: {}
            }}
            aria-hidden
        >
            {textArray.map((line) => (
                <span className="block">
                    {line.split(" ").map((word) => (
                        <span className="inline-block">
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