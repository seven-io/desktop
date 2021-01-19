import Sms77Client from 'sms77-client';

export const initClient = (apiKey: string) => new Sms77Client(apiKey, 'Desktop');