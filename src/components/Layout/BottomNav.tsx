import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';
import {makeStyles} from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction, {BottomNavigationActionProps} from '@material-ui/core/BottomNavigationAction';
import SettingsIcon from '@material-ui/icons/Settings';
import SmsIcon from '@material-ui/icons/Sms';
import ContactsIcon from '@material-ui/icons/Contacts';
import LocalAtmIcon from '@material-ui/icons/LocalAtm';
import PolicyIcon from '@material-ui/icons/Policy';

import {setNav} from '../../store/actions';
import {Route} from '../../store/reducers/nav';
import {RootState} from '../../store/reducers';

export const BottomNav = () => {
    const navId = useSelector((state: RootState) => state.nav);
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const classes = makeStyles({
        root: {
            bottom: 0,
            justifyContent: 'space-evenly',
            position: 'fixed',
            width: '100%',
        },
    })();

    const actions: BottomNavigationActionProps[] = [
        {label: 'sms', value: 'send', icon: <SmsIcon/>},
        {label: 'lookup', value: 'lookup', icon: <PolicyIcon/>},
        {label: 'options', value: 'options', icon: <SettingsIcon/>},
        {label: 'contacts', value: 'contacts', icon: <ContactsIcon/>},
        {label: 'pricing', value: 'pricing', icon: <LocalAtmIcon/>},
    ];

    return <BottomNavigation
        className={classes.root}
        onChange={(e: any, newNavId: Route) => dispatch(setNav(newNavId))}
        showLabels
        value={navId}
    >
        {actions.map((a, i) => <BottomNavigationAction icon={a.icon} key={i} label={t(a.label as string)}
                                                       value={a.value}/>)}
    </BottomNavigation>;
};