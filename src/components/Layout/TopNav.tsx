import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import {shell} from 'electron';
import {useTranslation} from 'react-i18next';
import {Button, ButtonGroup, Menu, MenuItem} from '@material-ui/core';
import FacebookIcon from '@material-ui/icons/Facebook';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import TwitterIcon from '@material-ui/icons/Twitter';
import RssFeedIcon from '@material-ui/icons/RssFeed';
import GitHubIcon from '@material-ui/icons/GitHub';
import HelpIcon from '@material-ui/icons/HelpOutline';
import {LocalStore} from '../../util/LocalStore';
import Logo from '../../assets/img/white-534x105.png';
import {Language} from '../Options/types';
import {ExternalButton} from './ExternalButton';
import i18n from '../../i18n';
import {getNumberFormatter} from '../../util/numberFormatter';

export const TopNav = () => {
    const {t} = useTranslation();
    const [balance, setBalance] = useState(LocalStore.get('balance'));
    const [language, setLanguage] = useState<Language>(LocalStore.get('options.language'));
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    LocalStore.onDidChange('balance', balance => {
        typeof balance !== 'undefined' && setBalance(balance);
    });

    LocalStore.onDidChange('options', options => {
        typeof options !== 'undefined' && setLanguage(options.language);
    });

    const handleClickLanguage = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseLanguage = async (lang?: Language) => {
        setAnchorEl(null);

        if (!lang) {
            return;
        }

        LocalStore.set('options.language', lang);

        await i18n.changeLanguage('us' === lang ? 'en' : lang);
    };

    const classes = makeStyles({
        balance: {
            color: '#fff',
            fontWeight: 'bold',
            verticalAlign: 'super',
        },
        language: {
            display: 'inline-flex',
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
            <a href='#!' onClick={() => shell.openExternal('https://www.seven.io/')}>
                <img src={Logo} alt='' className={classes.logo}/>
            </a>

            <div>
                {null === balance ? null : <span className={classes.balance}>
                        {t('balance')}: {getNumberFormatter().format(balance)}</span>}

                <div className={classes.language}>
                    <Button
                        aria-controls='simple-menu'
                        aria-haspopup='true'
                        onClick={handleClickLanguage}
                    >
                   <span
                       aria-label={t('chooseLanguage')}
                       className={`flag-icon flag-icon-${language}`}
                   />
                    </Button>

                    <Menu
                        anchorEl={anchorEl}
                        id='simple-menu'
                        keepMounted
                        onClose={() => handleCloseLanguage()}
                        open={Boolean(anchorEl)}
                    >
                        <MenuItem onClick={() => handleCloseLanguage('us')}>
                       <span
                           className='flag-icon flag-icon-us'
                           aria-label='Choose English'
                       />
                        </MenuItem>

                        <MenuItem onClick={() => handleCloseLanguage('de')}>
                       <span
                           className='flag-icon flag-icon-de'
                           aria-label='Deutsch auswählen'
                       />
                        </MenuItem>
                    </Menu>
                </div>

                <ButtonGroup color='primary' aria-label={t('socialsBtnGroup')}>
                    <ExternalButton url='https://www.facebook.com/sevencommunications7' size='small'>
                        <FacebookIcon/>
                    </ExternalButton>

                    <ExternalButton url='https://www.linkedin.com/company/sevenio'>
                        <LinkedInIcon/>
                    </ExternalButton>

                    <ExternalButton url='https://twitter.com/sevenio7'>
                        <TwitterIcon/>
                    </ExternalButton>

                    <ExternalButton url='https://www.seven.io/en/feed/'>
                        <RssFeedIcon/>
                    </ExternalButton>

                    <ExternalButton url='https://github.com/seven-io'>
                        <GitHubIcon/>
                    </ExternalButton>

                    <ExternalButton url='https://www.seven.io/en/company/contact/'>
                        <HelpIcon/>
                    </ExternalButton>
                </ButtonGroup>
            </div>
        </Toolbar>
    </AppBar>;
};
;
