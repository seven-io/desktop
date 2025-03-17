import ContactsIcon from '@mui/icons-material/Contacts'
import LocalAtmIcon from '@mui/icons-material/LocalAtm'
import VoiceIcon from '@mui/icons-material/PermPhoneMsg'
import PolicyIcon from '@mui/icons-material/Policy'
import SettingsIcon from '@mui/icons-material/Settings'
import ContactMailIcon from '@mui/icons-material/ContactMail'
import SmsIcon from '@mui/icons-material/Sms'
import BottomNavigation from '@mui/material/BottomNavigation'
import BottomNavigationAction, {type BottomNavigationActionProps} from '@mui/material/BottomNavigationAction'
import {useEffect, useState} from 'react'
import {useTranslation} from 'react-i18next'
import {useAppDispatch, useAppSelector} from '../../store'
import {Route, SET_NAV} from '../../store/features/nav'
import localStore from '../../util/LocalStore'

export const BottomNav = () => {
    const navId = useAppSelector(s => s.nav)
    const {t} = useTranslation()
    const dispatch = useAppDispatch()
    const [actions, setActions] = useState<BottomNavigationActionProps[]>([
        {value: 'sms', icon: <SmsIcon/>},
        {value: 'rcs', icon: <ContactMailIcon/>},
        {value: 'voice', icon: <VoiceIcon/>},
        {value: 'lookup', icon: <PolicyIcon/>},
        {value: 'options', icon: <SettingsIcon/>},
        {value: 'contacts', icon: <ContactsIcon/>},
    ])

    const getActionIndexByValue = (value: string): number => {
        return actions.findIndex(a => value === a.value)
    }

    const [expertMode, setExpertMode] =
        useState<boolean>(localStore.get('options.expertMode'))

    useEffect(() => {
        const pricingIndex = getActionIndexByValue('pricing')
        const hasPricingRoute = -1 !== pricingIndex
        const _actions = [...actions]

        if (expertMode) {
            if (!hasPricingRoute) {
                _actions.push({
                    value: 'pricing',
                    icon: <LocalAtmIcon/>,
                })
            }
        } else {
            hasPricingRoute && _actions.splice(pricingIndex!, 1)
        }

        setActions(_actions)
    }, [expertMode])

    useEffect(() => {
        localStore.onDidChange('options', (options) => {
            options && expertMode !== options.expertMode && setExpertMode(options.expertMode)
        })
    }, [])

    return <BottomNavigation
        onChange={(_e: any, newNavId: Route) => dispatch(SET_NAV(newNavId))}
        showLabels
        value={navId}
        sx={{
            bottom: 0,
            justifyContent: 'space-evenly',
            position: 'fixed',
            width: '100%',
        }}
    >
        {actions.map((a, i) => <BottomNavigationAction
            icon={a.icon}
            key={i}
            label={t(a.value)}
            value={a.value}
        />)}
    </BottomNavigation>
}
