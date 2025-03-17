import {useTheme} from '@mui/material'
import Backdrop from '@mui/material/Backdrop'
import CircularProgress from '@mui/material/CircularProgress'
import Container from '@mui/material/Container'
import {useEffect, useState} from 'react'
import {useTranslation} from 'react-i18next'
import {useAppDispatch, useAppSelector} from '../../store'
import {Contacts} from '../Contacts/Contacts'
import {Lookup} from '../Lookup/Lookup'
import {Options} from '../Options/Options'
import {Pricings} from '../Pricing/Pricings'
import {Sms} from '../Sms/Sms'
import {Voice} from '../Voice/Voice'
import {BottomNav} from './BottomNav'
import {Snackbars} from './Snackbars'
import {TopNav} from './TopNav'
import {selectBackdropActive, SET_BACKDROP} from '../../store/features/backdrop'
import {selectRoute, SET_NAV} from '../../store/features/nav'
import {ADD_SNACKBAR} from '../../store/features/snackbars'
import localStore from '../../util/LocalStore'
import {Rcs} from '../Rcs/Rcs'

export const Layout = () => {
    const theme = useTheme()
    const {t} = useTranslation()
    const dispatch = useAppDispatch()
    const route = useAppSelector(selectRoute)
    const backdropActive = useAppSelector(selectBackdropActive)
    const [options, setOptions] = useState(localStore.get('options'))
    const {apiKey} = options
    //const apiKey = LocalStore.get('options.apiKey', '')

    useEffect(() => {
        localStore.onDidChange('options', (opts) => {
            opts && setOptions(opts)
        })

        if ('' === apiKey) {
            dispatch(ADD_SNACKBAR(t('pleaseSetApiKey', {ns: 'translation'})))

            dispatch(SET_NAV('options'))
        }
    }, [])

    /*    useEffect(() => {
            if ('' === apiKey) {
                dispatch(ADD_SNACKBAR(t('pleaseSetApiKey', {ns: 'translation'})))

                dispatch(SET_NAV('options'))
            }
        }, [apiKey])*/


    return <>
        <TopNav/>

        <Backdrop
            onClick={() => dispatch(SET_BACKDROP(false))}
            open={backdropActive}
            sx={{
                color: '#fff',
                zIndex: theme.zIndex.drawer + 1,
            }}
        >
            <CircularProgress/>
        </Backdrop>

        <Snackbars/>

        <Container component='main'>
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
                                    : 'rcs' === route ? <Rcs/> : <Lookup/>
            }
        </Container>

        <BottomNav/>
    </>
}

