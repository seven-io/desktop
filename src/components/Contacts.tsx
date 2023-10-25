import Button from '@mui/material/Button'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import {Contact as SevenContact} from '@seven.io/api'
import {ContactsAction} from '@seven.io/api/dist/constants/byEndpoint/contacts/ContactsAction'
import {ReactElement, useEffect, useState} from 'react'
import {useTranslation} from 'react-i18next'
import {useDispatch} from 'react-redux'
import {setBackdrop, setNav, setTo} from '../store/actions'
import {cleanPhone} from '../util/cleanPhone'
import {initClient} from '../util/initClient'
import {LocalStore} from '../util/LocalStore'
import {notify} from '../util/notify'

type Contact = Pick<SevenContact, 'ID' | 'Name' | 'Number'> & {
    action?: ReactElement
}

export const Contacts = () => {
    const {t} = useTranslation('contacts')
    const dispatch = useDispatch()

    const cleanContacts = (contacts: SevenContact[]) => {
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
            }))
    }

    const [contacts, setContacts] =
        useState(cleanContacts(LocalStore.get('contacts', [])))

    useEffect(() => {
        if (!contacts.length) {
            getAndStore()
                .then()
                .catch(e => notify(e.toString ? e.toString() : JSON.stringify(e)))
        }
    }, [])

    const handleClickSms = (c: Contact) => {
        dispatch(setTo(c.Number!))

        dispatch(setNav('sms'))
    }

    const getAndStore = async () => {
        dispatch(setBackdrop(true))

        const contacts = await initClient(LocalStore.get('options.apiKey'))
            .contacts({action: ContactsAction.Read, json: true}) as Contact[]

        LocalStore.set('contacts', contacts)

        setContacts(cleanContacts(contacts))

        dispatch(setBackdrop(false))
    }

    return <>
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
            <h1 style={{display: 'inline-flex'}}>{t('contacts')}</h1>

            <Button onClick={getAndStore}>
                {t('reload')}
            </Button>
        </div>

        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>{t('id')}</TableCell>
                        <TableCell>{t('number')}</TableCell>
                        <TableCell>{t('nick')}</TableCell>
                        <TableCell>{t('sms')}</TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {contacts.map((contact, i) => <TableRow key={i}>
                        <TableCell>{contact.ID}</TableCell>
                        <TableCell>{contact.Number}</TableCell>
                        <TableCell>{contact.Name}</TableCell>
                        <TableCell>{contact.action}</TableCell>
                    </TableRow>)}
                </TableBody>
            </Table>
        </TableContainer>

        {
            !contacts.length && <p>{t('noEntries')}</p>
        }
    </>
}
