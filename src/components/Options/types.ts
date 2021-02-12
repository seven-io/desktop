import {SignaturePosition} from './Signature';

export type IOptions = {
    apiKey: string,
    expertMode: boolean,
    from: string,
    signature: string,
    signaturePosition: SignaturePosition,
    to: string,
};