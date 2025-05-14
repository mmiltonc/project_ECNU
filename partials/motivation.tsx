"use client";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import { LenisRef, ReactLenis } from "lenis/react";
import { space, desktop, fontSize1, fontSize2 } from "@/styles/global";

gsap.registerPlugin(ScrollTrigger);

const styles = css`
  height: 2500vh;
  top: 0;

  ${desktop(css`
    height: 2000vh;
    `)}

  i {
    font-style: normal;
    color: #87a7cb;
  }

  strong {
    color: #fd5f44;
    font-weight: 600;
  }

  .slide {
    height: 100vh;
    position: sticky;
    /* padding: 160px 80px; */
    top: 0;
    width: 100%;

    .content {
      ${fontSize2};
      overflow: hidden;
      left: 0;
      top: 0;
      position: absolute;
      width: 100%;
      height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: var(--font-jost);
      font-weight: 600;
      text-transform: uppercase;

      ${desktop(css`
        ${fontSize1};
      `)}
    }
  }

  .slide-1 {
    /* https://css-irl.info/css-halftone-patterns/ */

    .background {
      content: "";
      display: block;
      background-image: url(images/motivation.jpg);
      background-repeat: no-repeat;
      background-size: auto 100vh;
      mix-blend-mode: luminosity;
      opacity: 0.3;
      top: 0;
      left: 0;
      height: 100vh;
      width: 100vw;
      position: sticky;
    }

    .question {
      opacity: 1;
      filter: blur(0px);
      transform: scale(1);
      font-weight: 800;
    }

    .question-text {
      opacity: 0;
    }

    .question-mark-1 {
      opacity: 0;
      transform: translateX(-20px);
      color: #fd5f44;
      display: inline-block;
    }

    .question-mark-2 {
      opacity: 0;
      transform: translateX(20px);
      color: #fd5f44;
      display: inline-block;
    }
  }

  .speech {
    height: 100%;
    width: 100%;

    span {
      display: block;

      ${desktop(css`
        display: inline-block;
      `)}
    }

    .centered-text {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .sliding-text {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      height: 100vh;
    }

    p {
      ${fontSize1};
      font-family: var(--font-jost);
      font-weight: 600;
      opacity: 0;

      ${desktop(css`
        ${fontSize1};
      `)}
    }

    .text-1,
    .text-3,
    .text-4,
    .text-5,
    .text-6,
    .text-7 {
      text-align: center;
      padding: 0 ${space(2)};
    }

    .slider {
      position: absolute;
      top: 50%;
      left: 0;
      transform: translate(100%, -50%);
      opacity: 1;
      width: 100%;
    }

    .text-2 {
      padding: 0 ${space(2)};
      position: relative;
      white-space: nowrap;
      width: min-content;
      display: inline-block;
    }

    .text-8,
    .text-9,
    .text-10 {
      padding: 0 ${space(2)};
      opacity: 1;
      text-align: center;

      .from-left,
      .from-right,
      .zoom-out {
        display: inline-block;
      }

      .from-top,
      .from-bottom {
        display: block;
      }
    }
  }
`;

const background = (el: HTMLElement) => {
  gsap.fromTo(
    el,
    { backgroundPosition: "100% 0%" },
    {
      backgroundPosition: "0% 0%",
      scrollTrigger: {
        trigger: '.section-about',
        start: "top bottom",
        end: "bottom+=25000px bottom",
        scrub: true,
      },
    }
  );
};

const questionText = (el: HTMLElement) => {
  gsap.fromTo(
    el,
    {},
    {
      opacity: 1,
      scrollTrigger: {
        trigger: el,
        start: "top bottom",
        end: "top",
        scrub: true,
      },
    }
  );
};

const questionMark1 = (el: HTMLElement) => {
  gsap.fromTo(
    el,
    { opacity: 0, x: -20 },
    {
      opacity: 1,
      x: 0,
      scrollTrigger: {
        trigger: ".question-text",
        start: "bottom+=500px bottom",
        end: "bottom+=800px bottom",
        scrub: true,
      },
    }
  );
};

const questionMark2 = (el: HTMLElement) => {
  gsap.fromTo(
    el,
    { opacity: 0, x: 20 },
    {
      opacity: 1,
      x: 0,
      scrollTrigger: {
        trigger: ".question-text",
        start: "bottom+=500px bottom",
        end: "bottom+=800px bottom",
        scrub: true,
      },
    }
  );
};

const question = (el: HTMLElement) => {
  gsap.fromTo(
    el,
    {},
    {
      filter: "blur(10px)",
      opacity: 0,
      transform: "scale(3)",
      scrollTrigger: {
        trigger: ".question-text",
        start: "bottom+=1500px bottom",
        end: "bottom+=1900px bottom",
        scrub: true,
      },
    }
  );
};

const text1 = (el: HTMLElement) => {
  gsap.fromTo(
    el,
    { opacity: 0, y: 20, filter: "blur(4px)" },
    {
      opacity: 1,
      filter: "blur(0px)",
      y: 0,
      scrollTrigger: {
        trigger: ".question-text",
        start: "bottom+=1700px bottom",
        end: "bottom+=2100px bottom",
        scrub: true,
      },
    }
  );

  gsap.fromTo(
    el,
    {},
    {
      opacity: 0,
      scale: 0.5,
      scrollTrigger: {
        trigger: ".question-text",
        start: "bottom+=2700px bottom",
        end: "bottom+=3600px bottom",
        scrub: true,
      },
    }
  );
};

const text2 = (el: HTMLElement) => {
  gsap.fromTo(
    el,
    {},
    {
      opacity: 1,
      filter: "blur(0px)",
      x: "-100%",
      left: "-100%",
      scrollTrigger: {
        trigger: ".text-1",
        start: "bottom+=1700px bottom",
        end: "bottom+=8900px bottom",
        ease: "none",
        scrub: true,
      },
    }
  );
};

const text3 = (el: HTMLElement) => {
  gsap.fromTo(
    el,
    { opacity: 0, y: 20, filter: "blur(4px)" },
    {
      opacity: 1,
      filter: "blur(0px)",
      y: 0,
      scrollTrigger: {
        trigger: ".text-2",
        start: "bottom+=6900px bottom",
        end: "bottom+=7300px bottom",
        scrub: true,
      },
    }
  );

  gsap.fromTo(
    el,
    {},
    {
      opacity: 0,
      scale: 0.5,
      scrollTrigger: {
        trigger: ".text-2",
        start: "bottom+=7900px bottom",
        end: "bottom+=8800px bottom",
        scrub: true,
      },
    }
  );
};

const text4 = (el: HTMLElement) => {
  gsap.fromTo(
    el,
    { opacity: 0, y: 20, filter: "blur(4px)" },
    {
      opacity: 1,
      filter: "blur(0px)",
      y: 0,
      scrollTrigger: {
        trigger: ".text-3",
        start: "bottom+=7900px bottom",
        end: "bottom+=8300px bottom",
        scrub: true,
      },
    }
  );

  gsap.fromTo(
    el,
    {},
    {
      opacity: 0,
      scale: 0.5,
      scrollTrigger: {
        trigger: ".text-3",
        start: "bottom+=8900px bottom",
        end: "bottom+=9800px bottom",
        scrub: true,
      },
    }
  );
};

const text5 = (el: HTMLElement) => {
  gsap.fromTo(
    el,
    { opacity: 0, y: 20, filter: "blur(4px)" },
    {
      opacity: 1,
      filter: "blur(0px)",
      y: 0,
      scrollTrigger: {
        trigger: ".text-4",
        start: "bottom+=8900px bottom",
        end: "bottom+=9300px bottom",
        scrub: true,
      },
    }
  );

  gsap.fromTo(
    el,
    {},
    {
      opacity: 0,
      scale: 0.5,
      scrollTrigger: {
        trigger: ".text-4",
        start: "bottom+=9900px bottom",
        end: "bottom+=10800px bottom",
        scrub: true,
      },
    }
  );
};

const text6 = (el: HTMLElement) => {
  gsap.fromTo(
    el,
    { opacity: 0, y: 20, filter: "blur(4px)" },
    {
      opacity: 1,
      filter: "blur(0px)",
      y: 0,
      scrollTrigger: {
        trigger: ".text-5",
        start: "bottom+=9900px bottom",
        end: "bottom+=10300px bottom",
        scrub: true,
      },
    }
  );

  gsap.fromTo(
    el,
    {},
    {
      opacity: 0,
      scale: 0.5,
      scrollTrigger: {
        trigger: ".text-5",
        start: "bottom+=10900px bottom",
        end: "bottom+=11800px bottom",
        scrub: true,
      },
    }
  );
};

const text7 = (el: HTMLElement) => {
  gsap.fromTo(
    el,
    { opacity: 0, y: 20, filter: "blur(4px)" },
    {
      opacity: 1,
      filter: "blur(0px)",
      y: 0,
      scrollTrigger: {
        trigger: ".text-6",
        start: "bottom+=10900px bottom",
        end: "bottom+=11300px bottom",
        scrub: true,
      },
    }
  );

  gsap.fromTo(
    el,
    {},
    {
      opacity: 0,
      scale: 0.5,
      scrollTrigger: {
        trigger: ".text-6",
        start: "bottom+=11900px bottom",
        end: "bottom+=12800px bottom",
        scrub: true,
      },
    }
  );
};

const text8FromTop = (el: HTMLElement) => {
  gsap.fromTo(
    el,
    { opacity: 0, y: -100, filter: "blur(4px)" },
    {
      opacity: 1,
      filter: "blur(0px)",
      y: 0,
      scrollTrigger: {
        trigger: ".text-7",
        start: "bottom+=11900px bottom",
        end: "bottom+=12300px bottom",
        scrub: true,
      },
    }
  );
};

const text8FromBottom = (el: HTMLElement) => {
  gsap.fromTo(
    el,
    { opacity: 0, y: 100, filter: "blur(4px)" },
    {
      opacity: 1,
      filter: "blur(0px)",
      y: 0,
      scrollTrigger: {
        trigger: ".text-7",
        start: "bottom+=11900px bottom",
        end: "bottom+=12300px bottom",
        scrub: true,
      },
    }
  );
};

const text8 = (el: HTMLElement) => {
  gsap.fromTo(
    el,
    {},
    {
      opacity: 0,
      scale: 0.5,
      scrollTrigger: {
        trigger: ".text-7",
        start: "bottom+=12900px bottom",
        end: "bottom+=13800px bottom",
        scrub: true,
      },
    }
  );
};

const text9FromLeft = (el: HTMLElement) => {
  gsap.fromTo(
    el,
    { opacity: 0, x: "-100%", filter: "blur(4px)" },
    {
      opacity: 1,
      filter: "blur(0px)",
      x: 0,
      scrollTrigger: {
        trigger: ".text-8",
        start: "bottom+=12900px bottom",
        end: "bottom+=13900px bottom",
        scrub: true,
      },
    }
  );
};

const text9FromRight = (el: HTMLElement) => {
  gsap.fromTo(
    el,
    { opacity: 0, x: "100%", filter: "blur(4px)" },
    {
      opacity: 1,
      filter: "blur(0px)",
      x: 0,
      scrollTrigger: {
        trigger: ".text-8",
        start: "bottom+=12900px bottom",
        end: "bottom+=13900px bottom",
        scrub: true,
      },
    }
  );
};

const text9 = (el: HTMLElement) => {
  gsap.fromTo(
    el,
    {},
    {
      opacity: 0,
      scale: 5,
      x: 0,
      scrollTrigger: {
        trigger: ".text-8",
        start: "bottom+=14900px bottom",
        end: "bottom+=15500px bottom",
        scrub: true,
      },
    }
  );
};

const text10ZoomOut = (el: HTMLElement) => {
  gsap.fromTo(
    el,
    { scale: 5, opacity: 0 },
    {
      opacity: 1,
      scale: 1,
      scrollTrigger: {
        trigger: ".text-9",
        start: "bottom+=14900px bottom",
        end: "bottom+=15500px bottom",
        scrub: true,
      },
    }
  );

  gsap.fromTo(
    el,
    {},
    {
      opacity: 0,
      scrollTrigger: {
        trigger: ".text-9",
        start: "bottom+=16500px bottom",
        end: "bottom+=18000px bottom",
        scrub: true,
        ease: "power2.out",
      },
    }
  );
};

const Motivation = () => {
  const lenisRef = useRef<LenisRef | null>(null);

  const slide1Ref = useRef(null);

  useEffect(() => {
    function update(time: number) {
      lenisRef.current?.lenis?.raf(time * 1000);
    }

    gsap.ticker.add(update);

    (gsap.utils.toArray(".slide-1 .background") as HTMLElement[]).forEach(background);
    (gsap.utils.toArray(".question-text") as HTMLElement[]).forEach(
      questionText
    );
    (gsap.utils.toArray(".question-mark-1") as HTMLElement[]).forEach(
      questionMark1
    );
    (gsap.utils.toArray(".question-mark-2") as HTMLElement[]).forEach(
      questionMark2
    );
    (gsap.utils.toArray(".question") as HTMLElement[]).forEach(question);
    (gsap.utils.toArray(".text-1") as HTMLElement[]).forEach(text1);
    (gsap.utils.toArray(".text-2") as HTMLElement[]).forEach(text2);
    (gsap.utils.toArray(".text-3") as HTMLElement[]).forEach(text3);
    (gsap.utils.toArray(".text-4") as HTMLElement[]).forEach(text4);
    (gsap.utils.toArray(".text-5") as HTMLElement[]).forEach(text5);
    (gsap.utils.toArray(".text-6") as HTMLElement[]).forEach(text6);
    (gsap.utils.toArray(".text-7") as HTMLElement[]).forEach(text7);
    (gsap.utils.toArray(".text-8 .from-top") as HTMLElement[]).forEach(
      text8FromTop
    );
    (gsap.utils.toArray(".text-8 .from-bottom") as HTMLElement[]).forEach(
      text8FromBottom
    );
    (gsap.utils.toArray(".text-8") as HTMLElement[]).forEach(text8);
    (gsap.utils.toArray(".text-9 .from-left") as HTMLElement[]).forEach(
      text9FromLeft
    );
    (gsap.utils.toArray(".text-9 .from-right") as HTMLElement[]).forEach(
      text9FromRight
    );
    (gsap.utils.toArray(".text-9") as HTMLElement[]).forEach(text9);
    (gsap.utils.toArray(".text-10 .zoom-out") as HTMLElement[]).forEach(
      text10ZoomOut
    );

    return () => {
      gsap.ticker.remove(update);
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <ReactLenis options={{ autoRaf: false }} ref={lenisRef} root>
      <section
        css={styles}
        className="section-about"
        id="motivacion"
        ref={slide1Ref}
      >

          <article className="slide slide-1">
          <div className="background" />
            <div className="content">
              <p className="question">
                <span className="question-mark-1">¿</span>
                <span className="question-text">Tenés motivación</span>
                <span className="question-mark-2">?</span>
              </p>
            </div>
          </article>
          <article className="slide slide-2">
            <div className="content">
              <div className="speech">
                <div className="centered-text">
                  <p className="text-1">Quiero darte este mensaje</p>
                </div>
              </div>
            </div>
          </article>
          <article className="slide slide-3">
            <div className="content">
              <div className="speech">
                <div className="sliding-text">
                  <p className="slider">
                    <span className="text-2">
                      La mayoría de las personas <i>esperan estar motivadas</i>{" "}
                      para comenzar a realizar <strong>actividad física</strong>
                      , pero...
                    </span>
                  </p>
                </div>
                <div className="centered-text">
                  <p className="text-3">
                    ¿Qué sucede <span>si esa</span> motivación no aparece?
                  </p>
                </div>
                <div className="centered-text">
                  <p className="text-4">
                    La única manera <span>de que la</span> motivación vuelva a
                    tu vida es{" "}
                    <strong>
                      <span>a través </span>
                      <span>de la Acción</span>
                    </strong>
                  </p>
                </div>
                <div className="centered-text">
                  <p className="text-5">
                    Cuanto más te <strong>muevas</strong> más <i>endorfinas</i>
                  </p>
                </div>
                <div className="centered-text">
                  <p className="text-6">Tendrás una perspectiva más postiva</p>
                </div>
                <div className="centered-text">
                  <p className="text-7">
                    Y cuando <i>menos lo esperes</i>, esa motivación{" "}
                    <strong>resurgirá</strong>
                  </p>
                </div>
                <div className="centered-text">
                  <p className="text-8">
                    <span className="from-top">
                      Pero no puedes pretender guiarte por la motivación,
                    </span>
                    <span className="from-bottom">
                      las ganas fluctúan <span>todo el</span> tiempo y{" "}
                      <span>duran poco</span>
                    </span>
                  </p>
                </div>
                <div className="centered-text">
                  <p className="text-9">
                    <span className="from-left">
                      ¡Una mente <strong>entrenada</strong> sabe
                    </span>
                    <span className="from-right">
                      que <i>disciplina</i> y <i>determinación</i>
                    </span>
                    <span className="from-left">son CLAVES para lograr</span>
                    <span className="from-right">
                      los resultados tan deseandos!
                    </span>
                  </p>
                </div>
                <div className="centered-text">
                  <p className="text-10">
                    <span className="zoom-out">
                      Yo tengo <br />
                      esas herramientas
                      <br /> para brindarte
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </article>
      </section>
    </ReactLenis>
  );
};

export default Motivation;
