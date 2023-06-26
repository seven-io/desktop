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
        apiKey: 'API-Schlüssel',
        balance: 'Guthaben',
        chooseLanguage: 'Sprache wählen',
        close: 'Schließen',
        contacts: 'Kontakte',
        documentation: 'Dokumentation',
        expertMode: 'Expertenmodus',
        help: 'Hilfe',
        history: 'Nachrichtenverlauf',
        lookup: 'Lookup',
        mailUs: 'Wir sind gerne <a href="mailto: support@seven.io">via E-Mail</a> erreichbar.',
        ok: 'OK',
        onePlusRecipient: 'Empfänger getrennt durch Komma',
        options: 'Optionen',
        pleaseSetApiKey: 'Bitte den API-Schlüssel von seven.io setzen.',
        pricing: 'Preise',
        required: 'erforderlich',
        savedAutomatically: 'Automatisch gespeichert',
        senderIdentifier: 'Absenderkennung',
        signatureExplanation: 'Signatur eingefügt in ausgehende Nachrichten',
        sms: 'SMS',
        socialsBtnGroup: 'seven in sozialen Medien',
        support: 'Support',
        toggleApiKeyVisibility: 'API-Schlüsesel ein/- oder ausblenden',
        voice: 'Voice',
    },
};
