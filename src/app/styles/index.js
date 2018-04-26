import isDesktop from '../utils/is-desktop';

export const fontFamily = 'Poppins';

export const color = {
    black: '#000000',
    white: '#ffffff',
    pink: '#E69BE6',
    blue: '#003278',
    yellow: '#FDDF06',
    red: '#ff0000',
    grey: '#9B9B9B',
    lightGrey: '#F7F7FA',
    blueOnYellowOpacity40: '#979933',
    whiteOnBlueOpacity70: '#b3c1d6',
    whiteOnBlueOpacity60: '#97abc7',
    darkPurple: '#4A4A4A',
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

export const input = {
    fontFamily,
    alignSelf: 'stretch',
    color: color.white,
    fontSize: 14,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    height: 45,
    borderColor: color.white,
    borderWidth: 1,
    borderRadius: 25,
    marginBottom: 10,
    marginLeft: 20,
    marginRight: 20,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10
};
