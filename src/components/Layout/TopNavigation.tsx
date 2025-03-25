import {Navbar, NavbarItem, NavbarSection, NavbarSpacer} from '../catalyst/navbar'
import {useEffect, useState} from 'react'
import Logo from '../../assets/img/white-534x105.png'
import {ExternalButton} from './ExternalButton'
import FacebookIcon from '@mui/icons-material/Facebook'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import TwitterIcon from '@mui/icons-material/Twitter'
import RssFeedIcon from '@mui/icons-material/RssFeed'
import GitHubIcon from '@mui/icons-material/GitHub'
import HelpIcon from '@mui/icons-material/HelpOutline'
import {getNumberFormatter} from '../../util/numberFormatter'
import {useTranslation} from 'react-i18next'
import localStore from '../../util/LocalStore'
import type {Language} from '../Options/types'
import i18n from '../../i18n'
import {Dropdown, DropdownButton, DropdownItem, DropdownMenu} from '../catalyst/dropdown'

const links = [
    <ExternalButton url='https://www.facebook.com/sevencommunications7'>
        <FacebookIcon className='text-white'/>
    </ExternalButton>,
    <ExternalButton url='https://www.linkedin.com/company/sevenio'>
        <LinkedInIcon className='text-white'/>
    </ExternalButton>,
    <ExternalButton url='https://twitter.com/sevenio7'>
        <TwitterIcon className='text-white'/>
    </ExternalButton>,
    <ExternalButton url='https://www.seven.io/en/feed/'>
        <RssFeedIcon className='text-white'/>
    </ExternalButton>,
    <ExternalButton url='https://github.com/seven-io'>
        <GitHubIcon className='text-white'/>
    </ExternalButton>,
    <ExternalButton url='https://www.seven.io/en/company/contact/'>
        <HelpIcon className='text-white'/>
    </ExternalButton>
]

export default function TopNavigation() {
    const {t} = useTranslation()
    const [balance, setBalance] = useState(localStore.get('balance'))
    const [language, setLanguage] = useState<Language>(localStore.get('options.language'))

    useEffect(() => {
        localStore.onDidChange('balance', (balance) => {
             balance !== undefined && setBalance(balance)
        })

        localStore.onDidChange('options', (options) => {
             options !== undefined && setLanguage(options.language)
        })
    }, [])

    const handleCloseLanguage = async (lang?: Language) => {
        if (!lang) return

        localStore.set('options.language', lang)

        await i18n.changeLanguage('us' === lang ? 'en' : lang)
    }

    return <Navbar style={{backgroundColor: '#00d488'}}>
        <img
            alt='seven Logo'
            className='cursor-pointer max-w-32'
            onClick={() => window.require('electron').shell.openExternal('https://www.seven.io/')}
            src={Logo}
        />

        <NavbarSpacer />

        <NavbarSection>
            {null !== balance && <NavbarItem className='align-super font-bold'
            ><span className='text-white dark:text-black'>{t('balance')}: {getNumberFormatter().format(balance)}</span></NavbarItem>}

            <Dropdown>
                <DropdownButton plain className='h-9 flex items-center' onClick={() => handleCloseLanguage()}>
                          <span
                              aria-label={t('chooseLanguage')}
                              className={`fi fi-${language}`}
                          />
                </DropdownButton>
                <DropdownMenu>
                    <DropdownItem onClick={() => handleCloseLanguage('us')}>
                       <span
                           className='fi fi-us'
                           aria-label='Choose English'
                       />
                    </DropdownItem>

                    <DropdownItem onClick={() => handleCloseLanguage('de')}>
                       <span
                           className='fi fi-de'
                           aria-label='Deutsch auswählen'
                       />
                    </DropdownItem>
                </DropdownMenu>
            </Dropdown>

            {links.map((component, key) =>  {
                return <span key={key}>{component}</span>
            })}
        </NavbarSection>
    </Navbar>
}