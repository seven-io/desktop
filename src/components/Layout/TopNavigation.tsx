import {Navbar, NavbarDivider, NavbarItem, NavbarSection, NavbarSpacer} from '../catalyst/navbar'
import {type MouseEvent, PropsWithChildren, useEffect, useState} from 'react'
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
    <ExternalButton
        url='https://www.facebook.com/sevencommunications7'
        //size='small'
    ><FacebookIcon/></ExternalButton>,
    <ExternalButton url='https://www.linkedin.com/company/sevenio'><LinkedInIcon/></ExternalButton>,
    <ExternalButton url='https://twitter.com/sevenio7'><TwitterIcon/></ExternalButton>,
    <ExternalButton url='https://www.seven.io/en/feed/'><RssFeedIcon/></ExternalButton>,
    <ExternalButton url='https://github.com/seven-io'><GitHubIcon/></ExternalButton>,
    <ExternalButton url='https://www.seven.io/en/company/contact/'><HelpIcon/></ExternalButton>
]

export default function TopNavigation({children}: PropsWithChildren) {
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

    return <Navbar style={{backgroundColor: '#00d488'}}>
        <img
            alt='seven Logo'
            className='cursor-pointer max-w-32'
            onClick={() => window.require('electron').shell.openExternal('https://www.seven.io/')}
            src={Logo}
        />

        <NavbarDivider className="max-lg:hidden" />
        <NavbarSpacer />
        <NavbarSection>
            {null !== balance && <NavbarItem className='text-white align-super font-bold'
            >
                {t('balance')}: {getNumberFormatter().format(balance)}</NavbarItem>}

            <div className='inline-flex align-super'>
           {/*     <Button
                    aria-controls='simple-menu'
                    aria-haspopup='true'
                    onClick={handleClickLanguage}
                >
                   <span
                       aria-label={t('chooseLanguage')}
                       className={`fi fi-${language}`}
                   />
                </Button>*/}

                <Dropdown
                    //anchorEl={anchorEl}
                    //id='simple-menu'
                    //keepMounted
                    //onClose={() => handleCloseLanguage()}
                    //open={Boolean(anchorEl)}
                >
                    <DropdownButton onClick={() => handleCloseLanguage()}>
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
            </div>

            {links.map((component, key) => (
                <NavbarItem key={key} >
                    {component}
                </NavbarItem>
            ))}
        </NavbarSection>
    </Navbar>
}