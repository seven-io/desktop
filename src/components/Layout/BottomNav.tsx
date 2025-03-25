import {ReactNode, useEffect, useState} from 'react'
import {useTranslation} from 'react-i18next'
import {useAppDispatch, useAppSelector} from '../../store'
import {Route, SET_NAV} from '../../store/features/nav'
import localStore from '../../util/LocalStore'
import {
    CogIcon,
    CurrencyDollarIcon,
    DocumentMagnifyingGlassIcon,
    EnvelopeIcon,
    IdentificationIcon,
    PhoneIcon,
    UserIcon
} from '@heroicons/react/16/solid'

export const BottomNav = () => {
    const navId = useAppSelector(s => s.nav) // TODO??
    const {t} = useTranslation()
    const dispatch = useAppDispatch()
    const [actions, setActions] = useState<{value: Route, icon: ReactNode}[]>([
        {value: 'sms', icon: <EnvelopeIcon/>},
        {value: 'rcs', icon: <IdentificationIcon/>},
        {value: 'voice', icon: <PhoneIcon/>},
        {value: 'lookup', icon: <DocumentMagnifyingGlassIcon/>},
        {value: 'options', icon: <CogIcon/>},
        {value: 'contacts', icon: <UserIcon/>},
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
                    icon: <CurrencyDollarIcon/>,
                })
            }
        } else {
            hasPricingRoute && _actions.splice(pricingIndex!, 1)
        }

        setActions(_actions)
    }, [expertMode])

    useEffect(() => {
        localStore.onDidChange('options', (options) => {
            expertMode !== options?.expertMode && setExpertMode(options!.expertMode)
        })
    }, [])
    console.log(`grid h-full max-w-lg grid-cols-${actions.length} mx-auto`)
    return <>
        <div
            className='fixed z-50 w-full h-16 max-w-lg -translate-x-1/2 bg-white border border-gray-200 rounded-full bottom-4 left-1/2 dark:bg-gray-700 dark:border-gray-600'>
            <div className={`grid h-full max-w-lg grid-cols-7 mx-auto`}>
                {actions.map((a, i) => <button key={i} onClick={() => dispatch(SET_NAV(a.value))}
                                               className='inline-flex flex-col items-center justify-center px-5 rounded-s-full hover:bg-gray-50 dark:hover:bg-gray-800 group'>
                    {a.icon}
                    <span
                        className='text-sm text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500'>{t(a.value)}</span>
                </button>)}
            </div>
        </div>

        {/*
        <BottomNavigation
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
        */}
    </>
}
