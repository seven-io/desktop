import {CountryPricing} from '@seven.io/api'
import {Network} from './Network'

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
    </>
}
