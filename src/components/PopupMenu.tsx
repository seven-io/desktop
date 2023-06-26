import React, {PropsWithChildren} from 'react';
import PopupStateComp, {bindMenu, bindTrigger} from 'material-ui-popup-state';
import {PopupState} from 'material-ui-popup-state/core';
import Menu from '@material-ui/core/Menu';
import Button from '@material-ui/core/Button';

export type MessageToolbarBaseProps = {
    buttonText: string
    identifier: string
}

export type PopupMenuProps = PropsWithChildren<MessageToolbarBaseProps>

export const PopupMenu = ({children, identifier, buttonText}: PopupMenuProps) => {
    const state: PopupState | {} = {};
    const popupId = `${identifier}-popup`;
    const menuId = `${popupId}-menu`;

    return <PopupStateComp popupId={popupId} variant='popover'>
        {pS => {
            Object.assign(state, pS);

            return <>
                <Button
                    {...bindTrigger(state as PopupState)}
                    aria-controls={menuId}
                    aria-haspopup='true'
                    color='primary'
                    variant='contained'
                    style={{color: '#fff'}}
                >{buttonText}</Button>

                <Menu  {...bindMenu(state as PopupState)} id={menuId}>
                    {children}
                </Menu>
            </>;
        }}
    </PopupStateComp>;
};
