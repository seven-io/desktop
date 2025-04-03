import React, {useContext} from 'react'
import clsx from 'clsx'
import {TableContext, TableRowContext} from './Table'

export function TableRow({
                             href,
                             target,
                             title,
                             className,
                             ...props
                         }: { href?: string; target?: string; title?: string } & React.ComponentPropsWithoutRef<'tr'>) {
    const {striped} = useContext(TableContext)

    return (
        <TableRowContext.Provider value={{href, target, title} as React.ContextType<typeof TableRowContext>}>
            <tr
                {...props}
                className={clsx(
                    className,
                    href &&
                    'has-[[data-row-link][data-focus]]:outline-2 has-[[data-row-link][data-focus]]:-outline-offset-2 has-[[data-row-link][data-focus]]:outline-blue-500 dark:focus-within:bg-white/[2.5%]',
                    striped && 'even:bg-zinc-950/[2.5%] dark:even:bg-white/[2.5%]',
                    href && striped && 'hover:bg-zinc-950/5 dark:hover:bg-white/5',
                    href && !striped && 'hover:bg-zinc-950/[2.5%] dark:hover:bg-white/[2.5%]'
                )}
            />
        </TableRowContext.Provider>
    )
}