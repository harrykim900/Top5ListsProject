import * as React from 'react';
import { useContext } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import AuthContext from '../auth'
import { GlobalStoreContext } from '../store'

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="right" ref={ref} {...props} />;
});

export default function DeleteModal() {
    const { auth } = useContext(AuthContext);
    const { store } = useContext(GlobalStoreContext);
    let [open, setOpen] = React.useState(false);

    const handleConfirm = () => {
        store.deleteMarkedList();
        setOpen(false);
    };
    const handleCancel = () => {
        store.unmarkListForDeletion();
        setOpen(false);
    }

    let name = ""
    if (store.listMarkedForDeletion) {
        name = store.listMarkedForDeletion.name; 
        open = true;
    }

    return (
        <div>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>{"Delete List?"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        Are you sure you want to delete the {name} Top 5 List?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleConfirm}>Confirm</Button>
                    <Button onClick={handleCancel}>Cancel</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}