import React, {useEffect, useState} from 'react';
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
import VoiceIcon from '@material-ui/icons/PermPhoneMsg';
import {setNav} from '../../store/actions';
import {Route} from '../../store/reducers/nav';
import {RootState} from '../../store/reducers';
import {LocalStore} from '../../util/LocalStore';

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
    const [actions, setActions] = useState<BottomNavigationActionProps[]>([
        {value: 'sms', icon: <SmsIcon/>},
        {value: 'voice', icon: <VoiceIcon/>},
        {value: 'lookup', icon: <PolicyIcon/>},
        {value: 'options', icon: <SettingsIcon/>},
        {value: 'contacts', icon: <ContactsIcon/>},
    ]);

    const getActionIndexByValue = (value: string): number => {
        return actions.findIndex(a => value === a.value);
    };

    const [expertMode, setExpertMode] =
        useState<boolean>(LocalStore.get('options.expertMode'));

    useEffect(() => {
        const pricingIndex = getActionIndexByValue('pricing');
        const hasPricingRoute = -1 !== pricingIndex;
        const _actions = [...actions];

        if (expertMode) {
            if (!hasPricingRoute) {
                _actions.push({
                    value: 'pricing',
                    icon: <LocalAtmIcon/>
                });
            }
        } else {
            hasPricingRoute && _actions.splice(pricingIndex!, 1);
        }

        setActions(_actions);
    }, [expertMode]);

    LocalStore.onDidChange('options', options => {
        options && expertMode !== options.expertMode && setExpertMode(options.expertMode);
    });

    return <BottomNavigation
        className={classes.root}
        onChange={(e: any, newNavId: Route) => dispatch(setNav(newNavId))}
        showLabels
        value={navId}
    >
        {actions.map((a, i) => <BottomNavigationAction
            icon={a.icon}
            key={i}
            label={t(a.value)}
            value={a.value}
        />)}
    </BottomNavigation>;
};