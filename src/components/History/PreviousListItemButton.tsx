import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import React from 'react';

import {NavigationBaseButton, NavigationBaseButtonBaseProps} from './NavigationBaseButton';

export const PreviousListItemButton = (props: NavigationBaseButtonBaseProps) => {
    props.IconButtonProps.style = {left: '0px'};

    return <NavigationBaseButton Icon={ArrowLeftIcon} {...props} operator='-'/>;
};