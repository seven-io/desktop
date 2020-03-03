import React from 'react';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';

import {NavigationBaseButton, NavigationBaseButtonBaseProps} from './NavigationBaseButton';

export const NextListItemButton = (props: NavigationBaseButtonBaseProps) => {
    props.IconButtonProps.style = {right: '0px'};

    return <NavigationBaseButton Icon={ArrowRightIcon} {...props} operator='+'/>;
};