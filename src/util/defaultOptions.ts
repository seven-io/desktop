export type SignaturePosition = 'append' | 'prepend';

export type Configuration = {
    apiKey: string,
    from: string,
    signature: string,
    signaturePosition: SignaturePosition,
    to: string,
};

export const defaultOptions: Configuration = {
    apiKey: '',
    from: 'sms77io',
    signature: '',
    signaturePosition: 'append',
    to: '',
};