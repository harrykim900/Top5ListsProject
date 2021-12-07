import React, { useContext, useEffect } from 'react'
import { GlobalStoreContext } from '../store'
import AuthContext from '../auth'
import ListCard from './ListCard.js'
import { Fab, Typography } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import List from '@mui/material/List';
import DeleteModal from './DeleteModal.js'
/*
    This React component lists all the top5 lists in the UI.
    
    @author McKilla Gorilla
*/
const HomeScreen = () => {
    const { auth } = useContext(AuthContext);
    const { store } = useContext(GlobalStoreContext);

    useEffect(() => {
        store.loadIdNamePairs();
    }, []);

    // function handleCreateNewList() {
    //     store.createNewList();
    // }
    let listCard = "";

    let editStatus = false;
    if (store.isListNameEditActive){
        editStatus = true;
    }
    if (store) {
        listCard = 
            <List sx={{ width: '90%', left: '5%', bgcolor: '#E6E6E6', borderRadius: '30pt' }}>
            {
                store.idNamePairs.map((pair) => (
                    <ListCard
                        key={pair._id}
                        idNamePair={pair}
                        selected={false}
                    />
                ))
            }
            </List>;
    }
    return (
        <div id="top5-list-selector">
            <div id="list-selector-list">
                {
                    listCard
                }
            </div>
            <DeleteModal/>
        </div>)
}

export default HomeScreen;