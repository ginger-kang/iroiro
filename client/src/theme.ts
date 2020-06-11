export const sizes: { [key: string ]: number } = {
    desktop: 922,
    phone: 420
};

export const lightTheme = {
    bgColor: '#ffffff',
    firstBgColor: 'linear-gradient(45deg, white, #f0f0f0)',
    secondBgColor: '#ff8d00',
    thirdBgColor: '#9198e5',
    contentBgColor: 'rgba(0,0,0,.88)',
    textColor: '#000000',
    toggleBorder: '#FFF',
    gradient: 'linear-gradient(#39598A, #79D7ED)',
}

export const darkTheme = {
    bgColor: '#060606',
    firstBgColor: '#060606',
    secondBgColor: '#060606',
    thirdBgColor: '#060606',
    contentBgColor: 'rgba(190,190,190,0.99)',
    textColor: '#FFFFFF',
    toggleBorder: '#6B8096',
    gradient: 'linear-gradient(#091236, #1E215D)',
}

export const theme = {
    lightTheme,
    darkTheme,
}

// export type Theme = typeof theme;
// export const styled = baseStyled as ThemedStyledInterface<Theme>;
export default theme;