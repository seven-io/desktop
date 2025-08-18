import {Field, Label} from '../Fieldset'
import {Combobox, ComboboxInput, ComboboxOption, ComboboxOptions} from '@headlessui/react'
import {CountryPricing, PricingResponse} from '@seven.io/client'
import {CountryFlag} from '../CountryFlag'
import {useState} from 'react'
import {useTranslation} from 'react-i18next'

export default ({countries, onChange, value}: {
    countries: PricingResponse['countries']
    onChange: (country: CountryPricing | null) => void
    value: CountryPricing | null
}) => {
    const {t} = useTranslation('pricing')
    const [query, setQuery] = useState('')
    const filteredCountries =
        query === ''
            ? countries
            : countries.filter((country) => {
                return country.countryName.toLowerCase().includes(query.toLowerCase())
                    || country.countryCode.toLowerCase().includes(query.toLowerCase())
                    || country.countryPrefix.toLowerCase().includes(query.toLowerCase())
            })

    return <Field>
        <Label>{t('choose')}</Label>

        <Combobox<CountryPricing|null>
            immediate
            onChange={(value) => {
                onChange(value)
            }}
            onClose={() => setQuery('')}
            value={value}
        >
            <ComboboxInput
                className='w-full dark:text-white'
                displayValue={(country?: CountryPricing) => country?.countryName ?? ''}
                onChange={(ev) => setQuery(ev.target.value)}
            />
            <ComboboxOptions anchor='bottom' className='border empty:invisible'>
                {filteredCountries.map((option, idx) => (
                    <ComboboxOption
                        className='ui-active:bg-blue-500 ui-active:text-white ui-not-active:bg-white ui-not-active:text-black dark:text-white'
                        key={idx}
                        value={option}
                    >
                        <CountryFlag pricing={option}/>&nbsp;
                        {option.countryCode} {option.countryName} {option.countryPrefix}
                    </ComboboxOption>
                ))}
            </ComboboxOptions>
        </Combobox>
    </Field>
}

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
