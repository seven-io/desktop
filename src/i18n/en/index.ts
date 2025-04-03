import {sms} from './sms'
import {history} from './history'
import {contacts} from './contacts'
import {message} from './message'
import {pricing} from './pricing'
import {lookup} from './lookup'
import {voice} from './voice'
import {rcs} from './rcs'
import {numbers} from './numbers'

export default {
    numbers,
    contacts,
    history,
    lookup,
    pricing,
    rcs,
    sms,
    voice,
    message,
    translation: {
        apiKey: 'API Key',
        balance: 'Balance',
        close: 'Close',
        contacts: 'Contacts',
        documentation: 'Documentation',
        expertMode: 'Expert Mode',
        help: 'Help',
        history: 'Message History',
        lookup: 'Lookup',
        mailUs: 'Feel free to contact us <a href="mailto: support@seven.io">via email</a>.',
        notification: 'Notification',
        ok: 'OK',
        recipients: 'Recipients',
        options: 'Options',
        pleaseSetApiKey: 'Please set your API key from seven.io.',
        pricing: 'Pricing',
        rcs: 'RCS',
        required: 'required',
        savedAutomatically: 'Saved automatically',
        senderIdentifier: 'Sender Identifier',
        signatureExplanation: 'Signature added to all outgoing messages',
        sms: 'SMS',
        socialsBtnGroup: 'social media button group',
        support: 'Support',
        toggleApiKeyVisibility: 'Toggle API key visibility',
        voice: 'Voice',
        numbers: 'Numbers'
    },
}
