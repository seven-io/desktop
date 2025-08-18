import {useState} from 'react'
import {useTranslation} from 'react-i18next'
import {ApiKey} from '../components/Options/ApiKey'
import {Signature} from '../components/Options/Signature'
import DefaultRecipients from '../components/Options/DefaultRecipients'
import ExpertMode from '../components/Options/ExpertMode'
import localStore from '../util/LocalStore'
import {IOptions} from '../components/Options/types'
import {Heading} from '../components/Heading'
import {DefaultFrom} from "../components/Options/DefaultFrom";

export const Options = () => {
    const {t} = useTranslation()
    const [state, setState] = useState(localStore.get('options'))
    const {apiKey, from, signature} = state

    const handleChange = ({name, value}: {name: keyof IOptions, value: any}) => {
        setState({...state, [name]: value})
        localStore.set(`options.${name}`, value)
    }

    return <>
        <Heading>{t('options')}</Heading>

        <div>
            <ApiKey
                autoFocus={!apiKey.length}
                onChange={value => handleChange({
                    name: 'apiKey',
                    value,
                })}
                value={apiKey}
            />

            <DefaultFrom
                onChange={value => handleChange({name: 'from', value})}
                value={from}
            />

            <DefaultRecipients/>

            <Signature onChange={e => handleChange({name: 'signature', value: e.target.value})} value={signature}/>

            <ExpertMode/>
        </div>
    </>

}
