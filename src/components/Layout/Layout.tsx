import {useEffect, useState} from 'react'
import {useTranslation} from 'react-i18next'
import {useAppDispatch, useAppSelector} from '../../store'
import {Contacts} from '../../pages/Contacts'
import {Lookup} from '../../pages/Lookup'
import {Options} from '../../pages/Options'
import {Pricings} from '../../pages/Pricings'
import {Sms} from '../../pages/Sms'
import {Voice} from '../../pages/Voice'
import {BottomNav} from './BottomNav'
import {Snackbars} from './Snackbars'
import {selectBackdropActive, SET_BACKDROP} from '../../store/features/backdrop'
import {selectRoute, SET_NAV} from '../../store/features/nav'
import {ADD_SNACKBAR} from '../../store/features/snackbars'
import localStore from '../../util/LocalStore'
import {Rcs} from '../../pages/Rcs'
import TopNavigation from './TopNavigation'
import {StackedLayout} from '../StackedLayout'
import MobileSidebar from './MobileSidebar'
import {ArrowPathIcon} from '@heroicons/react/16/solid'
import {Numbers} from '../../pages/Numbers'

export const Layout = () => {
    const {t} = useTranslation()
    const dispatch = useAppDispatch()
    const route = useAppSelector(selectRoute)
    const backdropActive = useAppSelector(selectBackdropActive)
    const [options, setOptions] = useState(localStore.get('options'))
    const {apiKey} = options

    useEffect(() => {
        localStore.onDidChange('options', (opts) => {
            opts && setOptions(opts)
        })

        if ('' === apiKey) {
            dispatch(ADD_SNACKBAR(t('pleaseSetApiKey', {ns: 'translation'})))

            dispatch(SET_NAV('options'))
        }
    }, [])

    return <StackedLayout navbar={<TopNavigation />} sidebar={<MobileSidebar />}>
        {/*TODO backdrop*/}
        {backdropActive && <div className='backdrop-blur-2xl text-white z-50'
                                onClick={() => dispatch(SET_BACKDROP(false))}
                                //open={backdropActive}
        >
            <ArrowPathIcon/>
        </div>}

        <Snackbars/>

        {
            'sms' === route
                ? <Sms/>
                : 'options' === route
                    ? <Options/>
                    : 'contacts' === route
                        ? <Contacts/>
                        : 'pricing' === route
                            ? <Pricings/>
                            : 'voice' === route
                                ? <Voice/>
                                : 'rcs' === route
                                    ? <Rcs/>
                                    : 'numbers' === route
                                        ? <Numbers/>
                                        : <Lookup/>
        }

        <BottomNav/>
    </StackedLayout>
}

