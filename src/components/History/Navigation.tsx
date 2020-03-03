import React from 'react';

import {PreviousListItemButton} from './PreviousListItemButton';
import {NextListItemButton} from './NextListItemButton';

export type NavigationProps = {
    index: number
    list: any[]
    onNavigation: (i: number) => void
}

export const Navigation = ({index, list, onNavigation}: NavigationProps) => {
    const handleNavigation = (operator: '+' | '-'): void => {
        let newIndex: number = eval(`${index} ${operator} 1`);

        if (!list[newIndex]) {
            newIndex = eval(`${newIndex} ${'+' === operator ? '-' : '+'} 1`);
        }

        onNavigation(newIndex);
    };

    return <>
        <PreviousListItemButton index={index} list={list}
                                IconButtonProps={{onClick: () => handleNavigation('-')}}/>

        <NextListItemButton index={index} list={list}
                            IconButtonProps={{onClick: () => handleNavigation('+')}}/>
    </>;
};