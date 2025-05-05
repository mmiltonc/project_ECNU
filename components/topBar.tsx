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

    .logo {
        height: 100%;
        object-fit: contain;
        transform: translateX(-40px);
    }
`;

const TopBar = () => {
  return (
    <nav css={styles} className="topbar">
      <Image src="/images/hormiga.png" alt="ECNU Logo" className="logo" width={195} height={43} />
    </nav>
  );
};

export default TopBar;
