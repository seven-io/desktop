import React from 'react';
import {useTranslation} from 'react-i18next';

export const Documentation = () => {
    const {t} = useTranslation();

    return <section>
        <h1>{t('documentation')}</h1>

        <webview id='docs' src='https://www.sms77.io/en/docs/gateway/http-api/' style={{height: '65vh'}}/>

        <h2>{t('help')}</h2>
        <p dangerouslySetInnerHTML={{__html: t('mailUs')}}/>
    </section>;
};