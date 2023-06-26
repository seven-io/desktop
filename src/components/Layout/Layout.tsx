import {useTheme} from '@mui/material'
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Container from '@mui/material/Container';
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';
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

export const Layout = () => {
    console.log('Layout loaded...')
    const theme = useTheme()
    const apiKey = LocalStore.get('options.apiKey', '');
    const dispatch = useDispatch();
    const {t} = useTranslation();
    const [options, setOptions] = useState(LocalStore.get('options'));

    LocalStore.onDidChange('options', options => {
        options && setOptions(options);
    });

    useEffect(() => {
        if ('' === apiKey) {
            dispatch(addSnackbar(t('pleaseSetApiKey', {ns: 'translation'})));

            dispatch(setNav('options'));

            return;
        }
    }, []);

    const {backdrop, nav} = useSelector(({backdrop, nav}: RootState) => ({
        backdrop,
        nav
    }));

    return <>
        <TopNav/>

        <Backdrop open={backdrop}
                  onClick={() => dispatch(setBackdrop(false))}
        sx={{
            color: '#fff',
            zIndex: theme.zIndex.drawer + 1,
        }}
        >
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
}

