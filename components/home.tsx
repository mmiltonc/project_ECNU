"use client";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

import { sendGTMEvent } from "@next/third-parties/google";

const styles = css`
  padding: 280px 80px 0;
  background-image: url(images/bgbw.jpeg);
  background-position: top -100px center;
  background-size: cover;
  height: 800px;
  position: relative;
  background-blend-mode: soft-light;
  background-color: #1e729822;
  margin-bottom: 100px;

  .tint {
    backdrop-filter: brightness(60%);
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
  }

  .content {
    position: relative;
    z-index: 0;

    .title {
      font-family: var(--font-nunito-sans);
      font-weight: 900;
      color: #fd5f44;
      font-size: 80px;
      line-height: 1;
      margin-bottom: 64px;
      position: relative;
      display: inline-block;

      &:before {
        content: "";
        position: absolute;
        left: -100px;
        right: -100px;
        top: 10px;
        height: 150px;
        background-image: url(images/trazo.png);
        background-repeat: no-repeat;
        background-size: 100% 200px;
        background-position: bottom;
        opacity: 0.8;
        z-index: -1;
      }
    }
    .subtitle {
      font-weight: 600;
      font-family: var(--font-nunito-sans);
      font-size: 30px;
      line-height: 1.2;
    }
    .cta-button {
      font-family: var(--font-oswald);
      font-size: 20px;
      padding: 10px 24px;
      border-radius: 10px;
      border: 2px solid #fd5f44;
      text-transform: uppercase;
      background-color: #fd5f44;
      margin: 120px auto 0;
      display: block;
      box-shadow: 0 4px 5px rgba(0, 0, 0, 0.24), 0 1px 10px rgba(0, 0, 0, 0.28),
        0 2px 4px rgba(0, 0, 0, 0.24), 0 -1px 3px rgba(0, 0, 0, 0.2);
    }
  }
`;

const Home = () => {
  return (
    <section css={styles} className="home-section" id="home">
      <div className="tint" />
      <div className="content">
        <h1 className="title">EL CAMBIO NACE EN UNO</h1>
        <h2 className="subtitle">
          Comenzá a transformar en <strong>90</strong> días <br />
          tu <strong>cuerpo</strong> y tu <strong>mente</strong> con mi sistema
          de <br /> entrenamiento online.
        </h2>
        <button
          className="cta-button transition-transform duration-300 hover:scale-110"
          onClick={() => sendGTMEvent({ event: "buttonClicked", value: "xyz" })}
        >
          <a
            href="#clasesyretos"
            className="transition ease-in-out duration-350"
          >
            Quiero mi transformación
          </a>
        </button>
      </div>
    </section>
  );
};

export default Home;
