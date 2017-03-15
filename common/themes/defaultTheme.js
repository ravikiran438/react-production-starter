import openColor from './openColor'

// www.smashingmagazine.com/2015/11/using-system-ui-fonts-practical-guide/
// Taken from from Bootstrap 4.
export const nativeFontFamily = [
  '-apple-system',
  'system-ui',
  'BlinkMacSystemFont',
  '"Segoe UI"', // Segoe UI looks good but is not perfectly vertically aligned in Windows shit.
  'Roboto',
  '"Helvetica Neue"',
  'Arial',
  'sans-serif'
].join(', ')

const theme = {
  colors: {
    primary: openColor.blue6,
    success: openColor.green9,
    warning: openColor.orange6,
    danger: openColor.red6,
    black: openColor.gray8,
    white: openColor.white,
    gray: openColor.gray5,
    red: openColor.red3,
    open: openColor,
    toolbar: '#DCDCDC',
    ratingStars: '#9A9A9A',
    navBorders: '#ddd',
    borders2: '#efeff0',
    cta1: '#8C060B',
    ctaTextLink1: '#c62332',
    v2Orange: '#F7A01E',
    v2Orange2: '#d15e28',
    linkBlue: '#337ab7',
    v2proGreen: '#8cc449',
    icon: '#595959',
    brandTabBorders: '#b9b9b9',
    trueBlack: '#000',
    forestGreen: '#008000'
  },
  states: {
    active: {
      darken: 0.2,
      opacity: 0.7
    },
    disabled: {
      opacity: 0.5
    }
  },
  container: {
    maxWidths: {
      small: 540,
      medium: 720,
      big: 960,
      bigger: 1140,
      biggest: 1440,
      fullWidth: '100%'
    }
  },
  text: {
    base: {
      fontFamily: `'Gibson Light', ${nativeFontFamily}`,
      fontSize: '1rem',
      fontWeight: 'normal',
      fontStyle: 'normal',
      lineHeight: 1.5
    },
    small: {
      fontSize: '80%'
    }
  },
  block: {
    marginBottom: 1,
    maxWidth: 21
  },
  button: {
    borderRadius: 2
  },
  heading: {
    marginBottom: '.5rem',
    fontFamily: `'Corisande Regular', ${nativeFontFamily}`,
    fontWeight: 'normal',
    fontStyle: 'normal',
    lineHeight: 1.1,
    color: 'inherit'
  },
  paragraph: {
    marginBottom: 1
  }
}

export default theme
