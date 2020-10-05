export const sizes: { [key: string]: number } = {
  desktop: 922,
  phone: 420,
};

export const lightTheme = {
  bgColor: '#ffffff',
  pointColor: '#1549E8',
  hoverColor: '#EFEFEF',
  firstBgColor: '#ffffff',
  secondBgColor: '#feffbd12',
  thirdBgColor: '#ffffff',
  fourthBgColor: '#e0e0e026',
  fifthBgColor: '#ffffff',
  modalBgColor: 'rgba(10,10,10,.95)',
  textColor: '#000000',
  toggleBorder: '#FFF',
  gradient: 'linear-gradient(#39598A, #79D7ED)',
  borderColor: '#00000000',
  styleNavColor: '#ffffff',
  linkHoverBorderColor: 'rgba(0,0,0,.5)',
  imageHoverColor: '#dadada',
  modalOutsideColor: 'rgba(0,0,0,.7)',
};

export const darkTheme = {
  bgColor: '#292a2d',
  pointColor: '#1549E8',
  hoverColor: '#EFEFEF',
  firstBgColor: '#292a2d',
  secondBgColor: '#292a2d',
  thirdBgColor: '#292a2d',
  fourthBgColor: '#292a2d',
  fifthBgColor: '#292a2d',
  modalBgColor: 'rgba(190,190,190,0.99)',
  textColor: '#FFFFFF',
  toggleBorder: '#6B8096',
  gradient: 'linear-gradient(#091236, #1E215D)',
  borderColor: '#1549E8',
  styleNavColor: '#292a2d',
  linkHoverBorderColor: '#fefefe',
  imageHoverColor: '#EFEFEF',
  modalOutsideColor: 'rgba(0,0,0,.1)',
};

export const theme = {
  lightTheme,
  darkTheme,
};

// export type Theme = typeof theme;
// export const styled = baseStyled as ThemedStyledInterface<Theme>;
export default theme;
