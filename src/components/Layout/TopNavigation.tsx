import {Navbar, NavbarItem, NavbarSection, NavbarSpacer} from '../Navbar'
import {useEffect, useState} from 'react'
import Logo from '../../assets/img/white-534x105.png'
import {ExternalButton} from './ExternalButton'
import {getNumberFormatter} from '../../util/numberFormatter'
import {useTranslation} from 'react-i18next'
import localStore from '../../util/LocalStore'
import type {Language} from '../Options/types'
import i18n from '../../i18n'
import {Dropdown, DropdownButton, DropdownItem, DropdownMenu} from '../Dropdown'
import {faInfo, faRss} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faFacebook, faGithub, faLinkedin, faXTwitter} from '@fortawesome/free-brands-svg-icons'
import {useDarkMode} from 'usehooks-ts'

const links = [
    <ExternalButton url='https://www.facebook.com/sevencommunications7'>
        <FontAwesomeIcon className='text-white' icon={faFacebook} />
    </ExternalButton>,
    <ExternalButton url='https://www.linkedin.com/company/sevenio'>
        <FontAwesomeIcon className='text-white' icon={faLinkedin} />
    </ExternalButton>,
    <ExternalButton url='https://twitter.com/sevenio7'>
        <FontAwesomeIcon className='text-white' icon={faXTwitter} />
    </ExternalButton>,
    <ExternalButton url='https://www.seven.io/en/feed/'>
        <FontAwesomeIcon className='text-white' icon={faRss} />
    </ExternalButton>,
    <ExternalButton url='https://github.com/seven-io'>
        <FontAwesomeIcon className='text-white' icon={faGithub} />
    </ExternalButton>,
    <ExternalButton url='https://www.seven.io/en/company/contact/'>
        <FontAwesomeIcon className='text-white' icon={faInfo} />
    </ExternalButton>
]

export default function TopNavigation() {
    const {t} = useTranslation()
    const [balance, setBalance] = useState(localStore.get('balance'))
    const [language, setLanguage] = useState<Language>(localStore.get('options.language'))
    const {isDarkMode} = useDarkMode()

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

    return <Navbar className='px-1 dark:bg-zinc-900' style={{
        backgroundColor: isDarkMode ? undefined : '#00d488'
    }}>
        <img
            alt='seven Logo'
            className='cursor-pointer max-w-32'
            onClick={() => window.require('electron').shell.openExternal('https://www.seven.io/')}
            src={Logo}
        />

        <NavbarSpacer />

        <NavbarSection>
            {null !== balance && <NavbarItem className='align-super font-bold text-white'
            >{t('balance')}: {getNumberFormatter().format(balance)}</NavbarItem>}

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

                    <DropdownItem className='text-center' onClick={() => handleCloseLanguage('de')}>
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