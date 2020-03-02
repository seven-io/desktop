import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {useDispatch} from 'react-redux';
import Sms77Client, {Contact as IContact} from 'sms77-client';
import Button from '@material-ui/core/Button';

import {Contact} from './Contact';
import {LocalStore} from '../util/LocalStore';
import {addSnackbar, setNav} from '../store/actions';

export const Contacts = () => {
    const {t} = useTranslation('contacts');
    const dispatch = useDispatch();
    const apiKey = LocalStore.get('options.apiKey');

    useEffect(() => {
        if ('' === apiKey) {
            dispatch(addSnackbar(t('pleaseSetApiKey')));

            dispatch(setNav('options'));
        } else {
            getAndStore(apiKey as string)
                .then(c => console.assert(Array.isArray(c)))
                .catch(e => console.error(e));
        }
    }, []);

    const [contacts, setContacts] = useState<IContact[]>(LocalStore.get('contacts') as IContact[]);

    const getAndStore = async (apiKey: string) => {
        const client = new Sms77Client(apiKey as string);

        const contacts: IContact[] = await client.contacts({action: 'read', json: true,}) as IContact[];

        LocalStore.set('contacts', contacts);

        setContacts(contacts);

        return contacts;
    };

    return <>
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
            <h1 style={{display: 'inline-flex'}}>{t('contacts')}</h1>

            <Button onClick={() => getAndStore(apiKey as string)}>
                {t('reload')}
            </Button>
        </div>

        {
            Array.isArray(contacts)
                ? contacts.map(c => <Contact contact={c}/>)
                : <p>{t('noEntries')}</p>
        }
    </>;
};