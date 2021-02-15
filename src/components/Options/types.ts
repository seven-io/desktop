import {SignaturePosition} from './Signature';

export type Language = 'de' | 'us'

export type IOptions = {
    apiKey: string
    expertMode: boolean
    from: string
    language: Language
    signature: string
    signaturePosition: SignaturePosition
    to: string
};