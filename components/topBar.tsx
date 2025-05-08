"use client";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import Image from "next/image";

const styles = css`
    height: 91px;
    padding: 24px 80px;
    background-color: #051422bb;
    backdrop-filter: blur(5px);
    position: fixed;
    width: 100%;
    top: 0;
    z-index: 1000;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #ffffff0c;

    .navigation {
      .link-list {
        display: flex;
        align-items: center;
        .link-item {
          .link {
            font-family: var(--font-oswald);
            text-transform: uppercase;
            font-size: 20px;

            &:hover {
              color: #FD5F44;
            }
          }

          & + .link-item {
              :before {
                content: '•';
                display: inline-block;
                margin-left: 10px;
                margin-right: 10px;
                font-size: 30px;
                line-height: 0%;
              }
            }
        }
      }
    }

    .logo {
        height: 100%;
        object-fit: contain;
        transform: translateX(-40px);
    }
`;

const TopBar = () => {
  return (
    <nav css={styles} className="topbar">
      <a href="/">
      <Image src="/images/hormiga.png" alt="ECNU Logo" className="logo" width={195} height={43} />
      </a>
      <div className="navigation">
        <ul className="link-list">
          <li className="link-item">
            <a href="#cambia-tu-vida" className="link">Cambiá tu vida</a>
          </li>
          <li className="link-item">
            <a href="#gym-virtual" className="link">Gym Virtual</a>
          </li>
          <li className="link-item">
            <a href="#calistenia-online" className="link">Calistenia Online</a>
          </li>
          <li className="link-item">
            <a href="#cambios-visibles" className="link">Testimonios</a>
          </li>
          <li className="link-item">
            <a href="#quien-soy" className="link">¿Quién soy?</a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default TopBar;
