import {LocalStore} from './LocalStore';

export const addSignature = async (text: string) => {
    const signature = LocalStore.get('options.signature');
    const signaturePosition = LocalStore.get('options.signaturePosition');

    if ('string' === typeof signature) {
        text = 'append' === signaturePosition
            ? `${text}${signature}`
            : `${signature}${text}`;
    }

    return text;
};