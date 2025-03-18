import Picker, {type PickerProps} from 'emoji-picker-react'
import {useTranslation} from 'react-i18next'
import {Dropdown, DropdownButton, DropdownItem, DropdownMenu} from '../catalyst/dropdown'

export const EmojiPicker = (props: PickerProps) => {
    const {t} = useTranslation('message')

    return <Dropdown
        //buttonText={t('toolbar.emoji')}
        //identifier='emoji'
    >
        <DropdownButton>{t('toolbar.emoji')}</DropdownButton>

        <DropdownMenu>
            <DropdownItem>
                <Picker {...props} />
            </DropdownItem>
        </DropdownMenu>
    </Dropdown>
}
