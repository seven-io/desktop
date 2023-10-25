import type {SmsJsonResponse, SmsParams} from '@seven.io/api'
import type {
    CommonMessagePropKeys,
    CommonMessageProps,
    DispatchProps,
    MessageDispatchProps,
} from '../components/Message/Message'
import {LocalStore} from './LocalStore'
import {notify} from './notify'

export type SmsPartialProps = Omit<SmsParams, CommonMessagePropKeys>
export type SendSmsProps = MessageDispatchProps<SmsPartialProps>
export type SmsDump = {
    errors: string[]
    notification: string
    opts: SmsParams
    res: SmsJsonResponse
};

export const getOpts = (text: string, to: string, from?: string): CommonMessageProps => {
    const opts: SmsParams = {
        text,
        to,
    }

    if ('string' === typeof from && from.length) {
        opts.from = from
    }

    return opts
}

export const sendSms = async (p: DispatchProps<SendSmsProps>): Promise<string> => {
    const lines = []
    const res = await p.client.sms(p.options) as SmsJsonResponse
    const {balance, messages, sms_type, success, total_price} = res

    if (100 === Number.parseInt(success)) {
        lines.push(
            `${messages.length} ${sms_type} SMS sent valued at ${total_price} €. Balance: ${balance}`,
        )

        for (const sms of messages) {
            let line = ''

            if (sms.success) {
                line += `#${sms.id} ${sms.parts}x valued at`
                line += ` ${sms.price} sent to ${sms.recipient} from ${sms.sender}: ${sms.text}`
            } else {
                line += `#${sms.id} failed sending to ${sms.recipient}`
                line += ` from ${sms.sender} with encoding ${sms.sender}: ${sms.encoding}`
            }

            sms.messages && sms.messages.forEach(msg => line += ` / ${msg}`)

            lines.push(line)
        }
    } else {
        lines.push(`Error sending SMS to "${p.options.to}": ${JSON.stringify(res)}`)
    }

    const dump: SmsDump = {
        errors: [],
        notification: lines.join('\n'),
        opts: p.options,
        res: res as SmsJsonResponse,
    }

    LocalStore.append('history', dump)

    await notify(dump.notification)

    return dump.notification
}
