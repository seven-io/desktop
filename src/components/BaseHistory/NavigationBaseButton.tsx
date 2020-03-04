import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import {IconButtonProps, SvgIconProps} from '@material-ui/core';

import {NavigationBaseProps} from './types';

export type NavigationBaseButtonProps = NavigationBaseProps & {
    Icon: React.JSXElementConstructor<SvgIconProps>
    IconButtonProps: IconButtonProps
    operator: '+' | '-'
}

export const NavigationBaseButton = (props: NavigationBaseButtonProps) => {
    props.IconButtonProps.style!.position = 'absolute';

    return <IconButton disabled={undefined === props.list[eval(`${props.index} ${props.operator} 1`)]}
                       onClick={props.IconButtonProps.onClick}
                       style={{...props.IconButtonProps.style, position: 'absolute'}}>
        <props.Icon fontSize='large' style={{fontSize: '3rem'}}/>
    </IconButton>;
};