import Button from '@mui/material/Button'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import {useEffect, useState} from 'react'
import {useTranslation} from 'react-i18next'
import {useDispatch} from 'react-redux'
import {cleanPhone} from '../../util/cleanPhone'
import {initClient} from '../../util/initClient'
import {notify} from '../../util/notify'
import {SET_BACKDROP} from '../../store/features/backdrop'
import {SET_TO} from '../../store/features/to'
import {SET_NAV} from '../../store/features/nav'
import Box from '@mui/material/Box'
import {Contact, ContactsResource} from '@seven.io/client'
import localStore from '../../util/LocalStore'
import SmsIcon from '@mui/icons-material/Sms'
import VoiceIcon from '@mui/icons-material/PermPhoneMsg'

export const Contacts = () => {
    const {t} = useTranslation('contacts')
    const dispatch = useDispatch()

    const cleanContacts = (contacts: Contact[]) => contacts
        .filter(c => '' !== (c.properties.mobile_number ?? ''))
        .map(c => {
            const {mobile_number, ...properties} = c.properties
            return {
                ...c,
                ...properties,
                mobile_number: cleanPhone(mobile_number!),
            }
        })

    const [contacts, setContacts] = useState(cleanContacts(localStore.get('contacts', [])))

    useEffect(() => {
        if (!contacts.length) {
            getAndStore()
                .then()
                .catch(e => notify(e.toString ? e.toString() : JSON.stringify(e)))
        }
    }, [])

    const getAndStore = async () => {
        const apiKey = localStore.get('options.apiKey')
        if (!apiKey) return

        dispatch(SET_BACKDROP(true))

        const client = initClient()
        const resource = new ContactsResource(client)
        const {data: contacts} = await resource.list()

        localStore.set('contacts', contacts)

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
                        <TableCell>{t('firstName')}</TableCell>
                        <TableCell>{t('lastName')}</TableCell>
                        <TableCell>{t('actions')}</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {contacts.map((contact, i) => <TableRow key={i}>
                        <TableCell>{contact.id}</TableCell>
                        <TableCell>{contact.properties.mobile_number}</TableCell>
                        <TableCell>{contact.properties.firstname}</TableCell>
                        <TableCell>{contact.properties.lastname}</TableCell>
                        <TableCell>
                            <Button
                                onClick={() => {
                                    dispatch(SET_TO([contact.properties.mobile_number!]))

                                    dispatch(SET_NAV('sms'))
                                }}
                            ><SmsIcon/></Button>

                            <Button
                                onClick={() => {
                                    dispatch(SET_TO([contact.properties.mobile_number!]))

                                    dispatch(SET_NAV('voice'))
                                }}
                            ><VoiceIcon/></Button>
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
