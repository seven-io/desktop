import {useTranslation} from 'react-i18next'
import {useState} from 'react'
import localStore from '../../util/LocalStore'
import {Switch, SwitchField} from '../catalyst/switch'
import {Label} from '../catalyst/fieldset'

export default () => {
    const {t} = useTranslation()
    const [state, setState] = useState(localStore.get('options'))

    return <SwitchField>
        <Label>{t('expertMode')} ({t('savedAutomatically')})</Label>
        <Switch
            onChange={(expertMode) => {
                setState({...state, expertMode})

                localStore.set('options.expertMode', expertMode)
            }}
        />
    </SwitchField>

/*    return <BoolInput<IOptions>
        label={`${t('expertMode')} (${t('savedAutomatically')})`}
        setState={({expertMode}) => {
            setState({...state, expertMode})

            localStore.set('options.expertMode', expertMode)
        }}
        state={state}
        stateKey='expertMode'
    />*/
}