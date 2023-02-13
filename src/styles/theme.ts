import { extendTheme } from 'native-base';

export const THEME = extendTheme({
  colors: {
    primary: {
      700: '#569FB6'
    },
    secondary: {
      700: '#E8F3F5'
    },
    blue: {
      700: '#D2E1E4',
      500: '#C1E1F9',
      300: '#68C5D2',
    },
    green: {
      700: '#B1E0B5',
      500: '#4AD347',
      300: '#54D552',
    },
    gray: {
      700: '#121214',
      600: '#202024',
      500: '#29292E',
      400: '#323238',
      300: '#7C7C8A',
      200: '#C4C4CC',
      100: '#E1E1E6'
    },
    white: '#FFFFFF'
  },
  fonts: {
    heading: 'Roboto_700Bold',
    body: 'Roboto_400Regular',
  },
  fontSizes: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 20,
  },
  sizes: {
    14: 56
  }
});