import Store from 'electron-store';

import {LookupResponse} from '../components/Lookup/types';
import {IOptions} from '../components/Options/types';
import {SmsDump} from './sendSms';
import {Contact} from 'sms77-client';

const options: IOptions = {
    apiKey: '',
    from: 'sms77io',
    signature: '',
    signaturePosition: 'append',
    to: '',
};

export type ILocalStore = {
    contacts: Contact[],
    history: SmsDump[],
    lookups: LookupResponse[],
    options: IOptions,
}

const defaults: ILocalStore = {
    contacts: [],
    history: [],
    lookups: [],
    options,
};

const localStore = new Store<ILocalStore>({
    defaults,
});

export class LocalStore {
    static get(mixed: any): { [k: string]: any } | string | number | undefined {
        return localStore.get(mixed);
    }

    static set(key: any, value?: any): void {
        undefined === value
            ? localStore.set(key)
            : localStore.set(key, value);
    }

    static append(key: string, value: any): void {
        const list = LocalStore.get(key);

        if (Array.isArray(list)) {
            list.push(value);

            LocalStore.set(key, list);
        } else {
            LocalStore.set(key, [value]);
        }
    }
}