import React from 'react';
import {render} from 'react-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import {ThemeProvider} from '@material-ui/core/styles';
import {Provider} from 'react-redux';
import {MuiPickersUtilsProvider} from '@material-ui/pickers';
import enLocale from 'date-fns/locale/en-US';
import DateFnsUtils from '@date-io/date-fns';
import './i18n';
import {Layout} from './components/Layout/Layout';
import theme from './theme';
import {store} from './store';

render(<Provider store={store}>
    <ThemeProvider theme={theme}>
        <CssBaseline/>

        <MuiPickersUtilsProvider locale={enLocale} utils={DateFnsUtils}>
            <Layout/>
        </MuiPickersUtilsProvider>
    </ThemeProvider>
</Provider>, document.getElementById('app'));