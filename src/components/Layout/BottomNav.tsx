import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import SettingsIcon from '@material-ui/icons/Settings';
import SmsIcon from '@material-ui/icons/Sms';
import {useTranslation} from 'react-i18next';
import {useDispatch, useSelector} from 'react-redux';
import HistoryIcon from '@material-ui/icons/History';
import ContactsIcon from '@material-ui/icons/Contacts';
import LocalAtmIcon from '@material-ui/icons/LocalAtm';

import {setNav} from '../../store/actions';
import {Route} from '../../store/reducers/nav';
import {RootState} from '../../store/reducers';

export const BottomNav = () => {
    const navId = useSelector((state: RootState) => state.nav);
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const classes = makeStyles({
        bottomNavigation: {
            bottom: 0,
            justifyContent: 'space-evenly',
            position: 'fixed',
            width: '100%',
        },
    })();

    return <BottomNavigation
        className={classes.bottomNavigation}
        onChange={(e: any, newNavId: Route) => dispatch(setNav(newNavId))}
        showLabels
        value={navId}
    >
        <BottomNavigationAction label={t('SMS')} value='send' icon={<SmsIcon/>}/>

        <BottomNavigationAction label={t('options')} value='options' icon={<SettingsIcon/>}/>

        <BottomNavigationAction label={t('history')} value='history' icon={<HistoryIcon/>}/>

        <BottomNavigationAction label={t('contacts')} value='contacts' icon={<ContactsIcon/>}/>

        <BottomNavigationAction label={t('pricing')} value='pricing' icon={<LocalAtmIcon/>}/>
    </BottomNavigation>;
};