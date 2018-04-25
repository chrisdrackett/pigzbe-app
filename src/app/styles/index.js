import isDesktop from '../utils/is-desktop';

export const fontFamily = 'Poppins';

export const color = {
    black: '#000000',
    white: '#ffffff',
    pink: '#E69BE6',
    blue: '#003278',
    yellow: '#FDDF06',
    red: '#ff0000',
    blueOnYellowOpacity40: '#979933',
    whiteOnBlueOpacity70: '#b3c1d6',
    whiteOnBlueOpacity60: '#97abc7'
};

export const paddingTop = isDesktop ? 0 : 20;

export const container = {
    alignSelf: 'stretch',
    flex: 1,
    backgroundColor: color.blue,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop
};
