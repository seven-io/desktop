import React from 'react';
import {useTranslation} from 'react-i18next';
import ButtonGroup from '@mui/material/ButtonGroup';
import {DateTimeUtils} from './DateTimeUtils';
import {EmojiPicker} from './EmojiPicker';
import {SystemUtils} from './SystemUtils';

export type ToolbarProps = {
    emoji?: boolean
    onAction: (msg: string) => void
    textarea: HTMLTextAreaElement
}

export const Toolbar = ({emoji, onAction, textarea}: ToolbarProps) => {
    const {t} = useTranslation('message');

    const setRangeText = (msg: string) => {
        textarea.setRangeText(
            msg, textarea.selectionStart, textarea.selectionEnd, 'end');

        onAction(textarea!.value);
    };

    return <ButtonGroup variant='text' aria-label={t('toolbar.label')}>
        {emoji && <EmojiPicker
            onEmojiClick={(e, d) => setRangeText(e.emoji)}
        />}

        <DateTimeUtils onClick={setRangeText}/>
        <SystemUtils onClick={setRangeText}/>
    </ButtonGroup>;
};
