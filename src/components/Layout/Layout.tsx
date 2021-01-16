import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Container from '@material-ui/core/Container';
import CircularProgress from '@material-ui/core/CircularProgress';
import {Backdrop, createStyles, Theme} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';

import {TopNav} from './TopNav';
import {Snackbars} from './Snackbars';
import {BottomNav} from './BottomNav';
import {RootState} from '../../store/reducers';
import {Options} from '../Options/Options';
import {Send} from '../Send/Send';
import {Contacts} from '../Contacts';
import {Pricings} from '../Pricing/Pricings';
import {Lookup} from '../Lookup/Lookup';
import {setBackdrop} from '../../store/actions';
import {Voice} from '../Voice/Voice';

export const Layout = () => {
    const dispatch = useDispatch();

    const classes = makeStyles((theme: Theme) => createStyles({
        backdrop: {
            color: '#fff',
            zIndex: theme.zIndex.drawer + 1,
        },
    }))();

    const {backdrop, nav} = useSelector(({backdrop, nav}: RootState) => ({backdrop, nav}));

    return <>
        <TopNav/>

        <Backdrop className={classes.backdrop} open={backdrop} onClick={() => dispatch(setBackdrop(false))}>
            <CircularProgress/>
        </Backdrop>

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
                            : 'voice' === nav
                                ? <Voice/>
                                : <Lookup/>
            }
        </Container>

        <BottomNav/>
    </>;
};