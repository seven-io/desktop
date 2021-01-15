import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {useDispatch} from 'react-redux';
import Sms77Client, {Contact as Sms77Contact} from 'sms77-client';
import Button from '@material-ui/core/Button';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import List from '@material-ui/core/List';

import {notify} from '../util/notify';
import {LocalStore} from '../util/LocalStore';
import {addSnackbar, setBackdrop, setNav, setTo} from '../store/actions';

export const Contacts = () => {
    const {t} = useTranslation('contacts');
    const dispatch = useDispatch();
    const apiKey = LocalStore.get<string>('options.apiKey');
    const [contacts, setContacts] = useState(LocalStore.get<Sms77Contact[]>('contacts'));

    useEffect(() => {
        if ('' === apiKey) {
            dispatch(addSnackbar(t('pleaseSetApiKey', {ns: 'translation'})));

            dispatch(setNav('options'));

            return;
        }

        if (!contacts.length) {
            getAndStore()
                .then()
                .catch(e => notify(e.toString ? e.toString() : JSON.stringify(e)));
        }
    }, []);

    const getAndStore = async () => {
        dispatch(setBackdrop(true));
        const contacts = await (new Sms77Client(apiKey, 'Shopify'))
            .contacts({action: 'read', json: true,}) as Sms77Contact[];
        dispatch(setBackdrop(false));

        LocalStore.set('contacts', contacts);

        setContacts(contacts);
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
                ? <List>
                    {contacts.map((c, i) => <ListItem button key={i}>
                        <ListItemText primary={`${c.nick} ● ${c.number} ● ${c.email}`}/>

                        <ListItemSecondaryAction>
                            <Button disabled={0 === c.number.length} fullWidth onClick={() => {
                                dispatch(setTo(c.number));

                                dispatch(setNav('send'));
                            }} size='small' variant='outlined'>{t('send')}</Button>
                        </ListItemSecondaryAction>
                    </ListItem>)}
                </List>
                : <p>{t('noEntries')}</p>
        }
    </>;
};