import Picker, {type PickerProps} from 'emoji-picker-react'
import {useTranslation} from 'react-i18next'
import {Popover, PopoverButton, PopoverPanel} from '@headlessui/react'
import {Button} from "../Button";

export const EmojiPicker = (props: PickerProps) => {
    const {t} = useTranslation('message')


    return    <Popover className="relative">
        <PopoverButton as={Button}>{t('toolbar.emoji')}</PopoverButton>
        <PopoverPanel anchor="bottom" className="flex flex-col">
            <Picker {...props} />
        </PopoverPanel>
    </Popover>
}
