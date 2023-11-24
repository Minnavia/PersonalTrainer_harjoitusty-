import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers';
import AddIcon from '@mui/icons-material/Add';
import { IconButton } from '@mui/material';

export default function AddTraining({data}) {
    
    const [training, setTraining] = useState({
        date: '',
        activity: '',
        duration: '',
        customer: data.links[1].href,
    });

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const saveTraining = () => {
        fetch('https://traineeapp.azurewebsites.net/api/trainings', {
            method: 'POST',
            headers: {'Content-type':'application/json' },
            body: JSON.stringify(training)
        })
        .then(response => {
            if (!response.ok)
                throw new Error("Error when adding training: " + response.statusText);
        })
        .catch(err => console.log(err));
        handleClose();
    };

    return (
        <div>
            <IconButton onClick={handleClickOpen}>
                <AddIcon>Add training</AddIcon>
            </IconButton>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>New Training</DialogTitle>
                <DialogContent>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateTimePicker 
                            label="Date"
                            value={training.date}
                            onChange={newValue => setTraining({...training, date: newValue})}
                            views={["day", "month", "year", "hours", "minutes"]}/>
                    </LocalizationProvider>
                    <TextField
                        margin="dense"
                        label="Activity"
                        fullWidth
                        variant="standard"
                        value={training.activity}
                        onChange={e => setTraining({...training, activity: e.target.value})}
                    />
                    <TextField
                        margin="dense"
                        label="Duration"
                        fullWidth
                        variant="standard"
                        value={training.duration}
                        onChange={e => setTraining({...training, duration: e.target.value})}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={saveTraining}>Save</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}