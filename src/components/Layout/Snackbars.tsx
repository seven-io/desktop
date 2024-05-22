import CloseIcon from '@mui/icons-material/Close'
import IconButton from '@mui/material/IconButton'
import Snackbar from '@mui/material/Snackbar'
import {useTranslation} from 'react-i18next'
import {removeSnackbar} from '../../store/actions'
import {useAppDispatch, useAppSelector} from '../../store'

export const Snackbars = () => {
    const {t} = useTranslation()
    const dispatch = useAppDispatch()
    const handleClose = (i: number) => dispatch(removeSnackbar(i))
    const {snackbars} = useAppSelector(s => s)

    return snackbars.map((msg: string, i: number) => {
        return <Snackbar
            action={<IconButton
                aria-label={t('close')}
                color='inherit'
                onClick={() => handleClose(i)}
                size='small'
            >
                <CloseIcon fontSize='small'/>
            </IconButton>}
            anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
            autoHideDuration={6000}
            key={i}
            onClose={() => handleClose(i)}
            open={true}
            message={msg}
        />
    })
}
