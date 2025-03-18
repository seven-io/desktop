import {useEffect, useState} from 'react'
import {useTranslation} from 'react-i18next'
import {useDispatch} from 'react-redux'
import {cleanPhone} from '../../util/cleanPhone'
import {initClient} from '../../util/initClient'
import {notify} from '../../util/notify'
import {SET_BACKDROP} from '../../store/features/backdrop'
import {SET_TO, SET_TO_RCS} from '../../store/features/to'
import {SET_NAV} from '../../store/features/nav'
import {type Contact, ContactsResource} from '@seven.io/client'
import localStore from '../../util/LocalStore'
import {Button} from '../catalyst/button'
import {Table, TableBody, TableCell, TableHead, TableRow} from '../catalyst/table'
import {EnvelopeIcon, PencilSquareIcon, PhoneIcon} from '@heroicons/react/16/solid'

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
        <div className='flex justify-between'>
            <h1 className='inline-flex'>{t('contacts')}</h1>

            <Button onClick={getAndStore}>{t('reload')}</Button>
        </div>

        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>{t('id')}</TableCell>
                    <TableCell>{t('number')}</TableCell>
                    <TableCell>{t('firstName')}</TableCell>
                    <TableCell>{t('lastName')}</TableCell>
                    <TableCell>{t('email')}</TableCell>
                    <TableCell>{t('birthday')}</TableCell>
                    <TableCell>{t('address')}</TableCell>
                    <TableCell>{t('zip')}</TableCell>
                    <TableCell>{t('city')}</TableCell>
                    <TableCell>{t('notes')}</TableCell>
                    <TableCell>{t('actions')}</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {contacts.map((contact, i) => <TableRow key={i}>
                    <TableCell>{contact.id}</TableCell>
                    <TableCell>{contact.properties.mobile_number}</TableCell>
                    <TableCell>{contact.properties.firstname}</TableCell>
                    <TableCell>{contact.properties.lastname}</TableCell>
                    <TableCell>{contact.properties.email}</TableCell>
                    <TableCell>{contact.properties.birthday}</TableCell>
                    <TableCell>{contact.properties.address}</TableCell>
                    <TableCell>{contact.properties.postal_code}</TableCell>
                    <TableCell>{contact.properties.city}</TableCell>
                    <TableCell>{contact.properties.notes}</TableCell>
                    <TableCell>
                        <Button
                            onClick={() => {
                                dispatch(SET_TO([contact.properties.mobile_number!]))

                                dispatch(SET_NAV('sms'))
                            }}
                        ><EnvelopeIcon/></Button>

                        <Button
                            onClick={() => {
                                dispatch(SET_TO([contact.properties.mobile_number!]))

                                dispatch(SET_NAV('voice'))
                            }}
                        ><PhoneIcon/></Button>

                        <Button
                            onClick={() => {
                                dispatch(SET_TO_RCS(contact.properties.mobile_number!))

                                dispatch(SET_NAV('rcs'))
                            }}
                        ><PencilSquareIcon/></Button>
                    </TableCell>
                </TableRow>)}
            </TableBody>
        </Table>

        {
            !contacts.length && <p>{t('noEntries')}</p>
        }
    </>
}
