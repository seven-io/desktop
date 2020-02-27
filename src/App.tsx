import React from 'react';
import ReactDOM from 'react-dom';
import {AppContainer} from 'react-hot-loader';
import CssBaseline from '@material-ui/core/CssBaseline';
import {ThemeProvider} from '@material-ui/core/styles';
import {Provider} from 'react-redux';
import os from 'os';
console.log(os.arch()) // x64
console.log(os.cpus()) // [{model: string, speed: number, times: {user: number, nice: number, sys: number, idle: number, irq: number}}]
console.log(os.endianness()) // LE
console.log(os.freemem()) // number
console.log(os.homedir()) // /home/aim
console.log(os.hostname()) // aim-lap-hp
console.log(os.loadavg()) // [float, float, float]
console.log(os.platform()) // linux
console.log(os.release()) // 5.3.0-40-generic
console.log(os.networkInterfaces()) // [...]
console.log(os.tmpdir()) // /tmp
console.log(os.totalmem()) // number
console.log(os.type()) // Linux
console.log(os.uptime()) // number
console.log(os.userInfo()) // {uid: 1000, gid: 1000, username: "aim", homedir: "/home/aim", shell: "/bin/bash"}

import './i18n'
import {Layout} from './components/Layout';
import theme from './theme';
import {store} from './store';

ReactDOM.render(
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