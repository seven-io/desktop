import {Client, RcsDispatchParams, RcsDispatchResponse, RcsResource,} from '@seven.io/client'
import type {CommonMessagePropKeys} from '../components/Message/Message'
import {notify} from './notify'
import localStore from './LocalStore'

export type RcsPartialProps = Omit<RcsDispatchParams, CommonMessagePropKeys>
export type RcsDump = {
    errors: string[]
    notification: string
    opts: RcsDispatchParams
    res: RcsDispatchResponse
};

export const sendRcs = async (p: {
    client: Client
    options: RcsDispatchParams
}): Promise<string> => {
    const lines = []
    const res = await (new RcsResource(p.client)).dispatch(p.options)
    const {balance, messages, sms_type, success, total_price} = res

    if (100 === Number.parseInt(success)) {
        lines.push(
            `${messages.length} ${sms_type} RCS sent valued at ${total_price} €. Balance: ${balance}`,
        )

        for (const rcs of messages) {
            let line = ''

            if (rcs.success) {
                line += `#${rcs.id} ${rcs.parts}x valued at`
                line += ` ${rcs.price} sent to ${rcs.recipient} from ${rcs.sender}: ${rcs.text}`
            } else {
                line += `#${rcs.id} failed sending to ${rcs.recipient}`
                line += ` from ${rcs.sender} with encoding ${rcs.sender}: ${rcs.encoding}`
            }

            rcs.messages && rcs.messages.forEach(msg => line += ` / ${msg}`)

            lines.push(line)
        }
    } else {
        lines.push(`Error sending RCS to "${p.options.to}": ${JSON.stringify(res)}`)
    }

    const dump: RcsDump = {
        errors: [],
        notification: lines.join('\n'),
        opts: p.options,
        res,
    }

    localStore.set('rcsHistory', [...localStore.get('rcsHistory'), dump])

    await notify(dump.notification)

    return dump.notification
}
