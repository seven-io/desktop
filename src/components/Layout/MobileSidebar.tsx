import {Sidebar, SidebarBody, SidebarHeader, SidebarItem, SidebarSection} from '../Sidebar'
import {useEffect, useState} from 'react'
import Logo from '../../assets/img/white-534x105.png'
import {ExternalButton} from './ExternalButton'
import {useTranslation} from 'react-i18next'
import localStore from '../../util/LocalStore'
import type {Language} from '../Options/types'
import i18n from '../../i18n'
import {faFacebook, faGithub, faLinkedin, faXTwitter} from '@fortawesome/free-brands-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faInfo, faRss} from '@fortawesome/free-solid-svg-icons'

const links = [
    <ExternalButton
        url='https://www.facebook.com/sevencommunications7'
    ><FontAwesomeIcon icon={faFacebook} /></ExternalButton>,
    <ExternalButton url='https://www.linkedin.com/company/sevenio'><FontAwesomeIcon icon={faLinkedin} /></ExternalButton>,
    <ExternalButton url='https://twitter.com/sevenio7'><FontAwesomeIcon icon={faXTwitter} /></ExternalButton>,
    <ExternalButton url='https://www.seven.io/en/feed/'><FontAwesomeIcon icon={faRss} /></ExternalButton>,
    <ExternalButton url='https://github.com/seven-io'><FontAwesomeIcon icon={faGithub} /></ExternalButton>,
    <ExternalButton url='https://www.seven.io/en/company/contact/'><FontAwesomeIcon icon={faInfo} /></ExternalButton>
]

export default function MobileSidebar() {
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

    return <Sidebar>
        <SidebarHeader>
            <img
                alt='seven Logo'
                className='cursor-pointer max-w-32'
                onClick={() => window.require('electron').shell.openExternal('https://www.seven.io/')}
                src={Logo}
            />
        </SidebarHeader>
        <SidebarBody>
            <SidebarSection>
                {links.map((link, key) => (
                    <SidebarItem key={key}>
                        {link}
                    </SidebarItem>
                ))}
            </SidebarSection>
        </SidebarBody>
    </Sidebar>
}