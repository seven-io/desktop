import React from 'react';
import {useTranslation} from 'react-i18next';
import ButtonGroup from '@material-ui/core/ButtonGroup';

import {EmojiPicker} from './EmojiPicker';
import {DateTimeUtils} from './DateTimeUtils';

export type MessageToolbarProps = {
    onAction: (msg: string) => void
    textarea: HTMLTextAreaElement
}

export const MessageToolbar = ({onAction, textarea}: MessageToolbarProps) => {
    const {t} = useTranslation('send');

    const setRangeText = (msg: string) => {
        textarea.setRangeText(msg, textarea.selectionStart, textarea.selectionEnd, 'end');

        onAction(textarea!.value);
    };

    return <ButtonGroup variant='text' aria-label={t('toolbar.label')}>
        <EmojiPicker onEmojiClick={(e, data) => setRangeText(data.emoji)}/>

        <DateTimeUtils onClick={s => setRangeText(s)}/>
    </ButtonGroup>;
};