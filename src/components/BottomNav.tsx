import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import DescriptionIcon from '@material-ui/icons/Description';
import SettingsIcon from '@material-ui/icons/Settings';
import SmsIcon from '@material-ui/icons/Sms';
import {useTranslation} from 'react-i18next';
import {useDispatch} from 'react-redux';
import HistoryIcon from '@material-ui/icons/History';
import ContactsIcon from '@material-ui/icons/Contacts';

import {setNav} from '../store/actions';
import {Route} from './Layout';

export const BottomNav = () => {
    const [navIndex, setNavIndex] = React.useState('send');

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
        onChange={(e: any, newNavIndex: Route) => {
            setNavIndex(newNavIndex);

            dispatch(setNav(newNavIndex));
        }}
        showLabels
        value={navIndex}
    >
        <BottomNavigationAction label={t('SMS')} value='send' icon={<SmsIcon/>}/>

        <BottomNavigationAction label={t('options')} value='options' icon={<SettingsIcon/>}/>

        <BottomNavigationAction label={t('history')} value='history' icon={<HistoryIcon/>}/>

        <BottomNavigationAction label={t('contacts')} value='contacts' icon={<ContactsIcon/>}/>

        <BottomNavigationAction label={t('documentation')} value='docs' icon={<DescriptionIcon/>}/>
    </BottomNavigation>;
};