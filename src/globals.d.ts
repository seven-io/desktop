import {ILocalStore} from './util/LocalStore'

export {}

declare global {
    import  Conf from 'electron-store'

    interface Window {
        electron: {
            store: Conf<ILocalStore>
        }
        store: Conf<ILocalStore>
    }
}