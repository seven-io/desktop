import React from 'react';
import {CountryPricing} from 'sms77-client';
import {Network} from './Network';

export type CountryNetworksProps = {
    networks: CountryPricing['networks']
}

export const CountryNetworks = ({networks}: CountryNetworksProps) => {
    return <>
        {
            networks.map((n, i) => <Network
                index={i}
                key={i}
                network={n}
                networks={networks}
            />)
        }
    </>;
};