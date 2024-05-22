import {useTheme} from '@mui/material'
import Typography from '@mui/material/Typography'
import {useState} from 'react'
import {useTranslation} from 'react-i18next'
import {LocalStore} from '../../util/LocalStore'
import {From} from '../From'
import {ApiKey} from './ApiKey'
import {Signature} from './Signature'
import DefaultRecipients from './DefaultRecipients'
import ExpertMode from './ExpertMode'

export const Options = () => {
    const theme = useTheme()
    const {t} = useTranslation()
    const [state, setState] = useState(LocalStore.get('options'))
    const {apiKey, from, signature} = state

    const handleChange = ({target: {name, value}}: any) => {
        setState({...state, [name]: value})

        LocalStore.set(`options.${name}`, value)
    }

    return <>
        <h1>{t('options')}</h1>

        <Typography
            component='div'
            sx={{
                '& .MuiTextField-root, .MuiFormControl-root': {
                    marginBottom: theme.spacing(3),
                },
            }}
        >
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
        </Typography>
    </>

}
