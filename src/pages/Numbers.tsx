import {useTranslation} from 'react-i18next'
import {Heading} from '../components/Heading'
import AvailableNumbers from '../components/Numbers/AvailableNumbers'
import ActiveNumbers from '../components/Numbers/ActiveNumbers'

export const Numbers = () => {
    const {t} = useTranslation('numbers')

    return <>
        <Heading>{t('h1')}</Heading>

        <ActiveNumbers />

        <AvailableNumbers />
    </>
}
