import {send} from './send';
import {messageToolbar} from './messageToolbar';
import {system} from './system';
import {history} from './history';
import {contacts} from './contacts';
import {pricing} from './pricing';
import {lookup} from './lookup';

export default {
    contacts,
    history,
    lookup,
    messageToolbar,
    pricing,
    send,
    system,
    translation: {
        apiKeyRequired: 'API key from sms77.io required for sending',
        close: 'Close',
        contacts: 'Contacts',
        documentation: 'Documentation',
        help: 'Help',
        history: 'Message History',
        lookup: 'Lookup',
        mailUs: 'Feel free to contact us <a href="mailto: support@sms77.io">via email</a>.',
        markedFieldsRequired: 'Fields marked with a * are required.',
        onePlusNumberContact: 'One or more number(s) and/or contact(s) separated by comma e.g. +4901234567890,Peter',
        onePlusRecipient: 'Recipient(s)',
        options: 'Options',
        optionsSavedAutomatically: 'All options are saved automatically after changing.',
        pricing: 'Pricing',
        senderIdentifier: 'Sender Identifier',
        signatureExplanation: 'Signature added to all outgoing messages',
        sms: 'SMS',
        socialsBtnGroup: 'social media button group',
        support: 'Support',
        systemInfo: 'System Information',
    },
};