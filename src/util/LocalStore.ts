import type {Contact} from '@seven.io/api'
import ElectronStore from 'electron-store'
import Conf from 'conf/dist/source/index.d'
import type {LookupResponse} from '../components/Lookup/types'
import type {IOptions} from '../components/Options/types'
import type {VoiceDump} from '../components/Voice/History'
import type {SmsDump} from './sendSms'

export type ILocalStore = {
    balance: number | null
    contacts: Contact[],
    history: SmsDump[],
    lookups: LookupResponse[],
    options: IOptions,
    voices: VoiceDump[],
}

export type ArrayOption = keyof Omit<ILocalStore, 'options' | 'balance'>
export type ArrayStorageVal<T extends ArrayOption> =
    ILocalStore[T]
    | ILocalStore[T][number]

export const localStoreDefaults: ILocalStore = {
    balance: null,
    contacts: [],
    history: [],
    lookups: [],
    options: {
        apiKey: '',
        expertMode: false,
        from: 'seven',
        language: 'us',
        signature: '',
        signaturePosition: 'append',
        to: '',
    },
    voices: [],
}

class AppStore extends ElectronStore<ILocalStore> {
    public append<T extends ArrayOption>(
        this: Conf,
        key: ArrayOption,
        value: ArrayStorageVal<T>
    ): void {
        const stored = this.get(key)
        const append = Array.isArray(value) ? value : [value]

        this.set(key, Array.isArray(stored) ? [
            ...stored,
            ...append,
        ] : append)
    }
}

export const LocalStore = new AppStore({
    defaults: localStoreDefaults,
})
