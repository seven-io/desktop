import IconButton, {IconButtonProps as IIconButtonProps} from '@material-ui/core/IconButton';
import React from 'react';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';

export type NextListItemButtonProps = {
    index: number
    list: any[]
    IconButtonProps: IIconButtonProps
}

export const NextListItemButton = ({IconButtonProps, index, list, ...props}: NextListItemButtonProps) => {
    return <IconButton disabled={undefined === list[index + 1]}
                       style={{position: 'absolute', right: '0px'}} {...IconButtonProps}>
        <ArrowRightIcon fontSize='large' style={{fontSize: '3rem'}}/>
    </IconButton>;
};