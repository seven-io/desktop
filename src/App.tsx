import {LocalizationProvider} from '@mui/x-date-pickers-pro'
import React, {StrictMode} from 'react'
import { createRoot } from 'react-dom/client';
import CssBaseline from '@mui/material/CssBaseline'
import {ThemeProvider} from '@mui/material'
import {Provider} from 'react-redux';
import './i18n';
import {Layout} from './components/Layout/Layout';
import theme from './theme';
import {store} from './store';
import {AdapterDateFns} from '@mui/x-date-pickers/AdapterDateFns'

const container = document.getElementById('app')!
const root = createRoot(container)
const children = <Provider store={store}>
    <LocalizationProvider dateAdapter={AdapterDateFns}>
        <ThemeProvider theme={theme}>
            <CssBaseline enableColorScheme/>

            <Layout/>
        </ThemeProvider>
    </LocalizationProvider>
</Provider>

root.render(children);
