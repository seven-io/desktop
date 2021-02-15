import React, {ReactElement, useEffect, useState} from 'react';
import {ContactsAction} from 'sms77-client/dist/constants/byEndpoint/contacts/ContactsAction';
import {Contact as Sms77Contact} from 'sms77-client';
import {useDispatch} from 'react-redux';
import Button from '@material-ui/core/Button';
import {useTranslation} from 'react-i18next';
import {LocalStore} from '../util/LocalStore';
import {setBackdrop, setNav, setTo} from '../store/actions';
import {notify} from '../util/notify';
import {initClient} from '../util/initClient';
import {cleanPhone} from '../util/cleanPhone';
import {BaseVirtualizedTable} from './BaseVirtualizedTable';

type Contact = Pick<Sms77Contact, 'ID' | 'Name' | 'Number'> & {
    action?: ReactElement
}

export const Contacts = () => {
    const {t} = useTranslation('contacts');
    const dispatch = useDispatch();

    const cleanContacts = (contacts: Sms77Contact[]) => {
        return contacts
            .filter(c => '' !== c.Number)
            .map(c => ({
                action: <Button
                    fullWidth
                    onClick={() => handleClickSms(c)}
                    size='small'
                    variant='outlined'
                >
                    {t('sms')}
                </Button>,
                ID: c.ID,
                Name: c.Name,
                Number: cleanPhone(c.Number!),
            }));
    };

    const [contacts, setContacts] =
        useState(cleanContacts(LocalStore.get('contacts', [])));

    useEffect(() => {
        if (!contacts.length) {
            getAndStore()
                .then()
                .catch(e => notify(e.toString ? e.toString() : JSON.stringify(e)));
        }
    }, []);

    const handleClickSms = (c: Contact) => {
        dispatch(setTo(c.Number!));

        dispatch(setNav('sms'));
    };

    const getAndStore = async () => {
        dispatch(setBackdrop(true));

        const contacts = await initClient(LocalStore.get('options.apiKey'))
            .contacts({action: ContactsAction.Read, json: true}) as Contact[];

        LocalStore.set('contacts', contacts);

        setContacts(cleanContacts(contacts));

        dispatch(setBackdrop(false));
    };

    return <>
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
            <h1 style={{display: 'inline-flex'}}>{t('contacts')}</h1>

            <Button onClick={getAndStore}>
                {t('reload')}
            </Button>
        </div>

        {
            contacts.length
                ? <BaseVirtualizedTable
                    columns={[
                        {
                            dataKey: 'ID',
                            label: t('id'),
                            numeric: true,
                            width: 100,
                        },
                        {
                            dataKey: 'Number',
                            label: t('number'),
                            numeric: true,
                            width: 170,
                        },
                        {
                            dataKey: 'Name',
                            label: t('nick'),
                            width: 170,
                        },
                        {
                            dataKey: 'action',
                            label: t('sms'),
                            width: 170,
                        },
                    ]}
                    entries={contacts}
                />
                : <p>{t('noEntries')}</p>
        }
    </>;
};