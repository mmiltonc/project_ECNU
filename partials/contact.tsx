"use client";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React from "react";
import Image from "next/image";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import InstagramIcon from "@mui/icons-material/Instagram";
import {
  desktop,
  fontSize2,
  fontSize3,
  fontSize4,
  fontSize5,
  fontSize6,
  space,
} from "@/styles/global";
import { TikTokIcon } from "@/components/icons/tiktok";

const styles = css`
  padding: ${space(6)} ${space(3)} ${space(3)};
  display: flex;
  flex-direction: column;

  ${desktop(css`
    padding: ${space(10)};
  `)}

  .footer-top {
    display: flex;
    gap: ${space(2)};
    flex-direction: column;
    padding-bottom: ${space(2)};

    ${desktop(css`
      flex-direction: row;
    `)}

    .footer-left {
      width: 100%;
      .contact-me {
        margin-bottom: ${space(3)};

        .title {
          ${fontSize2};
          font-family: var(--font-jost);
          margin-bottom: ${space(2)};
        }

        .subtitle {
          ${fontSize6};
          text-transform: uppercase;
          font-weight: 600;
          display: block;
          font-family: var(--font-jost);
          color: var(--secondary-color);
          margin-bottom: ${space(1)};
        }

        .contact-button {
          ${fontSize5};
          font-family: var(--font-nunito-sans);
          font-weight: 400;
          width: max-content;
          display: inline-block;
          color: var(--background-color);
          padding: ${space(1)} ${space(2)};
          border-radius: ${space(3)};
          border: 1px solid var(--white-color);
          background-color: var(--white-color);
          transition: all 200ms ease;

          &:hover {
            box-shadow: 0 0 10px 10px #ffffff11;
          }

          &.secondary {
            background-color: transparent;
            border-color: var(--white-color);
            font-weight: 600;
            color: var(--white-color);
          }
        }
      }
    }

    .footer-right {
      width: 100%;

      .links {
        ${fontSize5};
        font-family: var(--font-nunito-sans);

        .link-list {
          display: flex;
          flex-direction: column;
          gap: ${space(1)};

          ${desktop(css`
            gap: ${space(0.5)};
          `)}

          .link-item {
            width: max-content;
            position: relative;

            &:before {
              content: "▸";
              display: none;
              position: absolute;
              left: -${space(2)};
            }

            &:hover {
              &:before {
                display: block;
              }
            }
          }
        }

        .subtitle {
          ${fontSize6};
          text-transform: uppercase;
          font-weight: 600;
          display: block;
          font-family: var(--font-jost);
          color: var(--secondary-color);
          margin-bottom: ${space(1)};
        }
      }
    }
  }

  .separator {
    opacity: 0.1;
  }

  .footer-bottom {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: ${space(1)};
    padding-top: ${space(2)};

    .copyright {
      ${fontSize6};
    }

    .social-links {
      display: flex;
      justify-content: flex-end;
      align-items: flex-end;
      position: relative;
      left: ${space(1)};

      .social {
        display: flex;
        align-items: top;
        color: var(--white-color);
        padding: ${space(1)};

        .icon {
          width: 24px;
          height: 24px;
        }

        &:hover {
          transform: scale(1.1);
        }

        img {
          padding: 2px;
          width: 100%;
          height: 100%;
          object-fit: contain;
        }
      }
    }
  }
`;

const Contact = () => {
  const whatsappNumber = "5491167837231";
  const whatsappText = encodeURI(
    "Hola Lucas, estuve viendo el sitio y tengo algunas dudas. ¿Podés ayudarme?"
  );
  return (
    <footer css={styles} className="contact" id="contacto">
      <div className="footer-top">
        <div className="footer-left">
          <div className="contact-me">
            <small className="subtitle">Contactame</small>
            <h2 className="title">¿Tenés más dudas?</h2>
            <a
              className="contact-button"
              target="_blank"
              rel="noopener noreferrer"
              href={`https://wa.me/${whatsappNumber}?text=${whatsappText}`}
            >
              Enviame un mensaje
            </a>
          </div>
          <div className="contact-me">
            <small className="subtitle">o escribime un e-mail a</small>
            <a
              className="contact-button secondary"
              target="_blank"
              rel="noopener noreferrer"
              href="mailto:hola@ecnuteam.com"
            >
              hola@ecnuteam.com
            </a>
          </div>
        </div>
        <div className="footer-right">
          <div className="links">
            <small className="subtitle">Links</small>
            <ul className="link-list">
              <li className="link-item">
                <a href="#cambia-tu-vida" className="link">
                  Presentación
                </a>
              </li>
              <li className="link-item">
                <a href="#gym-virtual" className="link">
                  Gym Virtual
                </a>
              </li>
              <li className="link-item">
                <a href="#calistenia-online" className="link">
                  Calistenia Online
                </a>
              </li>
              <li className="link-item">
                <a href="#cambios-visibles" className="link">
                  Testimonios
                </a>
              </li>
              <li className="link-item">
                <a href="#quien-soy" className="link">
                  Acerca de mí
                </a>
              </li>
              <li className="link-item">
                <a href="#preguntas-frecuentes" className="link">
                  Preguntas Frecuentes
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <hr className="separator" />
      <div className="footer-bottom">
        <div className="copyright">
          <p>
            © 2025 Lucas Pallotta – ECNU Team. Todos los derechos reservados.
          </p>
        </div>
        <div className="social-links">
          <a
            href={`https://wa.me/${whatsappNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            className="social whatsapp"
          >
            <WhatsAppIcon className="icon" />
          </a>
          <a
            href="https://www.instagram.com/elcambionaceenuno"
            target="_blank"
            rel="noopener noreferrer"
            className="social instagram"
          >
            <InstagramIcon className="icon" />
          </a>
          <a
            href="https://www.tiktok.com/@lucasc.pallotta"
            target="_blank"
            rel="noopener noreferrer"
            className="social tiktok"
          >
            <TikTokIcon className="icon" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Contact;
