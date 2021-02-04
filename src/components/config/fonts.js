// Font family
const light = 'Metropolis-Light';
const regular = 'Metropolis-Regular';
const medium = 'Metropolis-Medium';
const bold = 'Metropolis-SemiBold';

// Export font size
export const sizes = {
  base: 14,
  h1: 30,
  h2: 24,
  h3: 20,
  h4: 16,
  h5: 14,
  h6: 12,
};

// Export lineheights
export const lineHeights = {
  base: 20,
  h1: 43,
  h2: 33,
  h3: 28,
  h4: 23,
  h5: 20,
  h6: 17,
};

// Export font family
export default {
  light: {
    fontFamily: light,
  },
  regular: {
    fontFamily: regular,
  },

  medium: {
    fontFamily: medium,
  },

  bold: {
    fontFamily: bold,
    fontWeight: 'bold',
  },

  android: {
    regular: {
      fontFamily: 'Metropolis',
    },
    light: {
      fontFamily: 'Metropolis-Light',
    },
    condensed: {
      fontFamily: 'Metropolis',
    },
    condensed_light: {
      fontFamily: 'Metropolis',
      fontWeight: 'light',
    },
    black: {
      // note(brentvatne): sans-serif-black is only supported on Android 5+,
      // we can detect that here and use it in that case at some point.
      fontFamily: 'Metropolis',
      fontWeight: 'bold',
    },
    thin: {
      fontFamily: 'Metropolis-Thin',
    },
    medium: {
      fontFamily: 'Metropolis-Medium',
    },
    bold: {
      fontFamily: 'Metropolis',
      fontWeight: 'bold',
    },
  },
  default: {},
};
