import {ThemeProvider} from '@mui/material'
import CssBaseline from '@mui/material/CssBaseline'
import {LicenseInfo} from '@mui/x-license'
import {LocalizationProvider} from '@mui/x-date-pickers-pro'
import {AdapterDateFns} from '@mui/x-date-pickers/AdapterDateFnsV3'
import {createRoot} from 'react-dom/client'
import {Provider as StoreProvider} from 'react-redux'
import {Layout} from './components/Layout/Layout'
import './i18n'
import {store} from './store'
import theme from './theme'
import {de} from 'date-fns/locale/de'

LicenseInfo.setLicenseKey('c0c2b3a27d008be5e3ed217631b306b4Tz00NTA4MixFPTE2ODU4ODIyMjc0MDgsUz1wcm8sTE09c3Vic2NyaXB0aW9uLEtWPTI=')

createRoot(document.getElementById('app')!).render(<StoreProvider store={store}>
    <LocalizationProvider adapterLocale={de} dateAdapter={AdapterDateFns}>
        <ThemeProvider theme={theme}>
            <CssBaseline enableColorScheme/>

            <Layout/>
        </ThemeProvider>
    </LocalizationProvider>
</StoreProvider>)
