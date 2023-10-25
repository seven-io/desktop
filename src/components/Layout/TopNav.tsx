import FacebookIcon from '@mui/icons-material/Facebook'
import GitHubIcon from '@mui/icons-material/GitHub'
import HelpIcon from '@mui/icons-material/HelpOutline'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import RssFeedIcon from '@mui/icons-material/RssFeed'
import TwitterIcon from '@mui/icons-material/Twitter'
import Box from '@mui/material/Box'
import AppBar from '@mui/material/AppBar'
import Button from '@mui/material/Button'
import ButtonGroup from '@mui/material/ButtonGroup'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Toolbar from '@mui/material/Toolbar'
import {shell} from 'electron'
import {type MouseEvent, useEffect, useState} from 'react'
import {useTranslation} from 'react-i18next'
import Logo from '../../assets/img/white-534x105.png'
import i18n from '../../i18n'
import {LocalStore} from '../../util/LocalStore'
import {getNumberFormatter} from '../../util/numberFormatter'
import type {Language} from '../Options/types'
import {ExternalButton} from './ExternalButton'

export const TopNav = () => {
    const {t} = useTranslation()
    const [balance, setBalance] = useState(LocalStore.get('balance'))
    const [language, setLanguage] = useState<Language>(LocalStore.get('options.language'))
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

    useEffect(() => {
        LocalStore.onDidChange('balance', balance => {
            typeof balance !== 'undefined' && setBalance(balance)
        })

        LocalStore.onDidChange('options', options => {
            typeof options !== 'undefined' && setLanguage(options.language)
        })
    }, [])

    const handleClickLanguage = (event: MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget)
    }

    const handleCloseLanguage = async (lang?: Language) => {
        setAnchorEl(null)

        if (!lang) return

        LocalStore.set('options.language', lang)

        await i18n.changeLanguage('us' === lang ? 'en' : lang)
    }

    return <AppBar position='static' variant='outlined'>
        <Toolbar
            sx={{
                alignItems: 'center',
                justifyContent: 'space-between',
            }}
            variant='dense'
        >
            <Box
                alt=''
                component='img'
                onClick={() => shell.openExternal('https://www.seven.io/')}
                src={Logo}
                sx={{
                    cursor: 'pointer',
                    maxWidth: '128px',
                }}
            />

            <div>
                {null === balance ? null : <Box
                    component='span'
                    sx={{
                        color: '#fff',
                        fontWeight: 'bold',
                        verticalAlign: 'super',
                    }}
                >
                    {t('balance')}: {getNumberFormatter().format(balance)}</Box>}
                <Box
                    component='div'
                    sx={{
                        display: 'inline-flex',
                        verticalAlign: 'super',
                    }}
                >
                    <Button
                        aria-controls='simple-menu'
                        aria-haspopup='true'
                        onClick={handleClickLanguage}
                    >
                   <span
                       aria-label={t('chooseLanguage')}
                       className={`fi fi-${language}`}
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
                           className='fi fi-us'
                           aria-label='Choose English'
                       />
                        </MenuItem>

                        <MenuItem onClick={() => handleCloseLanguage('de')}>
                       <span
                           className='fi fi-de'
                           aria-label='Deutsch auswählen'
                       />
                        </MenuItem>
                    </Menu>
                </Box>

                <ButtonGroup color='primary' aria-label={t('socialsBtnGroup')}>
                    <ExternalButton
                        url='https://www.facebook.com/sevencommunications7'
                        size='small'
                    >
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
    </AppBar>
}

