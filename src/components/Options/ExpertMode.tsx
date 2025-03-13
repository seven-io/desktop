import type {IOptions} from './types'
import {BoolInput} from '../BoolInput'
import {useTranslation} from 'react-i18next'
import {useState} from 'react'
import localStore from '../../util/LocalStore'

export default () => {
    const {t} = useTranslation()
    const [state, setState] = useState(localStore.get('options'))

    return <BoolInput<IOptions>
        label={`${t('expertMode')} (${t('savedAutomatically')})`}
        setState={({expertMode}) => {
            setState({...state, expertMode})

            localStore.set('options.expertMode', expertMode)
        }}
        state={state}
        stateKey='expertMode'
    />
}