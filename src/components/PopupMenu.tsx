import React from 'react';
import Button from '@material-ui/core/Button';
import PopupStateComp, {bindMenu, bindTrigger} from 'material-ui-popup-state';
import {PopupState} from 'material-ui-popup-state/core';
import Menu from '@material-ui/core/Menu';
import {MenuItemProps} from '@material-ui/core';

export type MessageToolbarProps = {
    buttonText: string
    items: React.ComponentElement<MenuItemProps, any>
    identifier: string
}

export const PopupMenu = ({items, identifier, buttonText}: MessageToolbarProps) => {
    const state: PopupState | {} = {};
    const popupId = `${identifier}-popup`;
    const menuId = `${popupId}-menu`;

    return <PopupStateComp variant='popover' popupId={popupId}>
        {pS => {
            Object.assign(state, pS);

            return <>
                <Button aria-controls={menuId} aria-haspopup='true' variant='contained'
                        color='primary' {...bindTrigger(state as PopupState)}>
                    {buttonText}
                </Button>

                <Menu id={menuId} {...bindMenu(state as PopupState)}>
                    {items.props.children}
                </Menu>
            </>;
        }}
    </PopupStateComp>;
};