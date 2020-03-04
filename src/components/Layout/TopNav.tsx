import React from 'react';
import {useDispatch} from 'react-redux';
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
import Button from '@material-ui/core/Button';
import {useTranslation} from 'react-i18next';
import HelpIcon from '@material-ui/icons/HelpOutline';
import ComputerIcon from '@material-ui/icons/Computer';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import LocalAtmIcon from '@material-ui/icons/LocalAtm';
import DescriptionIcon from '@material-ui/icons/Description';

import {System} from '../System';
import {setNav} from '../../store/actions';

export const TopNav = () => {
    const dispatch = useDispatch();

    const [systemDialogOpen, setSystemDialogOpen] = React.useState(false);

    const {t} = useTranslation();

    const classes = makeStyles({
        toolbar: {
            justifyContent: 'space-between',
        },
        link: {
            color: '#fff',
        },
        logo: {
            maxWidth: '128px',
        }
    })();

    return <AppBar variant='outlined' position='static'>
        <Toolbar variant='dense' className={classes.toolbar}>
            <a href='#!' onClick={() => shell.openExternal('https://www.sms77.io/')}>
                <img src={require('../../assets/img/white-3240x640.png').default} alt='' className={classes.logo}/>
            </a>

            <ButtonGroup color='primary' aria-label={t('socialsBtnGroup')}>
                <Button className={classes.link} size='small'
                        onClick={() => shell.openExternal('https://www.facebook.com/sms77.io/')}>
                    <FacebookIcon/>
                </Button>

                <Button className={classes.link}
                        onClick={() => shell.openExternal('https://www.linkedin.com/company/sms77/')}>
                    <LinkedInIcon/>
                </Button>

                <Button className={classes.link} onClick={() => shell.openExternal('https://twitter.com/sms77io')}>
                    <TwitterIcon/>
                </Button>

                <Button className={classes.link}
                        onClick={() => shell.openExternal('https://www.sms77.io/de/feed/')}>
                    <RssFeedIcon/>
                </Button>

                <Button className={classes.link} onClick={() => shell.openExternal('https://github.com/sms77io')}>
                    <GitHubIcon/>
                </Button>

                <Button className={classes.link} onClick={() => setSystemDialogOpen(!systemDialogOpen)}>
                    <ComputerIcon/>

                    <Dialog onClose={() => setSystemDialogOpen(false)} aria-labelledby='systemDialog'
                            open={systemDialogOpen}>
                        <DialogTitle id='systemDialog'>{t('systemInfo')}</DialogTitle>

                        <System/>
                    </Dialog>
                </Button>

                <Button className={classes.link} onClick={() => dispatch(setNav('pricing'))}>
                    <LocalAtmIcon/>
                </Button>

                <Button className={classes.link}
                        onClick={() => shell.openExternal('https://www.sms77.io/en/company/contact/')}>
                    <HelpIcon/>
                </Button>

                <Button className={classes.link} onClick={() => dispatch(setNav('docs'))}>
                    <DescriptionIcon/>
                </Button>
            </ButtonGroup>
        </Toolbar>
    </AppBar>;
};