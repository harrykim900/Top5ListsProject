import { useContext } from 'react'
import { GlobalStoreContext } from '../store'
import { Typography } from '@mui/material'
import { Fab } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import AuthContext from '../auth'
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';


/*
    Our Status bar React component goes at the bottom of our UI.
    
    @author McKilla Gorilla
*/
function Statusbar() {
    const { auth } = useContext(AuthContext);
    const { store } = useContext(GlobalStoreContext);

    function handleCreateNewList() {
        store.createNewList();
    }
    function handleClose() {
        store.closeCurrentList();
    }
    let text = "";
    if (store.currentList)
        text = store.currentList.name;

    if (!auth.loggedIn) {
        return null;
    }
    if (store.currentList) {
        return (
            <div id="top5-statusbar">
                <Typography variant="h4">{text}</Typography>
                <Button onClick={handleClose} variant="contained"
                    sx={{ mt: 3, mb: 2, mr: 2, p: 1 , ml: 50}}>Save</Button>
                <Button variant="contained"
                    sx={{ mt: 3, mb: 2, p: 1 }}>Publish</Button>
            </div>
        );
    }
    return (
        <div id="top5-statusbar">

            <Fab
                color="black"
                aria-label="add"
                id="add-list-button"
                size="small"
                disabled={auth.guestLoggedIn}
                onClick={handleCreateNewList}
            >
                <AddIcon />
            </Fab>
            <Typography variant="h2" fontSize="36pt">Your Lists</Typography>

            {/* <Typography variant="h4">{text}</Typography> */}
        </div>
    );
}

export default Statusbar;