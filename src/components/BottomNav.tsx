import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import HelpIcon from '@material-ui/icons/HelpOutline';
import SettingsIcon from '@material-ui/icons/Settings';
import SmsIcon from '@material-ui/icons/Sms';

export type BottomNavProps = {
    onChange: (value: number) => void
}

export const BottomNav = ({onChange}: BottomNavProps) => {
    const [nav, setNav] = React.useState(0);

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
            setNav(newNav);

            onChange(newNav);
        }}
        showLabels
        value={nav}
    >
        <BottomNavigationAction label='SMS' icon={<SmsIcon/>}/>
        <BottomNavigationAction label='Options' icon={<SettingsIcon/>}/>
        <BottomNavigationAction label='Support' icon={<HelpIcon/>}/>
    </BottomNavigation>;
};