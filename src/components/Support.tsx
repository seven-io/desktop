import React from 'react';

export const Support = () => {
    return <section>
        <h1>Support</h1>

        <h2>Documentation</h2>
        <webview id="docs" src="https://www.sms77.io/en/docs/gateway/http-api/" style={{height: '75vh'}}></webview>

        <h2>Help</h2>
        <p>
            Feel free to contact us <a href='mailto: support@sms77.io'>via email</a>.
        </p>
    </section>;
};