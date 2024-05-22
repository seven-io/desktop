import Button from '@mui/material/Button'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import type {Contact} from '@seven.io/api'
import {ContactsAction} from '@seven.io/api/dist/constants/byEndpoint/contacts/ContactsAction'
import {useEffect, useState} from 'react'
import {useTranslation} from 'react-i18next'
import {useDispatch} from 'react-redux'
import {cleanPhone} from '../util/cleanPhone'
import {initClient} from '../util/initClient'
import {LocalStore} from '../util/LocalStore'
import {notify} from '../util/notify'
import {SET_BACKDROP} from '../store/features/backdrop'
import {SET_TO} from '../store/features/to'
import {SET_NAV} from '../store/features/nav'
import Box from '@mui/material/Box'
import ButtonGroup from '@mui/material/ButtonGroup'

export const Contacts = () => {
    const {t} = useTranslation('contacts')
    const dispatch = useDispatch()

    const cleanContacts = (contacts: Contact[]) => contacts
        .filter(c => '' !== (c.Number ?? ''))
        .map(c => ({
            ID: c.ID,
            Name: c.Name,
            Number: cleanPhone(c.Number!),
        }))

    const [contacts, setContacts] = useState(cleanContacts(LocalStore.get('contacts', [])))

    useEffect(() => {
        if (!contacts.length) {
            getAndStore()
                .then()
                .catch(e => notify(e.toString ? e.toString() : JSON.stringify(e)))
        }
    }, [])

    const getAndStore = async () => {
        dispatch(SET_BACKDROP(true))

        const contacts = await initClient()
            .contacts({action: ContactsAction.Read, json: true}) as Contact[]

        LocalStore.set('contacts', contacts)

        setContacts(cleanContacts(contacts))

        dispatch(SET_BACKDROP(false))
    }

    return <>
        <Box display='flex' justifyContent='space-between'>
            <h1 style={{display: 'inline-flex'}}>{t('contacts')}</h1>

            <Button onClick={getAndStore}>{t('reload')}</Button>
        </Box>

        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>{t('id')}</TableCell>
                        <TableCell>{t('number')}</TableCell>
                        <TableCell>{t('nick')}</TableCell>
                        <TableCell>{t('actions')}</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {contacts.map((contact, i) => <TableRow key={i}>
                        <TableCell>{contact.ID}</TableCell>
                        <TableCell>{contact.Number}</TableCell>
                        <TableCell>{contact.Name}</TableCell>
                        <TableCell>
                            <ButtonGroup fullWidth size='small' variant='outlined'>
                                <Button
                                    onClick={() => {
                                        dispatch(SET_TO([contact.Number]))

                                        dispatch(SET_NAV('sms'))
                                    }}
                                >{t('sms')}</Button>

                                <Button
                                    onClick={() => {
                                        dispatch(SET_TO([contact.Number]))

                                        dispatch(SET_NAV('voice'))
                                    }}
                                >{t('voice')}</Button>
                            </ButtonGroup>
                        </TableCell>
                    </TableRow>)}
                </TableBody>
            </Table>
        </TableContainer>

        {
            !contacts.length && <p>{t('noEntries')}</p>
        }
    </>
}
