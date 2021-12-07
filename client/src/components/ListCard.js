import { useContext, useState } from 'react'
import { GlobalStoreContext } from '../store'
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import ThumbDownAltOutlinedIcon from '@mui/icons-material/ThumbDownAltOutlined';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

/*
    This is a card in our list of top 5 lists. It lets select
    a list for editing and it has controls for changing its 
    name or deleting it.
    
    @author McKilla Gorilla
*/
function ListCard(props) {
    const { store } = useContext(GlobalStoreContext);
    const [editActive, setEditActive] = useState(false);
    const [text, setText] = useState("");
    const { idNamePair } = props;

    function handleLoadList(event, id) {
        if (!event.target.disabled) {
            // CHANGE THE CURRENT LIST
            store.setCurrentList(id);
        }
    }

    function handleToggleEdit(event) {
        event.stopPropagation();
        setText(idNamePair.name);
        toggleEdit();
    }

    function toggleEdit() {
        let newActive = !editActive;
        if (newActive) {
            store.setIsListNameEditActive();
        }
        setEditActive(newActive);
    }

    async function handleDeleteList(event, id) {
        event.stopPropagation();
        store.markListForDeletion(id);
    }

    function handleKeyPress(event) {
        if (event.code === "Enter") {
            let id = event.target.id.substring("list-".length);
            store.changeListName(id, text);
            toggleEdit();
        }
    }
    function handleUpdateText(event) {
        setText(event.target.value);
    }

    function handleLike(event) {
        event.stopPropagation();
    }

    function handleDislike(event) {
        event.stopPropagation();
    }

    function handleExpand(event) {
        event.stopPropagation();
    }
    let cardStatus = false;
    if (store.isListNameEditActive) {
        cardStatus = true;
    }
    console.log(idNamePair);
    let cardElement =
        <ListItem
            id={idNamePair._id}
            key={idNamePair._id}
            sx={{ marginTop: '15px', display: 'flex', p: 1, flexDirection: 'row' }}
            button
            // onClick={(event) => {
            //     handleLoadList(event, idNamePair._id)
            // }
            // }
            disabled={cardStatus}
            style={{
                fontSize: '16pt',
                width: '100%',
                backgroundColor: '#D4D4F5',
                borderRadius: '10pt',
                borderWidth: '2px',
                borderStyle: 'solid',
                borderColor: 'black'
            }}

        >
            <Box sx={{ p: 1, flexGrow: 1 }}>{idNamePair.name}
                <Box sx={{ p: 0.5 }} style={{ fontSize: '10pt' }}>By: {idNamePair.username}</Box>
                <Box sx={{ p: 0.5 }} style={{ fontSize: '10pt' }}>Published: </Box>
                <Box sx={{ p: 0.5 }} style={{ fontSize: '12pt', color: 'red' }}            
                onClick={(event) => {
                handleLoadList(event, idNamePair._id)}
            }> Edit </Box>
            </Box>
            {/* <Box sx={{ p: 1 }}>
                    <IconButton onClick={handleToggleEdit} aria-label='edit'>
                        <EditIcon style={{fontSize:'18pt'}} />
                    </IconButton>
                </Box> */}
            <Box sx={{ p: 1 }}>
                <Box sx={{ p: 1 }}>
                    <IconButton onClick={handleLike}>
                        <ThumbUpAltOutlinedIcon />
                    </IconButton>
                </Box>
                <Box sx={{ p: 1 }}>
                    <IconButton onClick={handleDislike}>
                        <ThumbDownAltOutlinedIcon />
                    </IconButton>
                </Box>
                <Box sx={{ p: 1, fontSize: '10pt' }}>
                    Views:
                </Box>

            </Box>

            <Box sx={{ p: 1 }}>
                <IconButton onClick={(event) => {
                    handleDeleteList(event, idNamePair._id)
                }} aria-label='delete'>
                    <DeleteIcon style={{ fontSize: '18pt' }} />
                </IconButton>
                <IconButton onClick={handleExpand}>
                    <ExpandMoreIcon></ExpandMoreIcon>
                </IconButton>
            </Box>



        </ListItem>

    if (editActive) {
        cardElement =
            <TextField
                margin="normal"
                required
                fullWidth
                id={"list-" + idNamePair._id}
                label="Top 5 List Name"
                name="name"
                autoComplete="Top 5 List Name"
                className='list-card'
                onKeyPress={handleKeyPress}
                onChange={handleUpdateText}
                defaultValue={idNamePair.name}
                inputProps={{ style: { fontSize: 18 } }}
                InputLabelProps={{ style: { fontSize: 16 } }}
                autoFocus
            />
    }
    return (
        cardElement
    );
}

export default ListCard;