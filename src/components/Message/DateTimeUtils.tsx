import {useTranslation} from 'react-i18next'
import {Dropdown, DropdownButton, DropdownItem, DropdownMenu} from '../catalyst/dropdown'

export type MessageToolbarProps = {
    onClick: (label: string) => void
}

export const DateTimeUtils = ({onClick}: MessageToolbarProps) => {
    const trans = useTranslation('message')
    const t = (k: string) => trans.t(`toolbar.${k}`)

    return <Dropdown
        //buttonText={`${t('date')}/${t('time')}`}
        //identifier='date-time'
    >
        <DropdownButton>{`${t('date')}/${t('time')}`}</DropdownButton>

        <DropdownMenu>
            <DropdownItem onClick={() => onClick(Date.now().toString())}>
                {t('timestamp')}
            </DropdownItem>

            <DropdownItem onClick={() => onClick(new Date().toString())}>
                {t('date')}
            </DropdownItem>

            <DropdownItem onClick={() => onClick(new Date().toLocaleString())}>
                {t('locale')}
            </DropdownItem>

            <DropdownItem
                onClick={() => onClick(new Date().toLocaleDateString())}
            >
                {t('locale')} {t('date')}
            </DropdownItem>

            <DropdownItem
                onClick={() => onClick(new Date().toLocaleTimeString())}
            >
                {t('locale')} {t('time')}
            </DropdownItem>

            <DropdownItem onClick={() => onClick(new Date().toDateString())}>
                {t('date')}
            </DropdownItem>

            <DropdownItem onClick={() => onClick(new Date().toISOString())}>
                ISO {t('date')}
            </DropdownItem>

            <DropdownItem onClick={() => onClick(new Date().toTimeString())}>
                {t('time')}
            </DropdownItem>

            <DropdownItem onClick={() => onClick(new Date().toUTCString())}>
                UTC {t('date')}
            </DropdownItem>
        </DropdownMenu>
    </Dropdown>
}
