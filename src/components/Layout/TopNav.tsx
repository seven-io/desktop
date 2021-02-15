import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import FacebookIcon from '@material-ui/icons/Facebook';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import TwitterIcon from '@material-ui/icons/Twitter';
import RssFeedIcon from '@material-ui/icons/RssFeed';
import GitHubIcon from '@material-ui/icons/GitHub';
import {shell} from 'electron';
import {useTranslation} from 'react-i18next';
import HelpIcon from '@material-ui/icons/HelpOutline';
import {LocalStore} from '../../util/LocalStore';
import {ExternalButton} from './ExternalButton';
import Logo from '../../assets/img/white-3240x640.png';

export const TopNav = () => {
    const {t} = useTranslation();
    const [balance, setBalance] = useState(LocalStore.get('balance'));

    LocalStore.onDidChange('balance', balance => {
        typeof balance !== 'undefined' && setBalance(balance);
    });

    const classes = makeStyles({
        balance: {
            color: '#fff',
            fontWeight: 'bold',
            verticalAlign: 'super',
        },
        logo: {
            maxWidth: '128px',
        },
        toolbar: {
            justifyContent: 'space-between',
        },
    })();

    return <AppBar variant='outlined' position='static'>
        <Toolbar variant='dense' className={classes.toolbar}>
            <a href='#!' onClick={() => shell.openExternal('https://www.sms77.io/')}>
                <img src={Logo} alt='' className={classes.logo}/>
            </a>

            <div>
                {null === balance ? null : <span className={classes.balance}>
                        {t('balance')}: {balance}</span>}

                <ButtonGroup color='primary' aria-label={t('socialsBtnGroup')}>
                    <ExternalButton url='https://www.facebook.com/sms77.io/' size='small'>
                        <FacebookIcon/>
                    </ExternalButton>

                    <ExternalButton url='https://www.linkedin.com/company/sms77/'>
                        <LinkedInIcon/>
                    </ExternalButton>

                    <ExternalButton url='https://twitter.com/sms77io'>
                        <TwitterIcon/>
                    </ExternalButton>

                    <ExternalButton url='https://www.sms77.io/de/feed/'>
                        <RssFeedIcon/>
                    </ExternalButton>

                    <ExternalButton url='https://github.com/sms77io'>
                        <GitHubIcon/>
                    </ExternalButton>

                    <ExternalButton url='https://www.sms77.io/en/company/contact/'>
                        <HelpIcon/>
                    </ExternalButton>
                </ButtonGroup>
            </div>
        </Toolbar>
    </AppBar>;
};