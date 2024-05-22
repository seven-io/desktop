import type {IOptions} from './types'
import {BoolInput} from '../BoolInput'
import {useTranslation} from 'react-i18next'
import {useState} from 'react'
import {LocalStore} from '../../util/LocalStore'

export default () => {
    const {t} = useTranslation()
    const [state, setState] = useState(LocalStore.get('options'))

    return <BoolInput<IOptions>
        label={`${t('expertMode')} (${t('savedAutomatically')})`}
        setState={({expertMode}) => {
            setState({...state, expertMode})

            LocalStore.set('options.expertMode', expertMode)
        }}
        state={state}
        stateKey='expertMode'
    />
}