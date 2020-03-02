import Store from 'electron-store';

import {defaultOptions} from './defaultOptions';

const defaults = {
    history: [],
    options: defaultOptions,
};

const localStore = new Store({defaults});

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