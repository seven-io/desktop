import {SvgIconProps} from '@mui/material'
import React from 'react';
import IconButton, {IconButtonProps} from '@mui/material/IconButton';
import {NavigationBaseProps, Operator} from '../../types';

export type NavigationBaseButtonProps = NavigationBaseProps & {
    Icon: React.JSXElementConstructor<SvgIconProps>
    IconButtonProps: IconButtonProps
    operator: Operator
}

export const NavigationBaseButton = ({
                                         Icon,
                                         IconButtonProps,
                                         index,
                                         list,
                                         operator
                                     }: NavigationBaseButtonProps) => {
    IconButtonProps.style!.position = 'absolute';

    return <IconButton
        disabled={undefined === list['+' === operator ? index + 1 : index - 1]}
        onClick={IconButtonProps.onClick}
        style={{...IconButtonProps.style, position: 'absolute'}}
    >
        <Icon fontSize='large' style={{fontSize: '3rem'}}/>
    </IconButton>;
};
