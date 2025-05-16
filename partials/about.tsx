"use client";

import {
  desktop,
  fontSize1,
  fontSize2,
  fontSize3,
  space,
} from "@/styles/global";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import Image from "next/image";

const styles = css`
  position: relative;
  overflow: hidden;

  ${desktop(css`
    margin-top: 160px;
  `)}

  .anchor {
    position: absolute;
    top: -130px;
  }

  &:after,
  &:before {
    animation-duration: 10s;
    animation-fill-mode: forwards;
    animation-timing-function: linear;
    animation-iteration-count: infinite;
    background-image: url(images/hormiga-arriba.png);
    background-position: center;
    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;
    content: "";
    height: 300px;
    left: 0;
    mix-blend-mode: soft-light;
    opacity: 0.3;
    position: absolute;
    top: 0;
    width: 300px;
    z-index: -1;
  }

  &:after {
    animation-name: ant-1;
    animation-duration: 18s;
    /* transform: rotateZ(-50deg) translateY(410%) translateX(440px); */
  }

  &:before {
    animation-name: ant-2;
    /* transform: rotateZ(50deg) translateY(30px) translateX(970px); */
  }

  .title {
    ${fontSize2};
    color: #fd5f44;
    font-family: var(--font-jost);
    text-transform: uppercase;
    font-weight: 900;
    margin-bottom: 72px;

    ${desktop(css`
      ${fontSize1};

      span {
        display: inline-block;
      }
    `)}

    span {
      display: block;

      ${desktop(css`
        display: inline-block;
      `)}
    }

    i {
      font-style: normal;
      color: #87a7cb;
    }
  }

  .about-card {
    position: relative;
    padding: ${space(6)} ${space(3)};

    background: linear-gradient(
      to right,
      #fd5f4433,
      #fd5f4411 20%,
      #7493b311 30%
    );

    box-shadow: 0 -1px 1px -1px #fd5f44, 0 -10px 30px 10px #ffffff05,
      0 1px 1px 0px #00000022, 0 10px 30px 10px #00000033;
    backdrop-filter: blur(6px);

    ${desktop(css`
      padding: 60px 80px;
    `)}

    &:before {
      height: 1px;
      background: linear-gradient(
        to right,
        #ffffff00 40%,
        #ffffff88 90%,
        #ffffff55
      );
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
    }

    .about-info {
      display: block;

      ${desktop(css`
        display: flex;
        gap: 48px;
      `)}

      .about-image {
        .image {
          border-radius: 4px;
          overflow: hidden;
          width: auto;
          object-fit: contain;
          margin-bottom: ${space(3)};

          ${desktop(css`
            margin-bottom: 0;
            height: 450px;
          `)}
        }
      }

      .about-bio {
        flex: 1;
        display: flex;
        gap: 20px;
        flex-direction: column;

        .text {
          ${fontSize3};
          font-family: var(--font-jost);
          font-weight: 200;
          margin: 0;
        }
      }
    }
  }

  @keyframes ant-1 {
    from {
      transform: rotateZ(-50deg) translateY(2000px) translateX(740px);
    }
    to {
      transform: rotateZ(-50deg) translateY(-2500px) translateX(440px);
    }
  }

  @keyframes ant-2 {
    from {
      transform: rotateZ(50deg) translateY(1000px) translateX(970px);
    }
    to {
      transform: rotateZ(50deg) translateY(-2000px) translateX(970px);
    }
  }
`;

const About = () => {
  return (
    <section css={styles} className="section-about">
      <div className="anchor" id="quien-soy" />
      <div className="about-card">
        <h2 className="title">
          De la energía{" "}
          <span>
            <i>al propósito</i>
          </span>
        </h2>
        <div className="about-info">
          <div className="about-image">
            <Image
              width={628}
              height={1118}
              src="/images/truck_flag.jpg"
              alt="lucas antes"
              className="image"
            />
          </div>
          <div className="about-bio">
            <p className="text">
              Hola, soy Lucas Pallotta, atleta e instructor de calistenia de
              alto rendimiento.
            </p>
            <p className="text">
              A lo largo de los años, he desarrollado herramientas para el
              control y la armonización de la mente y el cuerpo. Mi principal
              don es la disciplina, y me apasiona ayudar a quienes están
              dispuestos a permitirme influenciar en sus vidas.
            </p>
            <p className="text">
              La actividad física va mucho más allá de simplemente alcanzar un
              cuerpo saludable o esbelto. Para mí, es un canalizador fundamental
              de energía, tanto positiva como negativa, que nos permite
              transformar nuestras emociones y pensamientos en acción.
            </p>
            <p className="text">
              A través del ejercicio, no sólo fortalecemos nuestros músculos,
              también cultivamos nuestro autoestima y desarrollamos la
              perseverancia necesaria para alcanzar nuestros sueños.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
