import React, {RefObject} from 'react';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import PopupStateComp, {bindMenu, bindTrigger} from 'material-ui-popup-state';
import {PopupState} from 'material-ui-popup-state/core';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import {useTranslation} from 'react-i18next';

export type MessageToolbarProps = {
    onAction: (msg: string) => void
    textarea: RefObject<HTMLTextAreaElement>
}

export const MessageToolbar = ({onAction, textarea}: MessageToolbarProps) => {
    let popupState: PopupState;

    const {t} = useTranslation('messageToolbar');

    const setRangeText = (msg: string) => {
        popupState.close();

        //@ts-ignore
        textarea.current.setRangeText(msg, textarea.current.selectionStart, textarea.current.selectionEnd, 'end');

        onAction(textarea.current.value);
    };

    return <ButtonGroup variant='text' color='primary' aria-label={t('dateTimeBtnGroup')}>
        <PopupStateComp variant='popover' popupId='date-time-popup-menu'>
            {_popupState => {
                popupState = _popupState;

                return <>
                    <Button aria-controls='date-menu' aria-haspopup='true' variant='contained'
                            color='primary' {...bindTrigger(popupState)}>
                        Date/Time
                    </Button>

                    <Menu id='date-time-popup-menu' {...bindMenu(popupState)}>
                        <MenuItem onClick={() => setRangeText(Date.now().toString())}>
                            {t('timestamp')}&nbsp;<code>Date.now().toString()</code></MenuItem>
                        <MenuItem onClick={() => setRangeText(new Date().toString())}>
                            {t('date')}&nbsp;<code>new Date().toString()</code></MenuItem>
                        <MenuItem onClick={() => setRangeText(new Date().toLocaleString())}>
                            {t('locale')}&nbsp;<code>new Date().toLocaleString()</code></MenuItem>
                        <MenuItem
                            onClick={() => setRangeText(new Date().toLocaleDateString())}>
                            {t('locale')} {t('date')}&nbsp;
                            <code>new Date().toLocaleDateString()</code></MenuItem>
                        <MenuItem
                            onClick={() => setRangeText(new Date().toLocaleTimeString())}>
                            {t('locale')} {t('time')}&nbsp;
                            <code>new Date().toLocaleTimeString()</code></MenuItem>
                        <MenuItem onClick={() => setRangeText(new Date().toDateString())}>
                            {t('date')}&nbsp;<code>new Date().toDateString()</code></MenuItem>
                        <MenuItem onClick={() => setRangeText(new Date().toISOString())}>
                            ISO&nbsp;<code>new Date().toISOString()</code></MenuItem>
                        <MenuItem onClick={() => setRangeText(new Date().toTimeString())}>
                            {t('time')}&nbsp;<code>new Date().toTimeString()</code></MenuItem>
                        <MenuItem onClick={() => setRangeText(new Date().toUTCString())}>
                            UTC&nbsp;<code>new Date().toUTCString()</code></MenuItem>
                    </Menu>
                </>;
            }}
        </PopupStateComp>
    </ButtonGroup>;
};