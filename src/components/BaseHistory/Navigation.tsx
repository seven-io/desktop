import React from 'react';
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';

import {NavigationBaseButton} from './NavigationBaseButton';
import {NavigationBaseProps} from './types';

export type NavigationProps = NavigationBaseProps & {
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
        <NavigationBaseButton index={index} list={list}
                              IconButtonProps={{style: {left: '0px'}, onClick: () => handleNavigation('-')}}
                              Icon={ArrowLeftIcon} operator='-'/>


        <NavigationBaseButton index={index} list={list}
                              IconButtonProps={{style: {right: '0px'}, onClick: () => handleNavigation('+')}}
                              Icon={ArrowRightIcon} operator='+'/>
    </>;
};