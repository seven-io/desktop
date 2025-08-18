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
        <Heading className='mb-5'>{t('options')}</Heading>

        <div>
            <ApiKey
                autoFocus={!apiKey.length}
                onChange={value => handleChange({
                    name: 'apiKey',
                    value,
                })}
                value={apiKey}
            />

            <div className='mt-3'>
                <DefaultFrom
                    onChange={value => handleChange({name: 'from', value})}
                    value={from}
                />
            </div>

            <div className='mt-3'>
                <DefaultRecipients/>
            </div>

            <div className='mt-3'>
                <Signature onChange={e => handleChange({name: 'signature', value: e.target.value})} value={signature}/>
            </div>

            <div className='mt-3'>
                <ExpertMode/>
            </div>
        </div>
    </>

}
