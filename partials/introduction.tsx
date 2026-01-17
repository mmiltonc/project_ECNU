"use client";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import {
  desktop,
  fontSize1,
  fontSize2,
  fontSize3,
  fontSize4,
  space,
} from "@/styles/global";
import { BrainIcon } from "@/components/icons/brain";
import { WeightsIcon } from "@/components/icons/weights";

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
    gap: ${space(6)};

    .title {
      ${fontSize2};
      font-family: var(--font-nunito-sans);
      font-weight: 900;
      line-height: 1;
    }

    .article {
      display: flex;
      align-items: flex-start;
      gap: ${space(3)};
      max-width: 900px;

      .icon {
        width: 56px;
        flex-shrink: 0;
      }
      .content {
        .subtitle {
          ${fontSize3};
          font-family: var(--font-nunito-sans);
          font-weight: 900;
          line-height: 1;
          margin-bottom: 24px;
        }

        .text {
          ${fontSize4};
          font-family: var(--font-jost);
          margin-bottom: 24px;
        }
      }
    }
  }
`;

const Introduction = () => {
  return (
    <section css={styles} className="introduction-section" id="cambia-tu-vida">
      <div className="container">
        <h2 className="title">¿Por qué ECNU Online mejoraría mi vida?</h2>

        <article className="article">
          <BrainIcon className="icon" />
          <div className="content">
            <h3 className="subtitle">Mentalidad Ecnu</h3>
            <p className="text">
              ¿Tus miedos te frenan o la falta de decisión te prohibe avanzar?
              Con mi sistema online vas a transformar esas dudas en tu fuerza
              interna para el cambio, modificar tu mentalidad es clave para
              lograr sustentarnos a mediano y largo plazo, y lograr los
              objetivos que estas buscando.
            </p>
          </div>
        </article>

        <article className="article">
          <WeightsIcon className="icon" />
          <div className="content">
            <h3 className="subtitle">Constancia</h3>
            <p className="text">
              ¿Sentis que sos una montaña rusa de motivación que sube y baja en
              el entrenamiento? Te voy a mostrar de que manera optimizar las
              semanas para que no sean una carga en tu vida, más bien un
              potenciador a la hora de ir en busca de tus objetivos. Elegí entre{" "}
              <strong>Gym virtual</strong> o <strong>Calistenia Online</strong>{" "}
              y da el paso que cambiara tu vida para siempre.
            </p>
          </div>
        </article>
      </div>
    </section>
  );
};

export default Introduction;
