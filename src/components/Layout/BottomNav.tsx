import * as React from 'react'
import {ReactNode} from 'react'
import {useTranslation} from 'react-i18next'
import {useAppDispatch} from '../../store'
import {Route, SET_NAV} from '../../store/features/nav'
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
    const actions: {value: Route, icon: ReactNode}[] = [
        {value: 'sms', icon: <ActionIcon Icon={EnvelopeIcon} />},
        {value: 'rcs', icon: <ActionIcon Icon={IdentificationIcon} />},
        {value: 'voice', icon: <ActionIcon Icon={PhoneIcon} />},
        {value: 'lookup', icon: <ActionIcon Icon={DocumentMagnifyingGlassIcon} />},
        {value: 'options', icon: <ActionIcon Icon={CogIcon} />},
        {value: 'contacts', icon: <ActionIcon Icon={UserIcon} />},
        {value: 'numbers', icon: <ActionIcon Icon={DevicePhoneMobileIcon} />},
        {icon: <ActionIcon Icon={DocumentCurrencyEuroIcon} />, value: 'pricing'}
    ]

    return <>
        <div
            className="fixed inset-x-0 bottom-0 left-0 z-50 w-full h-20 mx-auto overflow-hidden border border-gray-200 rounded-full dark:bg-gray-700 dark:border-gray-600 bg-white border-t sm:bottom-5 sm:shadow-lg sm:shadow-base-500/30 hover:shadow-md duration-300 sm:border sm:max-w-xl sm:rounded-xl border-base-50"
        >
            <div className="h-full font-medium grid grid-flow-col grid-cols-[repeat(auto-fill,minmax(60px,2fr))] mx-auto max-w-min gap-1.5">
                {actions.map((a, i) => <button key={i} onClick={() => dispatch(SET_NAV(a.value))}
                                               className='inline-flex flex-col items-center justify-center px-5 rounded-s-full hover:bg-gray-50 dark:hover:bg-gray-800 group'>
                    {a.icon}
                    <span className='text-sm text-gray-500'>{t(a.value)}</span>
                </button>)}
            </div>
        </div>
    </>
}
