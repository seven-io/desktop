import * as React from 'react'
import {ReactNode, useEffect, useState} from 'react'
import {useTranslation} from 'react-i18next'
import {useAppDispatch} from '../../store'
import {Route, SET_NAV} from '../../store/features/nav'
import localStore from '../../util/LocalStore'
import {
    CogIcon,
    DevicePhoneMobileIcon,
    DocumentCurrencyEuroIcon,
    DocumentMagnifyingGlassIcon,
    EnvelopeIcon,
    IdentificationIcon,
    PhoneIcon,
    UserIcon,
} from '@heroicons/react/16/solid'

const ActionIcon = ({Icon}: {
    Icon: React.ForwardRefExoticComponent<React.PropsWithoutRef<React.SVGProps<SVGSVGElement>>>
}) => <Icon className='dark:text-white w-8'/>

export const BottomNav = () => {
    const {t} = useTranslation()
    const dispatch = useAppDispatch()
    const [actions, setActions] = useState<{value: Route, icon: ReactNode}[]>([
        {value: 'sms', icon: <ActionIcon Icon={EnvelopeIcon} />},
        {value: 'rcs', icon: <ActionIcon Icon={IdentificationIcon} />},
        {value: 'voice', icon: <ActionIcon Icon={PhoneIcon} />},
        {value: 'lookup', icon: <ActionIcon Icon={DocumentMagnifyingGlassIcon} />},
        {value: 'options', icon: <ActionIcon Icon={CogIcon} />},
        {value: 'contacts', icon: <ActionIcon Icon={UserIcon} />},
        {value: 'numbers', icon: <ActionIcon Icon={DevicePhoneMobileIcon} />},
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
                    icon: <ActionIcon Icon={DocumentCurrencyEuroIcon} />,
                    value: 'pricing',
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
            className='fixed z-50 w-full h-20 max-w-xlxxx max-w-max -translate-x-1/2 bg-white border border-gray-200 rounded-full bottom-4 left-1/2 dark:bg-gray-700 dark:border-gray-600'>
            <div className='grid h-full max-w-max grid-flow-col auto-cols-max mx-auto'>
                {actions.map((a, i) => <button key={i} onClick={() => dispatch(SET_NAV(a.value))}
                                               className='inline-flex flex-col items-center justify-center px-5 rounded-s-full hover:bg-gray-50 dark:hover:bg-gray-800 group'>
                    {a.icon}
                    <span
                        className='text-sm text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500'>{t(a.value)}</span>
                </button>)}
            </div>
        </div>
    </>
}
