import {send} from './send';
import {messageToolbar} from './messageToolbar';
import {system} from './system';
import {history} from './history';
import {contacts} from './contacts';

export default {
    contacts,
    history,
    messageToolbar,
    send,
    system,
    translation: {
        'apiKeyRequired': 'API key from sms77.io required for sending',
        'SMS': 'SMS',
        'options': 'Options',
        'support': 'Support',
        'documentation': 'Documentation',
        'senderIdentifier': 'Sender Identifier',
        'onePlusNumberContact': 'One or more number(s) and/or contact(s) separated by comma e.g. +4901234567890,Peter',
        'onePlusRecipient': 'Recipient(s)',
        'optionsSavedAutomatically': 'All options are saved automatically after changing.',
        'markedFieldsRequired': 'Fields marked with a * are required.',
        'signatureExplanation': 'Signature added to all outgoing messages',
        'help': 'Help',
        'mailUs': 'Feel free to contact us <a href="mailto: support@sms77.io">via email</a>.',
        'socialsBtnGroup': 'social media button group',
        'systemInfo': 'System Information',
        'history': 'Message History',
        'contacts': 'Contacts',
    },
};