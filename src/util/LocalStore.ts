import type {Contact} from '@seven.io/client'
import type {LookupResponse} from '../components/Lookup/types'
import type {IOptions} from '../components/Options/types'
import type {VoiceDump} from '../components/Voice/History'
import type {SmsDump} from './sendSms'
import Store from 'electron-store'
import {RcsDump} from './sendRcs'

export type ILocalStore = {
    balance: number | null
    contacts: Contact[],
    history: SmsDump[],
    lookups: LookupResponse[],
    options: IOptions,
    rcsHistory: RcsDump[],
    voices: VoiceDump[],
}

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
        to: [],
    },
    rcsHistory: [],
    voices: [],
}

export default new Store<ILocalStore>({
    defaults: localStoreDefaults,
})
