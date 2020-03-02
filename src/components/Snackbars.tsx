import React from 'react';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import {useDispatch, useSelector} from 'react-redux';

import {removeSnackbar} from '../store/actions';
import {RootState} from '../store/reducers';

export const Snackbars = () => {
    const snackbars = useSelector((s: RootState) => s.snackbars);

    const dispatch = useDispatch();

    const handleClose = (i: number) => dispatch(removeSnackbar(i));

    return snackbars.map((msg: string, i: number) => <Snackbar
        action={
            <>
                <Button color='secondary' size='small' onClick={() => handleClose(i)}>
                    Cancel
                </Button>

                <IconButton size='small' aria-label='close' color='inherit' onClick={() => handleClose(i)}>
                    <CloseIcon fontSize='small'/>
                </IconButton>
            </>
        }
        anchorOrigin={{vertical: 'bottom', horizontal: 'left',}}
        autoHideDuration={6000}
        key={i}
        onClose={() => handleClose(i)}
        open={true}
        message={msg}
    />);
};