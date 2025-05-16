"use client";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import {
  desktop,
  fontSize1,
  fontSize2,
  fontSize3,
  space,
} from "@/styles/global";

const styles = css`
  overflow-x: hidden;
  width: 100%;
  padding: 0 ${space(3)};
  background-image: radial-gradient(closest-side, #fd5f44, #051422) !important;
  position: relative;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;

  ${desktop(css`
    padding: ${space(0)} ${space(10)} 0;
  `)}

  .container {
    height: 700px;
    display: flex;
    justify-content: center;
    flex-direction: column;

    .title {
      ${fontSize2};
      font-family: var(--font-nunito-sans);
      font-weight: 900;
      line-height: 1;
      margin-bottom: 24px;
    }

    .text {
      ${fontSize3};
      font-family: var(--font-jost);
      margin-bottom: 24px;

      &:last-of-type {
        margin-bottom: 0;
      }
    }
  }
`;

const Introduction = () => {
  return (
    <section css={styles} className="introduction-section" id="cambia-tu-vida">
      <div className="container">
        <h2 className="title">¿Por qué ECNU Online mejoraría mi vida?</h2>

        <p className="text">
          La falta de tiempo para trasladarte de tu casa a un gimnasio, ya sea
          por estudio, trabajo u otros motivos personales, ¿No te permite
          mantenerte constante en el entrenamiento? ¿No encontras una guía en tu
          nuevo camino?
        </p>
        <p className="text">
          Elegí entre <strong>Gym Virtual</strong> o{" "}
          <strong>Calistenia Online</strong> y da el paso que cambiará tu vida
          para siempre.
        </p>
      </div>
    </section>
  );
};

export default Introduction;
