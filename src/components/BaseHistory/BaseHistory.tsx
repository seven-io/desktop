import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableContainer from '@mui/material/TableContainer'
import {useEffect, useState} from 'react'
import {type ILocalStore, LocalStore} from '../../util/LocalStore'
import {usePrevious} from '../../util/usePrevious'
import {Navigation} from './Navigation'

export type BaseHistoryProps = {
    onNavigation?: (isCurrent: boolean) => void
    path?: string
    rowHandler: (row: any, i: number) => any
    storeKey: keyof ILocalStore
}

export function BaseHistory<T>({
                                   onNavigation,
                                   path,
                                   rowHandler,
                                   storeKey,
                               }: BaseHistoryProps) {
    const list = LocalStore.get(storeKey) as T[]
    const previousList = usePrevious<T[]>(list)
    const getLastIndex = () => {
        return list.length - 1
    }
    const [index, setIndex] = useState(getLastIndex())
    const entry = list[index]

    useEffect(() => {
        if (previousList && previousList.length !== list.length) {
            setIndex(getLastIndex())
        }
    }, [list])

    const handleOnNavigation = (n: number) => {
        setIndex(n)

        const isCurrent = n + 1 === list.length

        onNavigation && onNavigation(isCurrent)
    }

    const getRealEntry = (): any[] => {
        if (!path) {
            return [entry].flat()
        }

        let current: any = entry
        const objects = path.split('.') as (keyof T)[]

        for (const o of objects) {
            current = current[o]
        }

        return current as any[]
    }

    return <>
        {entry && <Navigation
            index={index}
            list={list}
            onNavigation={handleOnNavigation}
        />}

        <TableContainer>
            <Table size='small'>
                <TableBody>
                    {entry && getRealEntry().map(rowHandler)}
                </TableBody>
            </Table>
        </TableContainer>
    </>
}
