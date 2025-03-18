import {useState} from 'react'
import {useTranslation} from 'react-i18next'
import {From} from '../From'
import {ApiKey} from './ApiKey'
import {Signature} from './Signature'
import DefaultRecipients from './DefaultRecipients'
import ExpertMode from './ExpertMode'
import localStore from '../../util/LocalStore'

export const Options = () => {
    const {t} = useTranslation()
    const [state, setState] = useState(localStore.get('options'))
    const {apiKey, from, signature} = state

    const handleChange = ({target: {name, value}}: any) => {
        setState({...state, [name]: value})

        localStore.set(`options.${name}`, value)
    }

    return <>
        <h1>{t('options')}</h1>

        <div>
            <ApiKey
                autoFocus={!apiKey.length}
                onChange={value => handleChange({
                    target: {
                        name: 'apiKey',
                        value,
                    },
                })}
                value={apiKey}
            />

            <From
                helperText={t('savedAutomatically')}
                onChange={value => handleChange({target: {name: 'from', value}})}
                value={from}
            />

            <DefaultRecipients/>

            <Signature onChange={handleChange} value={signature}/>

            <ExpertMode/>
        </div>
    </>

}
