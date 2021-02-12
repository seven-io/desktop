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
import Button, {ButtonProps} from '@material-ui/core/Button';
import {useTranslation} from 'react-i18next';
import HelpIcon from '@material-ui/icons/HelpOutline';
import {LocalStore} from '../../util/LocalStore';

type ExternalButtonProps = ButtonProps & {
    url: string
}

export const TopNav = () => {
    const {t} = useTranslation();
    const [balance, setBalance] = useState(LocalStore.get('balance'));

    LocalStore.onDidChange('balance', balance => {
        if (typeof balance !== 'undefined') {
            setBalance(balance);
        }
    });

    const classes = makeStyles({
        balance: {
            color: '#fff',
            fontWeight: 'bold',
            verticalAlign: 'super',
        },
        link: {
            color: '#fff',
        },
        logo: {
            maxWidth: '128px',
        },
        toolbar: {
            justifyContent: 'space-between',
        },
    })();

    const ExternalButton = ({
                                children,
                                className,
                                url,
                                ...props
                            }: ExternalButtonProps) => {
        return <Button
            className={classes.link}
            onClick={() => shell.openExternal(url)}
            {...props}

        >
            {children}
        </Button>;
    };

    return <AppBar variant='outlined' position='static'>
        <Toolbar variant='dense' className={classes.toolbar}>
            <a href='#!' onClick={() => shell.openExternal('https://www.sms77.io/')}>
                <img src={require('../../assets/img/white-3240x640.png').default} alt=''
                     className={classes.logo}/>
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