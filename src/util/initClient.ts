import SevenClient from '@seven.io/api'
import {LocalStore} from './LocalStore'

export const initClient = (apiKey: string = LocalStore.get('options.apiKey')) => {
    return new SevenClient(apiKey, 'Desktop')
}
