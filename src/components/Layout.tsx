import React from 'react';
import Container from '@material-ui/core/Container';
import {useSelector} from 'react-redux';

import {Options} from './Options';
import {Send} from './Send';
import {Documentation} from './Documentation';
import {Snackbars} from './Snackbars';
import {BottomNav} from './BottomNav';
import {History} from './History';
import {TopNav} from './TopNav';
import {RootState} from '../store/reducers';
import {Contacts} from './Contacts';

export type Route = 'send' | 'options' | 'history' | 'docs' | 'contacts'

export const Layout = () => {
    const nav = useSelector((s: RootState) => s.nav);

    return <>
        <TopNav/>

        <Container>
            <Snackbars/>

            <main>
                {
                    'send' === nav
                        ? <Send/>
                        : 'options' === nav
                            ? <Options/>
                            : 'history' === nav
                                ? <History/>
                                : 'contacts' === nav
                                ? <Contacts />
                                :  <Documentation/>
                }
            </main>
        </Container>

        <BottomNav/>
    </>;
};