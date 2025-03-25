import {useTranslation} from 'react-i18next'
import {Badge} from './catalyst/badge'

type BoolChipProps = {
    value: boolean
}

export const BoolChip = ({value}: BoolChipProps) => {
    const {t} = useTranslation()

    return <Badge
        // color={value ? 'green' : 'red'}
        style={{backgroundColor: value ? 'green' : 'red', color: '#fff'}}
    >{t(value.toString())}</Badge>
}
