import { SerializedStyles, css } from "@emotion/react";

export const mobile = (content: SerializedStyles) => css`
  @media only screen and (max-width: 768px) {
    ${content}
  }
`;

export const tablet = (content: SerializedStyles) => css`
  @media only screen and (max-width: 1024px) {
    ${content}
  }
`;

export const desktop = (content: SerializedStyles) => css`
  @media only screen and (min-width: 1025px) {
    ${content}
  }
`;

export const desktopLarge = (content: SerializedStyles) => css`
  @media only screen and (min-width: 1440px) {
    ${content}
  }
`;

export const fontSize1 = css`
  font-size: 40px;
  line-height: 1;

  ${desktop(
    css`
      font-size: 80px;
      line-height: 1;
    `
  )};
`;

export const fontSize2 = css`
  font-size: 24px;
  line-height: 1;

  ${desktop(
    css`
      font-size: 30px;
      line-height: 1.2;
    `
  )};
`;

export const fontSize3 = css`
  font-size: 20px;
  line-height: 1;

  ${desktop(
    css`
      font-size: 24px;
      line-height: 1.2;
    `
  )};
`;

export const space = (n = 1) => `${8 * n}px`