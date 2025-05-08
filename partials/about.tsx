"use client";

/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import Image from "next/image";

const styles = css`
  /* padding: 160px 0 0; */
  position: relative;
  overflow: hidden;
  margin-top: 160px;
  margin-bottom: 400px;

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
    color: #fd5f44;
    font-family: var(--font-jost);
    text-transform: uppercase;
    font-weight: 900;
    font-size: 72px;
    line-height: 1;
    margin-bottom: 72px;

    i {
      font-style: normal;
      color: #87a7cb;
    }
  }

  .about-card {
    position: relative;
    padding: 60px 80px;

    background: linear-gradient(
      to right,
      #fd5f4433,
      #fd5f4411 20%,
      #7493b311 30%
    );

    box-shadow: 0 -1px 1px -1px #fd5f44, 0 -10px 30px 10px #ffffff05,
      0 1px 1px 0px #00000022, 0 10px 30px 10px #00000033;
    backdrop-filter: blur(6px);

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
      display: flex;
      gap: 48px;

      .about-image {
        .image {
          border-radius: 4px;
          overflow: hidden;
          height: 450px;
          width: auto;
          object-fit: contain;
        }
      }

      .about-bio {
        flex: 1;
        overflow: auto;
        display: flex;
        gap: 20px;
        flex-direction: column;

        .text {
          font-family: var(--font-jost);
          font-weight: 200;
          font-size: 24px;
          line-height: 1.2;
          margin: 0;
        }
      }
    }
  }
`;

const About = () => {
  return (
    <>
      <section css={styles} className="section-about" id="quien-soy">
        <div className="about-card">
          <h2 className="title">
            De la energía <i>al propósito</i>
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
                cuerpo saludable o esbelto. Para mí, es un canalizador
                fundamental de energía, tanto positiva como negativa, que nos
                permite transformar nuestras emociones y pensamientos en acción.
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
    </>
  );
};

export default About;
