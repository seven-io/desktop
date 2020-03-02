import React from 'react';
import {render} from 'react-dom';
import {AppContainer} from 'react-hot-loader';
import CssBaseline from '@material-ui/core/CssBaseline';
import {ThemeProvider} from '@material-ui/core/styles';
import {Provider} from 'react-redux';

import './i18n';
import {Layout} from './components/Layout/Layout';
import theme from './theme';
import {store} from './store';

render(
    <Provider store={store}>
        <ThemeProvider theme={theme}>
            <CssBaseline/>

            <AppContainer>
                <Layout/>
            </AppContainer>
        </ThemeProvider>
    </Provider>,
    document.getElementById('app')
);