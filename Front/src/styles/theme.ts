import { extendTheme } from "native-base";

export const THEME = extendTheme({
    colors: {
        primary: {
            700: '#1B264F',
        },
        secondary: {
            700: '#274690'
        },
        green: {
            700: '#00875F',
            500: '#00B37E',
            300: '#04D361',
        },
        gray: {
            700: '#121214',
            600: '#202024',
            500: '#29292E',
            400: '#323238',
            300: '#7C7C8A',
            200: '#DDD',
            100: '#F3F3F5'
        },
        white: '#FFFFFF'
    },
    fonts: {

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