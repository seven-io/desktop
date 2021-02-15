import React from 'react';
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import {NavigationBaseButton} from './NavigationBaseButton';
import {NavigationBaseProps, Operator} from '../../types';

export type NavigationProps = NavigationBaseProps & {
    onNavigation: (i: number) => void
}

type NavButtonProps = {
    operator: Operator
}

export const Navigation = ({index, list, onNavigation}: NavigationProps) => {
    const handleNavigation = (o: Operator): void => {
        let newIndex = '+' === o ? index + 1 : index - 1;

        if (!list[newIndex]) {
            newIndex = '+' === o ? newIndex - 1 : newIndex + 1;
        }

        onNavigation(newIndex);
    };

    const NavButton = ({operator}: NavButtonProps) => {
        const isPlus = '+' === operator;

        return <NavigationBaseButton
            Icon={isPlus ? ArrowRightIcon : ArrowLeftIcon}
            IconButtonProps={{
                onClick: () => handleNavigation(operator),
                style: {[isPlus ? 'right' : 'left']: '0px'},
            }}
            index={index}
            list={list}
            operator={operator}
        />;
    };

    return <>
        <NavButton operator='-'/>

        <NavButton operator='+'/>
    </>;
};