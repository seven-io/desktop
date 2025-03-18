import {createRoot} from 'react-dom/client'
import {Provider as StoreProvider} from 'react-redux'
import {Layout} from './components/Layout/Layout'
import './i18n'
import {store} from './store'

createRoot(document.getElementById('app')!).render(<StoreProvider store={store}>
    <Layout/>
</StoreProvider>)
