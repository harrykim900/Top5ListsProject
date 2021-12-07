import { useContext } from 'react';
import AuthContext from '../auth'
import Copyright from './Copyright'
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { GlobalStoreContext } from '../store'
import AccountErrorModal from './AccountErrorModal'

export default function SplashScreen() {
    const { auth } = useContext(AuthContext);
    const { store } = useContext(GlobalStoreContext)

    const handleSubmit = (event) => {
        event.preventDefault();
        auth.loginGuest({
        }, store);
    };
    return (
        <div id="splash-screen">
            Welcome to <br></br> 
            The Top 5 Lister
            <br></br>
            <div id="splash-screen-description">Create your own top 5 lists, view other users' lists, and more!</div>
            <Link href="/register/">
                <Button
                    type="submit"
                    style={{ width: "30%" }}
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    Create An Account
                </Button>
            </Link>
            <br></br>
            <Link href="/login/">
                <Button
                    type="submit"
                    style={{ width: "30%" }}
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    Login
                </Button>
            </Link>
            <br></br>
            <Box component="form" noValidate onSubmit={handleSubmit}>
                <Button
                    type="submit"
                    style={{ width: "30%" }}
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    Continue As Guest
                </Button>
            </Box>
            <div id="splash-screen-credit">
                Created by Harry Kim
            </div>
        </div>
    )
}