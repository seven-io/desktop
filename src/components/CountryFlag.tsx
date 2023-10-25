import {CountryPricing} from '@seven.io/api'
import React from 'react'

export type CountryFlagProps = {
    pricing: CountryPricing
}

export const CountryFlag = ({pricing}: CountryFlagProps) => {
    const toFlag = () => pricing.countryCode
        .replace('BL/GF/GP/M', 'FR') //TODO: add GP & GF as they have individual non-French flags?
        .replace('YT/RE', 'YT')
        .replace('SH, TA', 'SH')
        .toLowerCase()

    const flag = pricing.countryCode ? toFlag() : 'eu'

    return <span className={`fi fi-${flag}`}/>
}
