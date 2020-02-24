import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Typography from '@material-ui/core/Typography';
import FacebookIcon from '@material-ui/icons/Facebook';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import TwitterIcon from '@material-ui/icons/Twitter';
import RssFeedIcon from '@material-ui/icons/RssFeed';
import GitHubIcon from '@material-ui/icons/GitHub';
import {shell} from 'electron';
import Button from '@material-ui/core/Button';

export const TopNav = () => {
    const classes = makeStyles({
        toolbar: {
            justifyContent: 'space-between',
        },
        link: {
            color: '#fff',
        },
    })();

    return <AppBar position="static">
        <Toolbar className={classes.toolbar}>
            <Typography variant="h6" className={classes.link}>
                <span onClick={() => shell.openExternal('https://www.sms77.io/')}>
                    sms77.io
                </span>
            </Typography>

            <ButtonGroup color="primary" aria-label="social media button group">
                <Button className={classes.link}
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
            </ButtonGroup>
        </Toolbar>
    </AppBar>;
};