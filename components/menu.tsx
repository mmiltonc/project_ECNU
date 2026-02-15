"use client";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { desktop, fontSize2, space } from "@/styles/global";
import Image from "next/image";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { useEffect, useRef, useState } from "react";
import classNames from "classnames";

const styles = css`
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  z-index: 1010;
  pointer-events: none;
  transition: all 300ms ease;

  &.open {
    background: #051422dd;
    backdrop-filter: blur(2px);
  }

  ${desktop(css`
    display: none;
  `)}

  .trigger-area {
    height: 80px;
    background-color: var(--background-color);
    background: radial-gradient(
      circle at top right,

      #05142288 0px,
      #05142244 40px,
      #05142200 80px
    );

    .menu-trigger {
      position: absolute;
      top: 0;
      right: 0;
      width: ${space(10)};
      height: ${space(10)};
      padding: ${space(3)};
      cursor: pointer;
      pointer-events: initial;
      z-index: 1;

      .icon {
        width: 100%;
        height: 100%;
        position: relative;
        right: -3px;
        top: -2px;
      }
    }
  }

  .menu-wrapper {
    width: 100vw;
    height: 100svh;

    .menu-content {
      color: var(--background-color);
      pointer-events: initial;
      position: absolute;
      right: -100%;
      top: 0;
      width: 100vw;
      height: 100svh;
      transition: all 300ms ease;
      padding: ${space(3)};

      .menu-header {
        height: 30%;
        display: flex;
        align-items: center;
        justify-content: center;
        left: 6px;
        position: relative;

        .logo {
          mix-blend-mode: difference;
          width: 200px;
          left: -19px;
          position: relative;
        }
      }

      .navigation {
        ${fontSize2};
        height: 70%;
        align-items: center;
        display: flex;
        font-family: var(--font-jost);
        font-weight: 600;
        text-transform: uppercase;

        .link-list {
          display: flex;
          flex-direction: column;
          gap: ${space(1)};
          width: 100%;
          color: var(--white-color);

          .link-item {
            .link {
              display: block;
              padding: ${space(2)};
            }
          }
        }
      }
    }
  }

  &.open {
    .menu-content {
      right: 0;
    }
  }
`;

const Menu = () => {
  const [open, setOpen] = useState(false);
  const handleMenu = () => {
    setOpen((prev) => !prev);
  };

  const menuRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const menu = menuRef.current;
    const body = document.querySelector("body");
    const stopScrollPropagation = (e: Event) => e.stopPropagation();

    if (menu) {
      if (open) {
        body?.classList.add("modal-open");
        menu.addEventListener("wheel", stopScrollPropagation, {
          passive: false,
        });
        menu.addEventListener("touchmove", stopScrollPropagation, {
          passive: false,
        });
      } else {
        body?.classList.remove("modal-open");
        menu.removeEventListener("wheel", stopScrollPropagation);
        menu.removeEventListener("touchmove", stopScrollPropagation);
      }
    }

    return () => {
      if (menu) {
        menu.removeEventListener("wheel", stopScrollPropagation);
        menu.removeEventListener("touchmove", stopScrollPropagation);
      }
    };
  }, [open]);

  return (
    <nav
      ref={menuRef}
      css={styles}
      className={classNames("menu", { open })}
      suppressHydrationWarning
    >
      <div className="trigger-area">
        <button className="menu-trigger" onClick={handleMenu}>
          {!open && <MenuIcon className="icon" />}
          {open && <CloseIcon className="icon" />}
        </button>
      </div>
      <div className="menu-wrapper">
        <div className="menu-content">
          <div className="menu-header">
            <a href="/">
              <Image
                src="/images/hormiga.png"
                alt="ECNU Logo"
                className="logo"
                width={195}
                height={43}
              />
            </a>
          </div>
          <div className="navigation" onClick={() => setOpen(false)}>
            <ul className="link-list">
              <li className="link-item">
                <a href="#cambia-tu-vida" className="link">
                  Cambiá tu vida
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
                  ¿Quién soy?
                </a>
              </li>
              <li className="link-item">
                <a href="#preguntas-frecuentes" className="link">
                  FAQ
                </a>
              </li>
              <li className="link-item">
                <a href="#contacto" className="link">
                  Contacto
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Menu;
