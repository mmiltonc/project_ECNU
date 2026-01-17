import { SerializedStyles, css } from "@emotion/react";

export const mobile = (content: SerializedStyles) => css`
  @media only screen and (max-width: 768px) {
    ${content}
  }
`;

export const tablet = (content: SerializedStyles) => css`
  @media only screen and (min-width: 768px) {
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
  --font-base: 40px;
  font-size: var(--font-base);
  line-height: 1;

  ${tablet(
    css`
      font-size: calc(var(--font-base) * 1.2);
      line-height: 1;
    `
  )};

  ${desktop(
    css`
      font-size: calc(var(--font-base) * 1.5);
      line-height: 1;
    `
  )};

  ${desktopLarge(
    css`
      font-size: calc(var(--font-base) * 2);
      line-height: 1;
    `
  )};
`;

export const fontSize2 = css`
  --font-base: 28px;
  font-size: var(--font-base);
  line-height: 1;

  ${tablet(
    css`
      font-size: calc(var(--font-base) * 1.2);
      line-height: 1;
    `
  )};

  ${desktop(
    css`
      font-size: calc(var(--font-base) * 1.25);
      line-height: 1.2;
    `
  )};

  ${desktopLarge(
    css`
      font-size: calc(var(--font-base) * 1.5);
      line-height: 1.2;
    `
  )};
`;

export const fontSize3 = css`
  --font-base: 20px;
  font-size: var(--font-base);
  line-height: 1;

  ${tablet(
    css`
      font-size: calc(var(--font-base) * 1.1);
      line-height: 1;
    `
  )};

  ${desktop(
    css`
      font-size: calc(var(--font-base) * 1.2);
      line-height: 1.2;
    `
  )};

  ${desktopLarge(
    css`
      font-size: calc(var(--font-base) * 1.25);
      line-height: 1.2;
    `
  )};
`;

export const fontSize4 = css`
  --font-base: 16px;
  font-size: var(--font-base);
  line-height: 1.25;

  ${tablet(
    css`
      font-size: calc(var(--font-base) * 1.05);
      line-height: 1;
    `
  )};

  ${desktop(
    css`
      font-size: calc(var(--font-base) * 1.1);
      line-height: 1.25;
    `
  )};

  ${desktopLarge(
    css`
      font-size: calc(var(--font-base) * 1.25);
      line-height: 1.25;
    `
  )};
`;

export const fontSize5 = css`
  --font-base: 13px;
  font-size: var(--font-base);
  line-height: 1.25;

  ${desktop(
    css`
      font-size: calc(var(--font-base) * 1.1);
      line-height: 1.25;
    `
  )};

  ${desktopLarge(
    css`
      font-size: calc(var(--font-base) * 1.25);
      line-height: 1.25;
    `
  )};
`;

export const fontSize6 = css`
  --font-base: 10px;
  font-size: var(--font-base);
  line-height: 1.25;

  ${desktop(
    css`
      font-size: calc(var(--font-base) * 1.1);
      line-height: 1.25;
    `
  )};

  ${desktopLarge(
    css`
      font-size: calc(var(--font-base) * 1.25);
      line-height: 1.25;
    `
  )};
`;

export const space = (n = 1) => `${8 * n}px`;
