import MenuItem from '@mui/material/MenuItem'
import Picker, {PickerProps} from 'emoji-picker-react'
import React from 'react'
import {useTranslation} from 'react-i18next'
import {PopupMenu} from '../PopupMenu'

export const EmojiPicker = (props: PickerProps) => <PopupMenu
    buttonText={useTranslation('message').t('toolbar.emoji')}
    identifier='emoji'
>
    <MenuItem>
        <Picker {...props} />
    </MenuItem>
</PopupMenu>
