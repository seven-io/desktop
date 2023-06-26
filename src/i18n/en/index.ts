import {sms} from './sms';
import {history} from './history';
import {contacts} from './contacts';
import {message} from './message';
import {pricing} from './pricing';
import {lookup} from './lookup';
import {voice} from './voice';

export default {
    contacts,
    history,
    lookup,
    pricing,
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
        ok: 'OK',
        onePlusRecipient: 'Recipient(s) separated by comma',
        options: 'Options',
        pleaseSetApiKey: 'Please set your API key from seven.io.',
        pricing: 'Pricing',
        required: 'required',
        savedAutomatically: 'Saved automatically',
        senderIdentifier: 'Sender Identifier',
        signatureExplanation: 'Signature added to all outgoing messages',
        sms: 'SMS',
        socialsBtnGroup: 'social media button group',
        support: 'Support',
        toggleApiKeyVisibility: 'Toggle API key visibility',
        voice: 'Voice',
    },
};
