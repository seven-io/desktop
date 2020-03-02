import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import IconButton, {IconButtonProps as IIconButtonProps} from '@material-ui/core/IconButton';
import React from 'react';

export type PreviousListItemButtonProps = {
    index: number
    list: any[]
    IconButtonProps: IIconButtonProps
}

export const PreviousListItemButton = ({IconButtonProps, index, list, ...props}: PreviousListItemButtonProps) => {
    return <IconButton disabled={undefined === list[index - 1]}
                       style={{position: 'absolute', left: '0px'}} {...IconButtonProps}>
        <ArrowLeftIcon fontSize='large' style={{fontSize: '3rem'}}/>
    </IconButton>;
};