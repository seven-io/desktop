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
        notification: 'Nachricht',
        ok: 'OK',
        recipients: 'Empfänger',
        options: 'Optionen',
        pleaseSetApiKey: 'Bitte den API-Schlüssel von seven.io setzen.',
        pricing: 'Preise',
        required: 'erforderlich',
        savedAutomatically: 'Automatisch gespeichert',
        senderIdentifier: 'Absenderkennung',
        signatureExplanation: 'Signatur eingefügt in ausgehende Nachrichten',
        rcs: 'RCS',
        sms: 'SMS',
        socialsBtnGroup: 'seven in sozialen Medien',
        support: 'Support',
        toggleApiKeyVisibility: 'API-Schlüsesel ein/- oder ausblenden',
        voice: 'Voice',
        numbers: 'Rufnummern'
    },
}
