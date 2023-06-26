import {PopupState, usePopupState} from 'material-ui-popup-state/hooks'
import React, {PropsWithChildren} from 'react';
import PopupStateComp, {bindMenu, bindTrigger} from 'material-ui-popup-state';
import Menu from '@mui/material/Menu';
import Button from '@mui/material/Button';

export type MessageToolbarBaseProps = {
    buttonText: string
    identifier: string
}

export type PopupMenuProps = PropsWithChildren<MessageToolbarBaseProps>

export const PopupMenu = ({children, identifier, buttonText}: PopupMenuProps) => {
    const popupId = `${identifier}-popup`;
    const menuId = `${popupId}-menu`;
    const state = usePopupState({popupId, variant: 'popover'})

    return <PopupStateComp popupId={popupId} variant='popover'>
        {pS => {
            Object.assign(state, pS);

            return <>
                <Button
                    {...bindTrigger(state)}
                    aria-controls={menuId}
                    aria-haspopup='true'
                    color='primary'
                    variant='contained'
                    style={{color: '#fff'}}
                >{buttonText}</Button>

                <Menu  {...bindMenu(state)} id={menuId}>
                    {children}
                </Menu>
            </>;
        }}
    </PopupStateComp>;
};
