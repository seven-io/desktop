import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';
import Snackbar from '@material-ui/core/Snackbar';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';

import {removeSnackbar} from '../../store/actions';
import {RootState} from '../../store/reducers';

export const Snackbars = () => {
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const handleClose = (i: number) => dispatch(removeSnackbar(i));

    return useSelector((s: RootState) => s.snackbars).map((msg: string, i: number) => {
        const Action = () => <IconButton
            aria-label={t('close')}
            color='inherit'
            onClick={() => handleClose(i)}
            size='small'>
            <CloseIcon fontSize='small'/>
        </IconButton>;

        return <Snackbar
            action={<Action/>}
            anchorOrigin={{vertical: 'bottom', horizontal: 'left',}}
            autoHideDuration={6000}
            key={i}
            onClose={() => handleClose(i)}
            open={true}
            message={msg}
        />;
    });
};