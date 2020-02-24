import React from 'react';
import Container from '@material-ui/core/Container';
import {useDispatch, useSelector} from 'react-redux';

import {Options} from './Options';
import {Send} from './Send';
import {Support} from './Support';
import {Snackbars} from './Snackbars';
import {BottomNav} from './BottomNav';
import {TopNav} from './TopNav';
import {setNav} from '../store/actions';

export const Layout = () => {
    const nav = useSelector((s: any) => s.nav);

    const dispatch = useDispatch();

    return <>
        <TopNav/>

        <Container>
            <Snackbars/>

            <main>
                {0 === nav ? <Send/> : 1 === nav ? <Options/> : <Support/>}
            </main>
        </Container>

        <BottomNav onChange={newNav => dispatch(setNav(newNav))}/>
    </>;
};