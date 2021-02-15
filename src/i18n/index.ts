import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import de from './de';
import en from './en';

i18n
    .use(initReactI18next) // pass i18n down to react-i18next
    .init({
        resources: {
            de,
            en,
        },
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false, // react already prevents xss
        },
    })
    .then(() => {
    });

export default i18n;