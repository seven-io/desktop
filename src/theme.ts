import {createTheme,  ThemeOptions, colors} from '@mui/material'

const theme: ThemeOptions = {
    palette: {
        primary: {
            main: '#01c965',
        },
        secondary: {
            main: '#777777',
        },
        error: {
            main: colors.red.A400,
        },
        background: {
            default: '#fff',
        },
    },
};

export default createTheme(theme);
