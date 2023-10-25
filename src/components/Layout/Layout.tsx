import {useTheme} from '@mui/material'
import Backdrop from '@mui/material/Backdrop'
import CircularProgress from '@mui/material/CircularProgress'
import Container from '@mui/material/Container'
import {useEffect, useState} from 'react'
import {useTranslation} from 'react-i18next'
import {useDispatch, useSelector} from 'react-redux'
import {addSnackbar, setBackdrop, setNav} from '../../store/actions'
import {RootState} from '../../store/reducers'
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
    const apiKey = LocalStore.get('options.apiKey', '')
    const dispatch = useDispatch()
    const {t} = useTranslation()
    const [_options, setOptions] = useState(LocalStore.get('options'))

    useEffect(() => {
        LocalStore.onDidChange('options', options => {
            options && setOptions(options)
        })

        if ('' === apiKey) {
            dispatch(addSnackbar(t('pleaseSetApiKey', {ns: 'translation'})))

            dispatch(setNav('options'))

            return
        }
    }, [])

    const {backdrop, nav} = useSelector(({backdrop, nav}: RootState) => ({
        backdrop,
        nav,
    }))

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

