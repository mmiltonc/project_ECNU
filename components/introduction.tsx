"use client";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

const styles = css`
  padding: 80px 80px 0;
  background-image: radial-gradient(closest-side, #fd5f44, #051422) !important;
  position: relative;

  &:before {
    content: "";
    position: absolute;
    left: 0;
    top: -170px;
    height: 70px;
    width: 100%;
    background: linear-gradient(to bottom, transparent, #051422);
    z-index: 1;
  }

  .container {
    margin: 0 auto;
    width: 900px;
    height: 700px;
    display: flex;
    justify-content: center;
    flex-direction: column;

    .title {
      font-family: var(--font-nunito-sans);
      font-weight: 900;
      font-size: 40px;
      line-height: 1;
      margin-bottom: 24px;
    }

    .text {
      font-family: var(--font-jost);
      font-size: 24px;
      line-height: 1.2;
      margin-bottom: 24px;
    }
  }
`;

const Introduction = () => {
  return (
    <section
      css={styles}
      className="introduction-section"
    >
      <div className="container">
        <h2 className="title">
          ¿Por qué ECNU Online mejoraría mi vida?
        </h2>

        <p className="text">
          La falta de tiempo para trasladarte de tu casa a un gimnasio, ya sea
          por estudio, trabajo u otros motivos personales, ¿No te permite
          mantenerte constante en el entrenamiento? ¿No encontras una guía en tu
          nuevo camino?
        </p>
        <p className="text">
          Elegí entre mis desafíos o planificaciones online y da el paso que
          cambiara tu vida para siempre.
        </p>
      </div>
    </section>
  );
};

export default Introduction;
