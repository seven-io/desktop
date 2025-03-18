import {useTranslation} from 'react-i18next'
import {useAppDispatch, useAppSelector} from '../../store'
import {REMOVE_SNACKBAR, selectSnackbars} from '../../store/features/snackbars'
import Snackbar from '../Snackbar'

export const Snackbars = () => {
    const {t} = useTranslation()
    const dispatch = useAppDispatch()
    const handleClose = (i: number) => dispatch(REMOVE_SNACKBAR(i))
    const snackbars = useAppSelector(selectSnackbars)

    return snackbars.map((msg: string, i: number) => {
        return <Snackbar
  /*          action={<Button
                aria-label={t('close')}
                //color='inherit'
                onClick={() => handleClose(i)}
                //size='small'
            >
                <XMarkIcon fontSize='small'/>
            </Button>}
            anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
            autoHideDuration={6000}*/
            key={i}
            index={i}
            //onClose={() => handleClose(i)}
            //open
            message={msg}
        />
    })
}
