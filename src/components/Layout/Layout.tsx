import {hot} from 'react-hot-loader';
import React, {useEffect} from 'react';
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
import {Sms} from '../Sms/Sms';
import {Contacts} from '../Contacts';
import {Pricings} from '../Pricing/Pricings';
import {Lookup} from '../Lookup/Lookup';
import {addSnackbar, setBackdrop, setNav} from '../../store/actions';
import {Voice} from '../Voice/Voice';
import {LocalStore} from '../../util/LocalStore';
import {useTranslation} from 'react-i18next';

export const Layout = hot(module)(() => {
    const apiKey = LocalStore.get('options.apiKey', '');
    const dispatch = useDispatch();
    const {t} = useTranslation();

    useEffect(() => {
        if ('' === apiKey) {
            dispatch(addSnackbar(t('pleaseSetApiKey', {ns: 'translation'})));

            dispatch(setNav('options'));

            return;
        }
    }, []);

    const classes = makeStyles((theme: Theme) => createStyles({
        backdrop: {
            color: '#fff',
            zIndex: theme.zIndex.drawer + 1,
        },
    }))();

    const {backdrop, nav} = useSelector(({backdrop, nav}: RootState) => ({
        backdrop,
        nav
    }));

    return <>
        <TopNav/>

        <Backdrop className={classes.backdrop} open={backdrop}
                  onClick={() => dispatch(setBackdrop(false))}>
            <CircularProgress/>
        </Backdrop>

        <Snackbars/>

        <Container component='main'>
            {
                'sms' === nav
                    ? <Sms/>
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
});

