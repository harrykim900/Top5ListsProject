import { useContext } from 'react'
import { GlobalStoreContext } from '../store'
import Button from '@mui/material/Button';
import UndoIcon from '@mui/icons-material/Undo';
import RedoIcon from '@mui/icons-material/Redo';
import CloseIcon from '@mui/icons-material/HighlightOff';
import { useState } from 'react';
import { Link } from 'react-router-dom'
import AuthContext from '../auth';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import FunctionsOutlinedIcon from '@mui/icons-material/FunctionsOutlined';
import TextField from '@mui/material/TextField';
import { width } from '@mui/system';
import SortIcon from '@mui/icons-material/Sort';

/*
    This toolbar is a functional React component that
    manages the undo/redo/close buttons.
    
    @author McKilla Gorilla
*/
function EditToolbar() {
    const { store } = useContext(GlobalStoreContext);
    const { auth } = useContext(AuthContext);

    const [anchorEl, setAnchorEl] = useState(null);
    const isMenuOpen = Boolean(anchorEl);

    const handleSortMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const menuId = 'sort-menu';
    const sortMenu =
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem >Publish Date(Newest)</MenuItem>
            <MenuItem >Publish Date(Oldest)</MenuItem>
            <MenuItem >Views</MenuItem>
            <MenuItem >Likes</MenuItem>
            <MenuItem >Dislikes</MenuItem>
        </Menu>

    if (auth.loggedIn && !store.currentList) {
        return (
            <div id="edit-toolbar">
                <Box sx={{ mt: -0, flexGrow: 1 }}>
                    <AppBar position="static" style={{ background: '#C4C4C4' }}>
                        <Toolbar>
                            <IconButton disabled={auth.guestLoggedIn}>
                                <HomeOutlinedIcon  style={{ fontSize: '30pt' }}></HomeOutlinedIcon>
                            </IconButton>
                            <IconButton>
                                <GroupsOutlinedIcon style={{ fontSize: '30pt' }}></GroupsOutlinedIcon>
                            </IconButton>
                            <IconButton>
                                <PersonOutlineOutlinedIcon style={{ fontSize: '30pt' }}></PersonOutlineOutlinedIcon>
                            </IconButton>
                            <IconButton>
                                <FunctionsOutlinedIcon style={{ fontSize: '30pt' }}></FunctionsOutlinedIcon>
                            </IconButton>
                            <TextField label='Search' variant='outlined' style={{ backgroundColor: 'white', width: '50%' }}></TextField>
                            <Box style={{ paddingLeft: 220, color: 'black' }}>SORT BY</Box>
                            <IconButton
                                size="medium"
                                edge="end"
                                aria-label="sort menu"
                                aria-controls={menuId}
                                aria-haspopup="true"
                                onClick={handleSortMenuOpen}>
                                <SortIcon style={{ fontSize: '30pt' }}></SortIcon>
                            </IconButton>

                        </Toolbar>
                    </AppBar>
                    {sortMenu}
                </Box>
            </div>
        )
    }
    else {
        return null;
    }

}

export default EditToolbar;