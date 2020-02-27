import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import HelpIcon from '@material-ui/icons/HelpOutline';
import DescriptionIcon from '@material-ui/icons/Description';
import SettingsIcon from '@material-ui/icons/Settings';
import SmsIcon from '@material-ui/icons/Sms';
import {useTranslation} from 'react-i18next';
import {shell} from 'electron';

export type BottomNavProps = {
    onChange: (value: number) => void
}

export const BottomNav = ({onChange}: BottomNavProps) => {
    const [nav, setNav] = React.useState(0);
    const {t} = useTranslation();

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
        onChange={(e: any, newNav: any) => {
            if (3 === newNav) {
                shell.openExternal('https://www.sms77.io/en/company/contact/');
            }
            else {
                setNav(newNav);

                onChange(newNav);
            }
        }}
        showLabels
        value={nav}
    >
        <BottomNavigationAction label={t('SMS')} icon={<SmsIcon/>}/>
        <BottomNavigationAction label={t('options')} icon={<SettingsIcon/>}/>
        <BottomNavigationAction label={t('documentation')} icon={<DescriptionIcon/>}/>
        <BottomNavigationAction label={t('support')} icon={<HelpIcon/>}/>
    </BottomNavigation>;
};