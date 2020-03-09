import React from 'react';
import {useSelector} from 'react-redux';
import Container from '@material-ui/core/Container';

import {TopNav} from './TopNav';
import {Snackbars} from './Snackbars';
import {BottomNav} from './BottomNav';
import {RootState} from '../../store/reducers';
import {Options} from '../Options/Options';
import {Send} from '../Send/Send';
import {Contacts} from '../Contacts';
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
                    : 'contacts' === nav
                        ? <Contacts/>
                        : 'pricing' === nav
                            ? <Pricings/>
                            : <Lookup/>
            }
        </Container>

        <BottomNav/>
    </>;
};