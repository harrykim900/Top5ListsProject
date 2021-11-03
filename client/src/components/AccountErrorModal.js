import * as React from "react";
import { useContext } from 'react';
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import AuthContext from '../auth'

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function AccountErrorModal() {
    const { auth } = useContext(AuthContext);
    let [open, setOpen] = React.useState(false);

    const handleClose = (event, reason) => {
        auth.closeAccountErrorModal();
        setOpen(false);
    };
    if (auth.errorOccurred) {
        open = true;
    }

    return (
        <Stack spacing={2} sx={{ width: "100%" }}>
            <Snackbar open={open} onClose={handleClose} autoHideDuration={6000} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
                <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
                    {auth.errMsg}
                </Alert>
            </Snackbar>

        </Stack>
    );
}
