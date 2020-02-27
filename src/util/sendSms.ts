import Sms77Client from 'sms77-client';

import {notify} from './notify';
import {LocalStore} from './LocalStore';
import {SendSmsProps} from '../types';

export const sendSms = async ({text, to, from}: SendSmsProps): Promise<string> => {
    let res = null;
    const errors = [];

    const opts = (() => {
        const opts: any = {
            json: 1,
            text,
            to,
        };

        if ('string' === typeof from && from.length) {
            opts.from = from;
        }

        return opts;
    })();

    const apiKey = LocalStore.get('options.apiKey');

    to = to.length ? to : LocalStore.get('options.to') as string;

    from = from.length ? from : LocalStore.get('options.from') as string;

    if (errors.length) {
        errors.unshift('Error(s) while sending:');

        const notification = errors.join('\n');

        await notify(notification);

        return notification;
    } else {
        const lines = [];

        res = await (new Sms77Client(apiKey as string, 'desktop')).sms(opts);

        const {balance, messages, sms_type, success, total_price} = res;

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

        await notify(notification);

        return notification;
    }
};