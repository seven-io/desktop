import Store from 'electron-store';
import {defaultOptions} from './defaultOptions';

const defaults = {
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
}