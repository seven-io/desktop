import ContactsIcon from '@mui/icons-material/Contacts'
import LocalAtmIcon from '@mui/icons-material/LocalAtm'
import VoiceIcon from '@mui/icons-material/PermPhoneMsg'
import PolicyIcon from '@mui/icons-material/Policy'
import SettingsIcon from '@mui/icons-material/Settings'
import SmsIcon from '@mui/icons-material/Sms'
import BottomNavigation from '@mui/material/BottomNavigation'
import BottomNavigationAction, {
    type BottomNavigationActionProps,
} from '@mui/material/BottomNavigationAction'
import {useEffect, useState} from 'react'
import {useTranslation} from 'react-i18next'
import {useDispatch, useSelector} from 'react-redux'
import {setNav} from '../../store/actions'
import type {RootState} from '../../store/reducers'
import type {Route} from '../../store/reducers/nav'
import {LocalStore} from '../../util/LocalStore'

export const BottomNav = () => {
    const navId = useSelector((state: RootState) => state.nav)
    const {t} = useTranslation()
    const dispatch = useDispatch()
    const [actions, setActions] = useState<BottomNavigationActionProps[]>([
        {value: 'sms', icon: <SmsIcon/>},
        {value: 'voice', icon: <VoiceIcon/>},
        {value: 'lookup', icon: <PolicyIcon/>},
        {value: 'options', icon: <SettingsIcon/>},
        {value: 'contacts', icon: <ContactsIcon/>},
    ])

    const getActionIndexByValue = (value: string): number => {
        return actions.findIndex(a => value === a.value)
    }

    const [expertMode, setExpertMode] =
        useState<boolean>(LocalStore.get('options.expertMode'))

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

    LocalStore.onDidChange('options', options => {
        options && expertMode !== options.expertMode && setExpertMode(options.expertMode)
    })

    return <BottomNavigation
        onChange={(e: any, newNavId: Route) => dispatch(setNav(newNavId))}
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
