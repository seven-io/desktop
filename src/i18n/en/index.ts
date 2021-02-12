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
        close: 'Close',
        contacts: 'Contacts',
        documentation: 'Documentation',
        expertMode: 'Expert Mode',
        help: 'Help',
        history: 'Message History',
        lookup: 'Lookup',
        mailUs: 'Feel free to contact us <a href="mailto: support@sms77.io">via email</a>.',
        markedFieldsRequired: 'Fields marked with a * are required.',
        ok: 'OK',
        onePlusNumberContact: 'One or more number(s) and/or contact(s) separated by comma e.g. +4901234567890,Peter',
        onePlusRecipient: 'Recipient(s) separated by comma',
        options: 'Options',
        optionsSavedAutomatically: 'All options are saved automatically after changing.',
        pleaseSetApiKey: 'Please set your API key from sms77.io.',
        pricing: 'Pricing',
        required: 'required',
        savedAutomatically: 'Saved automatically',
        senderIdentifier: 'Sender Identifier',
        signatureExplanation: 'Signature added to all outgoing messages',
        sms: 'SMS',
        socialsBtnGroup: 'social media button group',
        support: 'Support',
        systemInfo: 'System Information',
        toggleApiKeyVisibility: 'Toggle API key visibility',
        voice: 'Voice',
    },
};