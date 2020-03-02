import Sms77Client, {SmsJsonResponse, SmsParams} from 'sms77-client';

import {notify} from './notify';
import {LocalStore} from './LocalStore';

export type SendSmsProps = {
    text: string
    to: string
    from: string
}

export type SmsDump = { res: SmsJsonResponse, notification: string, errors: string[], opts: SmsParams };

const getOpts = (text: string, to: string, from?: string): SmsParams => {
    const opts: any = {
        json: 1,
        text,
        to,
    };

    if ('string' === typeof from && from.length) {
        opts.from = from;
    }

    return opts;
};

export const sendSms = async ({text, to, from}: SendSmsProps): Promise<string> => {
    let res = null;
    const errors = [];

    const apiKey = LocalStore.get('options.apiKey');

    if ('' === apiKey) {
        errors.push('API key missing!');
    } else {
        to = to.length ? to : LocalStore.get('options.to') as string;

        from = from.length ? from : LocalStore.get('options.from') as string;
    }

    const opts = getOpts(text, to, from);

    if (errors.length) {
        errors.unshift('Error(s) while sending:');

        const notification = errors.join('\n');

        await notify(notification);

        return notification;
    }

    const lines = [];

    res = await (new Sms77Client(apiKey as string, 'desktop')).sms(opts);

    const {balance, messages, sms_type, success, total_price} = res as SmsJsonResponse;

    if (100 === Number.parseInt(success)) {
        lines.push(
            `${messages.length} ${sms_type} SMS sent valued at ${total_price} €. Balance: ${balance}`
        );

        for (const sms of messages) {
            let line = '';

            if (sms.success) {
                line += `#${sms.id} ${sms.parts}x valued at`;
                line += ` ${sms.price} sent to ${sms.recipient} from ${sms.sender}: ${sms.text}`;
            } else {
                line += `#${sms.id} failed sending to ${sms.recipient}`;
                line += ` from ${sms.sender} with encoding ${sms.sender}: ${sms.encoding}`;
            }

            sms.messages && sms.messages.forEach((msg: string) => line += ` / ${msg}`);

            lines.push(line);
        }
    } else {
        lines.push(`An error occured while sending SMS to "${to}": ${JSON.stringify(res)}`);
    }

    const notification = lines.join('\n');

    const dump: SmsDump = {res: res as SmsJsonResponse, notification, errors, opts};

    LocalStore.append('history', dump);

    await notify(notification);

    return notification;
};