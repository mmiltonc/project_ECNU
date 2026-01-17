"use client";
import {
  desktop,
  desktopLarge,
  fontSize1,
  fontSize2,
  fontSize3,
  space,
  tablet,
} from "@/styles/global";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

import { sendGTMEvent } from "@next/third-parties/google";

const styles = css`
  overflow: hidden;
  width: 100%;

  background-image: url(images/bgbw.jpg);
  background-position: bottom center;
  background-size: auto 120%;
  min-height: 800px;
  height: 100svh;
  position: relative;
  background-blend-mode: soft-light;
  background-color: #1e729822;

  ${tablet(css`
    height: 100vh;
    background-size: cover;
    background-position: bottom center;
  `)}

  .tint {
    backdrop-filter: brightness(60%);
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
  }

  .content {
    padding: 0 ${space(3)};
    position: relative;
    z-index: 0;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    height: 100%;

    ${desktop(css`
      padding: 280px ${space(10)} 0;
      display: block;
    `)}

    &:after {
      content: "";
      position: absolute;
      left: 0;
      bottom: 0;
      height: 70px;
      width: 100%;
      background: linear-gradient(to bottom, transparent, #051422);
      z-index: 1;
    }

    .title {
      ${fontSize1}
      font-family: var(--font-nunito-sans);
      font-weight: 900;
      color: #fd5f44;
      margin-bottom: ${space(10)};
      position: relative;
      display: inline-block;
      padding-top: ${space(6)};

      ${desktop(css`
        margin-bottom: ${space(8)};
        padding-top: 0;
      `)}

      span {
        display: block;

        ${desktop(css`
          display: inline-block;
        `)}
      }

      &:before {
        content: "";
        position: absolute;
        left: -100px;
        right: -100px;
        top: -30px;
        height: 300px;
        background-image: url(images/trazo.png);
        background-repeat: no-repeat;
        background-size: 100% 350px;
        background-position: bottom;
        opacity: 0.8;
        z-index: -1;

        ${desktop(css`
          height: 150px;
          top: 0;
          background-size: 100% 200px;
        `)}
      }
    }

    .subtitle {
      font-weight: 400;
      font-family: var(--font-nunito-sans);
      ${fontSize2};

      strong {
        font-weight: 800;
      }
    }

    .cta-box {
      height: 60%;
      display: flex;
      justify-content: center;
      align-items: center;

      .cta-button {
        ${fontSize3}
        font-family: var(--font-oswald);
        padding: ${space(2)} ${space(3)};
        border-radius: 10px;
        border: 2px solid #fd5f44;
        text-transform: uppercase;
        background-color: #fd5f44;
        display: block;
        box-shadow: 0 4px 5px rgba(0, 0, 0, 0.24),
          0 1px 10px rgba(0, 0, 0, 0.28), 0 2px 4px rgba(0, 0, 0, 0.24),
          0 -1px 3px rgba(0, 0, 0, 0.2);
        position: relative;
        z-index: 1001;
      }
    }
  }
`;

const Home = () => {
  return (
    <section css={styles} className="home-section" id="home">
      <div className="tint" />
      <div className="content">
        <h1 className="title">
          <span>EL CAMBIO</span> <span>NACE EN UNO</span>
        </h1>
        <h2 className="subtitle">
          <span className="show-mobile">
            Transformar en <strong>90</strong> días <br /> tu{" "}
            <strong>cuerpo</strong> y tu <strong>mente</strong> <br />
            acompañado de mi sistema <br /> de entrenamiento online.
          </span>
          <span className="show-desktop">
            Transformar en <strong>90</strong> días tu <strong>cuerpo</strong> y
            tu <strong>mente</strong> <br />
            acompañado de sistema de entrenamiento online.
          </span>
        </h2>
        <div className="cta-box">
          <a
            href="#gym-virtual"
            onClick={() =>
              sendGTMEvent({
                event: "buttonClicked",
                value: "quiero-mi-transformacion",
              })
            }
            className="cta-button"
          >
            Quiero mi transformación
          </a>
        </div>
      </div>
    </section>
  );
};

export default Home;
