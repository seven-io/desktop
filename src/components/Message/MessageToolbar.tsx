import React from 'react';
import {useTranslation} from 'react-i18next';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import {DateTimeUtils} from './DateTimeUtils';

export const setRangeText = (msg: string, {textarea, onAction}: MessageToolbarProps) => {
    textarea.setRangeText(
        msg, textarea.selectionStart, textarea.selectionEnd, 'end');

    onAction(textarea!.value);
};

export type MessageToolbarProps = {
    Addons?: JSX.Element
    onAction: (msg: string) => void
    textarea: HTMLTextAreaElement
}

export const MessageToolbar = ({Addons, ...props}: MessageToolbarProps) => {
    const {t} = useTranslation('sms');

    return <ButtonGroup variant='text' aria-label={t('toolbar.label')}>
        {Addons}

        <DateTimeUtils onClick={s => setRangeText(s, props)}/>
    </ButtonGroup>;
};