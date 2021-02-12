import ElectronStore from 'electron-store';
import {Contact} from 'sms77-client';
import {LookupResponse} from '../components/Lookup/types';
import {IOptions} from '../components/Options/types';
import {SmsDump} from './sendSms';
import {VoiceDump} from '../components/Voice/History';

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
        from: 'sms77io',
        signature: '',
        signaturePosition: 'append',
        to: '',
    },
    voices: [],
};

export const LocalStore = new (class AppStore extends ElectronStore<ILocalStore> {
    append<T extends ArrayOption>(key: ArrayOption, value: ArrayStorageVal<T>): void {
        const stored = this.get(key);
        const append = Array.isArray(value) ? value : [value];

        this.set(key, Array.isArray(stored) ? [...stored, ...append] : append);
    }
})({
    defaults: localStoreDefaults,
});