import React from 'react';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import {useTranslation} from 'react-i18next';

import {EmojiPicker} from './EmojiPicker';
import {DateTimeUtils} from './DateTimeUtils';
import {SystemUtils} from './SystemUtils';

export type MessageToolbarProps = {
    onAction: (msg: string) => void
    textarea: HTMLTextAreaElement
}

export const MessageToolbar = ({onAction, textarea}: MessageToolbarProps) => {
    const {t} = useTranslation('messageToolbar');

    const setRangeText = (msg: string) => {
        textarea.setRangeText(msg, textarea.selectionStart, textarea.selectionEnd, 'end');

        onAction(textarea!.value);
    };

    return <ButtonGroup variant='text' color='primary' aria-label={t('messageUtilitiesBtnGroup')}>
        <EmojiPicker onEmojiClick={(e, data) => setRangeText(data.emoji)}/>

        <DateTimeUtils onClick={s => setRangeText(s)}/>

        <SystemUtils onClick={s => setRangeText(s)}/>
    </ButtonGroup>;
};