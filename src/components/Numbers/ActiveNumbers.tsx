import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from '../Table'
import {useEffect, useState} from 'react'
import {type ActiveNumber, NumbersResource} from '@seven.io/client'
import {initClient} from '../../util/initClient'
import {useTranslation} from 'react-i18next'

const currency = '€'

export default function ActiveNumbers() {
    const {t} = useTranslation('numbers')
    const [entries, setEntries] = useState<ActiveNumber[]>([])
    const resource = new NumbersResource(initClient())

    useEffect(() => {
        const fetchActiveNumbers = async () => {
            const response = await resource.listActive()
            setEntries(response.activeNumbers)
        }

        fetchActiveNumbers()
    }, [])

    return <>
        <Table>
            <caption>{t('active.title')}</caption>
            <TableHead>
                <TableRow>
                    <TableHeader>{t('active.name')}</TableHeader>
                    <TableHeader>{t('active.country')}</TableHeader>
                    <TableHeader>{t('active.number')}</TableHeader>
                    <TableHeader>{t('active.created')}</TableHeader>
                    <TableHeader>{t('active.expires')}</TableHeader>
                    <TableHeader>{t('active.forward.sms')}</TableHeader>
                    <TableHeader>{t('active.forward.mail')}</TableHeader>
                    <TableHeader>{t('active.paymentInterval')}</TableHeader>
                    <TableHeader>{t('active.fees.basicCharge')} {currency}</TableHeader>
                    <TableHeader>{t('active.fees.setup')} {currency}</TableHeader>
                    <TableHeader>{t('active.fees.inbound.sms')} {currency}</TableHeader>
                    <TableHeader>{t('active.fees.inbound.voice')} {currency}</TableHeader>
                    <TableHeader>{t('active.features.a2pSms')}</TableHeader>
                    <TableHeader>{t('active.features.sms')}</TableHeader>
                    <TableHeader>{t('active.features.voice')}</TableHeader>
                </TableRow>
            </TableHead>
            <TableBody>
                {entries.map(entry => {
                    return <TableRow>
                        <TableCell>{entry.friendly_name}</TableCell>
                        <TableCell>{entry.country}</TableCell>
                        <TableCell>{entry.number}</TableCell>
                        <TableCell>{entry.created}</TableCell>
                        <TableCell>{entry.expires}</TableCell>
                        <TableCell>{entry.forward_sms_mo.sms.number.join(',')}</TableCell>
                        <TableCell>{entry.forward_sms_mo.email.address.join(',')}</TableCell>
                        <TableCell>{entry.billing.payment_interval}</TableCell>
                        <TableCell>{entry.billing.fees.basic_charge} {currency}</TableCell>
                        <TableCell>{entry.billing.fees.setup} {currency}</TableCell>
                        <TableCell>{entry.billing.fees.sms_mo} {currency}</TableCell>
                        <TableCell>{entry.billing.fees.voice_mo} {currency}</TableCell>
                        <TableCell>{entry.features.a2p_sms ? '✅' : '❌'}</TableCell>
                        <TableCell>{entry.features.sms ? '✅' : '❌'}</TableCell>
                        <TableCell>{entry.features.voice ? '✅' : '❌'}</TableCell>
                    </TableRow>
                })}
            </TableBody>
        </Table>
    </>
}