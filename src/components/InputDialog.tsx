import React, {ReactElement} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';

export type InputDialogProps = {
    title: string
    text: string
    children: ReactElement
}

export const InputDialog = ({title, text, children}: InputDialogProps) => {
    const [dialog, setDialog] = React.useState(false);
    const handleClickOpen = () => setDialog(true);
    const handleCloseDialog = () => setDialog(false);

    return <Dialog open={dialog} onClose={handleCloseDialog} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">{title}</DialogTitle>
        <DialogContent>
            <DialogContentText>{text}</DialogContentText>

            {children}
        </DialogContent>

        <DialogActions>
            <Button onClick={handleCloseDialog} color="primary">Cancel</Button>

            <Button onClick={handleCloseDialog} color="primary">OK</Button>
        </DialogActions>
    </Dialog>;
};