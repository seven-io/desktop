import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {useDispatch} from 'react-redux';
import Sms77Client, {Contact as Sms77Contact} from 'sms77-client';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

import {Contact} from './Contact';
import {LocalStore} from '../../util/LocalStore';
import {addSnackbar, setNav, setTo} from '../../store/actions';
import {notify} from '../../util/notify';

export const Contacts = () => {
    const {t} = useTranslation('contacts');
    const dispatch = useDispatch();
    const apiKey = LocalStore.get('options.apiKey');
    const [contacts, setContacts] = useState<Sms77Contact[]>(LocalStore.get('contacts') as Sms77Contact[]);

    useEffect(() => {
        if ('' === apiKey) {
            dispatch(addSnackbar(t('pleaseSetApiKey', {ns: 'translation'})));

            dispatch(setNav('options'));
        } else {
            getAndStore()
                .then()
                .catch(e => notify(e.toString ? e.toString() : JSON.stringify(e)));
        }
    }, []);

    const getAndStore = async () => {
        let contacts = LocalStore.get('contacts') as Sms77Contact[];

        if (!Array.isArray(contacts)) {
            const client = new Sms77Client(apiKey as string);

            contacts = await client.contacts({action: 'read', json: true,}) as Sms77Contact[];

            LocalStore.set('contacts', contacts);

            setContacts(contacts);
        }
    };

    return <>
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
            <h1 style={{display: 'inline-flex'}}>{t('contacts')}</h1>

            <Button onClick={() => getAndStore()}>
                {t('reload')}
            </Button>
        </div>

        {
            Array.isArray(contacts)
                ? <Grid spacing={2} container justify='center' alignItems='center'>
                    {contacts.map((c, i) => <Grid key={i} item md={6} lg={4}>
                        <Button size='small' fullWidth disabled={0 === c.number.length} onClick={() => {
                            dispatch(setTo(c.number));

                            dispatch(setNav('send'));
                        }} variant='outlined'>{t('send')}</Button>

                        <Contact key={i} contact={c}/>
                    </Grid>)}
                </Grid>
                : <p>{t('noEntries')}</p>
        }
    </>;
};