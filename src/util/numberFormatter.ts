import localStore from './LocalStore'

export const getNumberFormatter = (): Intl.NumberFormat => {
    const locale = localStore.get('options.language')
    const locales: string[] = []

    if ('us' === locale) {
        locales.push('en-US')
    } else if ('de' === locale) {
        locales.push('de-DE')
    }

    return new Intl.NumberFormat(locales, {
        currency: 'EUR',
        style: 'currency',
    })
}
