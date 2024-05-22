import {useTheme} from '@mui/material'
import Backdrop from '@mui/material/Backdrop'
import CircularProgress from '@mui/material/CircularProgress'
import Container from '@mui/material/Container'
import {useEffect, useState} from 'react'
import {useTranslation} from 'react-i18next'
import {addSnackbar, setBackdrop, setNav} from '../../store/actions'
import {useAppDispatch, useAppSelector} from '../../store'
import {LocalStore} from '../../util/LocalStore'
import {Contacts} from '../Contacts'
import {Lookup} from '../Lookup/Lookup'
import {Options} from '../Options/Options'
import {Pricings} from '../Pricing/Pricings'
import {Sms} from '../Sms/Sms'
import {Voice} from '../Voice/Voice'
import {BottomNav} from './BottomNav'
import {Snackbars} from './Snackbars'
import {TopNav} from './TopNav'

export const Layout = () => {
    const theme = useTheme()
    const {t} = useTranslation()
    const dispatch = useAppDispatch()
    const {backdrop, nav} = useAppSelector(({backdrop, nav}) => ({
        backdrop,
        nav,
    }))
    const [options, setOptions] = useState(LocalStore.get('options'))
    const {apiKey} = options
    //const apiKey = LocalStore.get('options.apiKey', '')

    useEffect(() => {
        LocalStore.onDidChange('options', opts => {
            opts && setOptions(opts)
        })

        if ('' === apiKey) {
            dispatch(addSnackbar(t('pleaseSetApiKey', {ns: 'translation'})))

            dispatch(setNav('options'))
        }
    }, [])

    /*    useEffect(() => {
            if ('' === apiKey) {
                dispatch(addSnackbar(t('pleaseSetApiKey', {ns: 'translation'})))

                dispatch(setNav('options'))
            }
        }, [apiKey])*/


    return <>
        <TopNav/>

        <Backdrop
            open={backdrop}
            onClick={() => dispatch(setBackdrop(false))}
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
                'sms' === nav
                    ? <Sms/>
                    : 'options' === nav
                        ? <Options/>
                        : 'contacts' === nav
                            ? <Contacts/>
                            : 'pricing' === nav
                                ? <Pricings/>
                                : 'voice' === nav
                                    ? <Voice/>
                                    : <Lookup/>
            }
        </Container>

        <BottomNav/>
    </>
}

