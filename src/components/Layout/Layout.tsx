import React from 'react';
import Container from '@material-ui/core/Container';
import {useSelector} from 'react-redux';

import {RootState} from '../../store/reducers';
import {Options} from '../Options/Options';
import {Send} from '../Send/Send';
import {Documentation} from '../Documentation';
import {Snackbars} from './Snackbars';
import {BottomNav} from './BottomNav';
import {History} from '../History/History';
import {TopNav} from './TopNav';
import {Contacts} from '../Contacts/Contacts';
import {Pricings} from '../Pricing/Pricings';
import {Lookup} from '../Lookup/Lookup';

export const Layout = () => {
    const nav = useSelector((s: RootState) => s.nav);

    return <>
        <TopNav/>

        <Snackbars/>

        <Container component='main'>
            {
                'send' === nav
                    ? <Send/>
                    : 'options' === nav
                    ? <Options/>
                    : 'history' === nav
                        ? <History/>
                        : 'contacts' === nav
                            ? <Contacts/>
                            : 'pricing' === nav
                                ? <Pricings/>
                                : 'lookup' === nav
                                    ? <Lookup/>
                                    : <Documentation/>
            }
        </Container>

        <BottomNav/>
    </>;
};