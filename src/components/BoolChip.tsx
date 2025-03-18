import {useTranslation} from 'react-i18next'
import {Badge} from './catalyst/badge'

export type BoolChipProps = {
    value: boolean
}

export const BoolChip = ({value}: BoolChipProps) => {
    const {t} = useTranslation()

    return <Badge
        //label={t(value.toString())}
        style={{backgroundColor: value ? 'green' : 'red', color: '#fff'}}
    >{t(value.toString())}</Badge>
}
