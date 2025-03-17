import {useState} from 'react'
import {RcsPartialProps, sendRcs} from '../../util/sendRcs'
import {RcsOptions} from './RcsOptions'
import {RcsMessage} from './RcsMessage'

export const Rcs = () => {
    const [params, setParams] = useState<RcsPartialProps>({})

    return <RcsMessage
        dispatchFn={p => sendRcs({...p, options: {...p.options, ...params}})}
        emoji
        FormAddons={<RcsOptions params={params} setParams={setParams}/>}
    />
}
