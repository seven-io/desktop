import {red} from '@material-ui/core/colors';
import {createMuiTheme} from '@material-ui/core/styles';

const theme = {
    palette: {
        primary: {
            main: '#01c965',
        },
        secondary: {
            main: '#777777',
        },
        error: {
            main: red.A400,
        },
        background: {
            default: '#fff',
        },
    },
};

export default createMuiTheme(theme);
