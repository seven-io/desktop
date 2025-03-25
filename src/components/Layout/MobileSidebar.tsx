import {Sidebar, SidebarBody, SidebarHeader, SidebarItem, SidebarSection} from '../catalyst/sidebar'
import {type MouseEvent, PropsWithChildren, useEffect, useState} from 'react'
import Logo from '../../assets/img/white-534x105.png'
import {ExternalButton} from './ExternalButton'
import FacebookIcon from '@mui/icons-material/Facebook'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import TwitterIcon from '@mui/icons-material/Twitter'
import RssFeedIcon from '@mui/icons-material/RssFeed'
import GitHubIcon from '@mui/icons-material/GitHub'
import HelpIcon from '@mui/icons-material/HelpOutline'
import {useTranslation} from 'react-i18next'
import localStore from '../../util/LocalStore'
import type {Language} from '../Options/types'
import i18n from '../../i18n'

const links = [
    <ExternalButton
        url='https://www.facebook.com/sevencommunications7'
    ><FacebookIcon/></ExternalButton>,
    <ExternalButton url='https://www.linkedin.com/company/sevenio'><LinkedInIcon/></ExternalButton>,
    <ExternalButton url='https://twitter.com/sevenio7'><TwitterIcon/></ExternalButton>,
    <ExternalButton url='https://www.seven.io/en/feed/'><RssFeedIcon/></ExternalButton>,
    <ExternalButton url='https://github.com/seven-io'><GitHubIcon/></ExternalButton>,
    <ExternalButton url='https://www.seven.io/en/company/contact/'><HelpIcon/></ExternalButton>
]

export default function MobileSidebar({children}: PropsWithChildren) {
    const {t} = useTranslation()
    const [balance, setBalance] = useState(localStore.get('balance'))
    const [language, setLanguage] = useState<Language>(localStore.get('options.language'))
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

    useEffect(() => {
        localStore.onDidChange('balance', (balance) => {
             balance !== undefined && setBalance(balance)
        })

        localStore.onDidChange('options', (options) => {
             options !== undefined && setLanguage(options.language)
        })
    }, [])

    const handleClickLanguage = (event: MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget)
    }

    const handleCloseLanguage = async (lang?: Language) => {
        setAnchorEl(null)

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