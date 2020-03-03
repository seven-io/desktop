import MenuItem from '@material-ui/core/MenuItem';
import Picker, {IEmojiPickerProps} from 'emoji-picker-react';
import React from 'react';

import {PopupMenu} from '../PopupMenu';

export const EmojiPicker = (props: IEmojiPickerProps) => <PopupMenu buttonText='Emoji' identifier='emoji'>
    <MenuItem>
        <Picker {...props} />
    </MenuItem>
</PopupMenu>;