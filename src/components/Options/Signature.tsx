import {useTranslation} from 'react-i18next'
import {Description, Field, Label} from '../Fieldset'
import {Textarea, TextareaProps} from '../Textarea'

type SignatureProps = Omit<TextareaProps, 'value'> & {
    value: string
}

export type SignaturePosition = 'append' | 'prepend';

export const Signature = ({value, ...props}: SignatureProps) => {
    const {t} = useTranslation()

    return <Field>
        <div className='flex justify-between'>
            <Label>{t('signatureExplanation')}</Label>
            <Description>{t('savedAutomatically')}</Description>
        </div>

        <Textarea
            name='signature'
            rows={3}
            value={value}
            {...props}
        />
    </Field>
}
