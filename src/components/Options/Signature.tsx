import {useTranslation} from 'react-i18next'
import {Description, Field, Label} from '../catalyst/fieldset'
import {Textarea, TextareaProps} from '../catalyst/textarea'

type SignatureProps = Omit<TextareaProps, 'value'> & {
    value: string
}

export type SignaturePosition = 'append' | 'prepend';

export const Signature = ({value, ...props}: SignatureProps) => {
    const {t} = useTranslation()

    return <Field>
        <Label>{t('signatureExplanation')}</Label>
        <Description>{t('savedAutomatically')}</Description>

        <Textarea
            //fullWidth
            //helperText={t('savedAutomatically')}
            //label={t('signatureExplanation')}
            //multiline
            name='signature'
            rows={3}
            value={value}
            //variant='outlined'
            {...props}
        />
    </Field>

/*    return <TextField
        fullWidth
        helperText={t('savedAutomatically')}
        label={t('signatureExplanation')}
        multiline
        name='signature'
        rows='3'
        value={value}
        variant='outlined'
        {...props}
    />*/
}
