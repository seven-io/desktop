import {ThemeProvider} from '@mui/material'
import CssBaseline from '@mui/material/CssBaseline'
import {LicenseInfo, LocalizationProvider} from '@mui/x-date-pickers-pro'
import {AdapterDateFns} from '@mui/x-date-pickers/AdapterDateFns'
import {createRoot} from 'react-dom/client'
import {Provider} from 'react-redux'
import {Layout} from './components/Layout/Layout'
import './i18n'
import {store} from './store'
import theme from './theme'

LicenseInfo.setLicenseKey('c0c2b3a27d008be5e3ed217631b306b4Tz00NTA4MixFPTE2ODU4ODIyMjc0MDgsUz1wcm8sTE09c3Vic2NyaXB0aW9uLEtWPTI=')

const container = document.getElementById('app')!
const root = createRoot(container)
const children = <Provider store={store}>
    <LocalizationProvider dateAdapter={AdapterDateFns}>
        <ThemeProvider theme={theme}>
            <CssBaseline enableColorScheme/>

            <Layout/>
        </ThemeProvider>
    </LocalizationProvider>
</Provider>

root.render(children)
