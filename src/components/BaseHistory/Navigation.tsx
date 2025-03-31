import {ArrowLeftIcon, ArrowRightIcon} from '@heroicons/react/16/solid'
import type {NavigationBaseProps, Operator} from '../../types'
import {NavigationBaseButton} from './NavigationBaseButton'

export type NavigationProps = NavigationBaseProps & {
    onNavigation: (i: number) => void
}

type NavButtonProps = {
    operator: Operator
}

export const Navigation = ({index, list, onNavigation}: NavigationProps) => {
    const handleNavigation = (o: Operator): void => {
        //console.log('handleNavigation', o)
        let newIndex = '+' === o ? index + 1 : index - 1

        if (!list[newIndex]) {
            newIndex = '+' === o ? newIndex - 1 : newIndex + 1
        }

        onNavigation(newIndex)
    }

    const NavButton = ({operator}: NavButtonProps) => {
        const isPlus = '+' === operator

        return <NavigationBaseButton
            Icon={isPlus ? ArrowRightIcon : ArrowLeftIcon}
            ButtonProps={{
                onClick: () => handleNavigation(operator),
                style: {[isPlus ? 'right' : 'left']: '0px'},
            }}
            index={index}
            list={list}
            operator={operator}
        />
    }

    return <>
        <NavButton operator='-'/>

        <NavButton operator='+'/>
    </>
}
