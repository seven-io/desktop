import {Table} from '../Table/Table'
import {useEffect, useState} from 'react'
import {AvailableNumber, NumbersResource, OrderNumberParams} from '@seven.io/client'
import {initClient} from '../../util/initClient'
import {useTranslation} from 'react-i18next'
import {Button} from '../Button'
import {Fieldset, Label, Legend} from '../Fieldset'
import {Radio, RadioField, RadioGroup} from '../Radio'
import {PaymentInterval} from '@seven.io/client/dist/resources/numbers/types'
import {TableRow} from '../Table/TableRow'
import {TableHeader} from '../Table/TableHeader'
import {TableCell} from '../Table/TableCell'
import {TableBody} from '../Table/TableBody'
import {TableHead} from '../Table/TableHead'

const currency = '€'
const paymentIntervals = ['monthly', 'annually'] as const

export default function AvailableNumbers() {
    const {t} = useTranslation('numbers')
    const [working, setWorking] = useState(false)
    const [entries, setEntries] = useState<AvailableNumber[]>([])
    const [orderParams, setOrderParams] = useState<OrderNumberParams>({
        number: '',
        payment_interval: 'annually'
    })
    const resource = new NumbersResource(initClient())

    useEffect(() => {
        const fetchAvailableNumbers = async () => {
            const response = await resource.listAvailable({})
            setEntries(response.availableNumbers)
        }

        fetchAvailableNumbers()
    }, [])

    return <>
        <Fieldset>
            <Legend>{t('order.paymentInterval.title')}</Legend>

            <RadioGroup
                aria-label={t('order.paymentInterval.title')}
                value={orderParams.payment_interval}
                onChange={payment_interval => setOrderParams({...orderParams, payment_interval: payment_interval as PaymentInterval})}
            >
                {
                    paymentIntervals
                        .map((type, i) => {
                            return <RadioField key={i}>
                                <Radio value={type} />
                                <Label>{t(`order.paymentInterval.${type}`)}</Label>
                            </RadioField>
                        })
                }
            </RadioGroup>
        </Fieldset>
        <Table>
            <caption>{t('available.title')}</caption>
            <TableHead>
                <TableRow>
                    <TableHeader>{t('available.country')}</TableHeader>
                    <TableHeader>{t('available.number')}</TableHeader>
                    <TableHeader>{t('available.fees.basicCharge')} {t('available.fees.annually')}</TableHeader>
                    <TableHeader>{t('available.fees.setup')} {t('available.fees.annually')}</TableHeader>
                    <TableHeader>{t('available.fees.basicCharge')} {t('available.fees.monthly')}</TableHeader>
                    <TableHeader>{t('available.fees.setup')} {t('available.fees.monthly')}</TableHeader>
                    <TableHeader>{t('available.fees.inbound.sms')}</TableHeader>
                    <TableHeader>{t('available.fees.inbound.voice')}</TableHeader>
                    <TableHeader>{t('available.features.a2pSms')}</TableHeader>
                    <TableHeader>{t('available.features.sms')}</TableHeader>
                    <TableHeader>{t('available.features.voice')}</TableHeader>
                    <TableHeader />
                </TableRow>
            </TableHead>
            <TableBody>
                {entries.map(entry => {
                    return <TableRow>
                        <TableCell>{entry.country}</TableCell>
                        <TableCell>{entry.number_parsed}</TableCell>
                        <TableCell>{entry.fees.annually.basic_charge} {currency}</TableCell>
                        <TableCell>{entry.fees.annually.setup} {currency}</TableCell>
                        <TableCell>{entry.fees.monthly.basic_charge} {currency}</TableCell>
                        <TableCell>{entry.fees.monthly.setup} {currency}</TableCell>
                        <TableCell>{entry.fees.sms_mo} {currency}</TableCell>
                        <TableCell>{entry.fees.voice_mo} {currency}</TableCell>
                        <TableCell>{entry.features.a2p_sms ? '✅' : '❌'}</TableCell>
                        <TableCell>{entry.features.sms ? '✅' : '❌'}</TableCell>
                        <TableCell>{entry.features.voice ? '✅' : '❌'}</TableCell>
                        <TableCell>
                            <Button disabled={working} onClick={async () => {
                                setWorking(true)

                                try {
                                    const res = await resource.order(orderParams)
                                }
                                 catch (e) {

                                 }
                                 finally {
                                    setWorking(false)
                                }
                            }}>{t('order.title')}</Button>
                        </TableCell>
                    </TableRow>
                })}
            </TableBody>
        </Table>
    </>
}