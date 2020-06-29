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
  thirdBgColor: '#8eefff14',
  fourthBgColor: '#ffb0b014',
  compareBgColor:'#EFFBEF',
  modalBgColor: 'rgba(10,10,10,.95)',
  textColor: '#000000',
  toggleBorder: '#FFF',
  gradient: 'linear-gradient(#39598A, #79D7ED)',
  //borderColor: '#00000000', -> light에서 섹션 구분이 안됨
};

export const darkTheme = {
  bgColor: '#060606',
  pointColor: '#1549E8',
  hoverColor: '#EFEFEF',
  firstBgColor: '#060606',
  secondBgColor: '#060606',
  thirdBgColor: '#060606',
  fourthBgColor: '#060606',
  modalBgColor: 'rgba(190,190,190,0.99)',
  textColor: '#FFFFFF',
  toggleBorder: '#6B8096',
  gradient: 'linear-gradient(#091236, #1E215D)',
  borderColor: '#1549E8',
};

export const theme = {
  lightTheme,
  darkTheme,
};

// export type Theme = typeof theme;
// export const styled = baseStyled as ThemedStyledInterface<Theme>;
export default theme;
