import {CountryPricing, PricingResource, PricingResponse} from '@seven.io/client'
import {useEffect, useState} from 'react'
import {useTranslation} from 'react-i18next'
import {useDispatch} from 'react-redux'
import {initClient} from '../../util/initClient'
import {CountryFlag} from '../CountryFlag'
import {Pricing} from './Pricing'
import {SET_BACKDROP} from '../../store/features/backdrop'
import localStore from '../../util/LocalStore'
import {Button} from '../catalyst/button'
import {Table, TableBody, TableCell, TableHeader, TableRow} from '../catalyst/table'
import {Field, Label} from '../catalyst/fieldset'
import {Combobox, ComboboxInput, ComboboxOption, ComboboxOptions} from '@headlessui/react'

export const Pricings = () => {
    const {t} = useTranslation('pricing')
    const [country, setCountry] = useState<CountryPricing | null>(null)
    const dispatch = useDispatch()
    const [pricing, setPricing] = useState(localStore.get<'pricing', PricingResponse>('pricing'))
    const [query, setQuery] = useState('')

    useEffect(() => {
        if (!pricing) {
            getAndStore()
                .then()
                .catch(console.error)
        }
    }, [])

    const getAndStore = async () => {
        dispatch(SET_BACKDROP(true))
        const pricing = await (new PricingResource(initClient())).get()
        dispatch(SET_BACKDROP(false))
        localStore.set('pricing', pricing)
        setPricing(pricing)
    }

    const filteredCountries =
        query === ''
            ? pricing.countries
            : pricing.countries.filter((country) => {
                return country.countryName.toLowerCase().includes(query.toLowerCase())
                    || country.countryCode.toLowerCase().includes(query.toLowerCase())
                    || country.countryPrefix.toLowerCase().includes(query.toLowerCase())
            })

    return <>
        <div className='flex justify-between'>
            <h1 className='inline-flex'>{t('pricing')}</h1>
            <Button onClick={() => getAndStore()}>{t('reload')}</Button>
        </div>

        <Table className='mb-4' aria-label={t('ariaLabels.countryTable')}>
            <caption>{t('ariaLabels.countryTable')}</caption>
            <TableBody>
                {pricing &&
                    ([
                        'countCountries',
                        'countNetworks',
                    ] as (keyof PricingResponse)[])
                        .map((o, i) => <TableRow key={i}>
                            <TableHeader scope='row'>{t(o)}</TableHeader>
                            <TableCell align='right'>{pricing[o].toString()}</TableCell>
                        </TableRow>)}
            </TableBody>
        </Table>

        {pricing && <Field>
            <Label>{t('choose')}</Label>

            <Combobox<CountryPricing>
                immediate
                onChange={(value) => {
                    setCountry(value)
                }}
                onClose={() => setQuery('')}
                value={country ?? undefined}
            >
                <ComboboxInput
                    className='w-full'
                    displayValue={(country?: CountryPricing) => country?.countryName ?? ''}
                    onChange={(ev) => setQuery(ev.target.value)}
                />
                <ComboboxOptions anchor='bottom' className='border empty:invisible'>
                    {filteredCountries.map((option, idx) => (
                        <ComboboxOption
                            className='ui-active:bg-blue-500 ui-active:text-white ui-not-active:bg-white ui-not-active:text-black'
                            key={idx}
                            value={option}
                        >
                            <CountryFlag pricing={option}/>&nbsp;
                            {option.countryCode} {option.countryName} {option.countryPrefix}
                        </ComboboxOption>
                    ))}
                </ComboboxOptions>
            </Combobox>
        </Field>}

  {/*      {pricing && <Autocomplete<CountryPricing>
            getOptionLabel={o => `${o.countryCode} ${o.countryName} ${o.countryPrefix}`}
            onChange={(_ev, cP: CountryPricing | null) => setCountry(cP)}
            options={pricing.countries}
            renderOption={(p, o) => <Box component='li' {...p} key={o.countryCode}>
                <CountryFlag pricing={o}/>&nbsp;
                {` ${o.countryCode} ${o.countryName} ${o.countryPrefix}`}
            </Box>}
            renderInput={params => <TextField
                {...params}
                label={t('choose')}
                variant='outlined'
            />}
        />}*/}

        {country && <Pricing pricing={country}/>}
    </>
}
