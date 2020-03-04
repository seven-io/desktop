import {SignaturePosition} from './Signature';

export type IOptions = {
    apiKey: string,
    from: string,
    signature: string,
    signaturePosition: SignaturePosition,
    to: string,
};