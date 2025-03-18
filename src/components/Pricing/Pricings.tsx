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

    return <>
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
            <h1 style={{display: 'inline-flex'}}>{t('pricing')}</h1>
            <Button onClick={() => getAndStore()}>{t('reload')}</Button>
        </div>

        <Table className='mb-4' aria-label={t('ariaLabels.countryTable')} >
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
                onChange={(value) => {
                    setCountry(value)
                }}
            >
                <ComboboxInput
                    //onChange={(event) => setQuery(event.target.value)}
                />
                <ComboboxOptions>
                    {pricing.countries.map((option, idx) => (
                        <ComboboxOption key={idx} value={option}>
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
