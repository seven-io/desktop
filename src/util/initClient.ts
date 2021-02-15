import Sms77Client from 'sms77-client';
import {LocalStore} from './LocalStore';

export const initClient = (apiKey: string = LocalStore.get('options.apiKey')) => {
    return new Sms77Client(apiKey, 'Desktop');
};