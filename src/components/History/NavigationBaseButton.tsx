import IconButton, {IconButtonProps as IIconButtonProps} from '@material-ui/core/IconButton';
import React from 'react';
import {SvgIconProps} from '@material-ui/core';

export type NavigationBaseButtonBaseProps = {
    IconButtonProps: IIconButtonProps
    index: number
    list: any[]
}

export type NavigationBaseButtonProps = NavigationBaseButtonBaseProps & {
    Icon: React.JSXElementConstructor<SvgIconProps>
    operator: '+' | '-'
}

export const NavigationBaseButton = ({
                                         Icon,
                                         IconButtonProps,
                                         index,
                                         list,
                                         operator
                                     }: NavigationBaseButtonProps) => {
    IconButtonProps.style!.position = 'absolute';

    return <IconButton disabled={undefined === list[eval(`${index} ${operator} 1`)]}
                       style={IconButtonProps.style} {...IconButtonProps}>
        <Icon fontSize='large' style={{fontSize: '3rem'}}/>
    </IconButton>;
};