import baseStyled, { css, CSSProp, ThemedStyledInterface } from 'styled-components';

const sizes: { [key: string ]: number } = {
    desktop: 922,
    phone: 420
};

const colors = {
    white: '#ffffff',
    black: '#000000',
};

const fontSizes: string[] = [];

const theme = {
    colors,
    fontSizes,
};

export type Theme = typeof theme;
export const styled = baseStyled as ThemedStyledInterface<Theme>;
export default theme;