import { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import EditIcon from '@mui/icons-material/Edit';
import { IconButton } from '@mui/material';

export default function EditCustomer({fetchCustomers, data}) {
    
    const [customer, setCustomer] = useState({
        firstname: '',
        lastname: '',
        streetaddress: '',
        postcode: '',
        city: '',
        email: '',
        phone: ''
    });

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        console.log(data)
        setOpen(true);
        setCustomer({
            firstname: data.firstname,
            lastname: data.lastname,
            streetaddress: data.streetaddress,
            postcode: data.postcode,
            city: data.city,
            email: data.email,
            phone: data.phone
        })
    };

    const handleClose = () => {
        setOpen(false);
    };

    const saveCustomer = () => {
        fetch(data.links[1].href, {
            method: 'PUT',
            headers: {'Content-type':'application/json' },
            body: JSON.stringify(customer)
        })
        .then(response => {
            if (!response.ok)
                throw new Error("Error when adding customer: " + response.statusText);
            fetchCustomers();
        })
        .catch(err => console.log(err));
        handleClose();
    };

    return (
        <div>
            <IconButton>
                <EditIcon size="small" onClick={handleClickOpen}>Edit</EditIcon>
            </IconButton>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Edit Customer</DialogTitle>
                <DialogContent>
                    <TextField
                        margin="dense"
                        label="First name"
                        fullWidth
                        variant="standard"
                        value={customer.firstname}
                        onChange={e => setCustomer({...customer, firstname: e.target.value})}
                    />
                    <TextField
                        margin="dense"
                        label="Last name"
                        fullWidth
                        variant="standard"
                        value={customer.lastname}
                        onChange={e => setCustomer({...customer, lastname: e.target.value})}
                    />
                    <TextField
                        margin="dense"
                        label="Street address"
                        fullWidth
                        variant="standard"
                        value={customer.streetaddress}
                        onChange={e => setCustomer({...customer, streetaddress: e.target.value})}            />
                    <TextField
                        margin="dense"
                        label="Postcode"
                        fullWidth
                        variant="standard"
                        value={customer.postcode}
                        onChange={e => setCustomer({...customer, postcode: e.target.value})}            />
                    <TextField
                        margin="dense"
                        label="City"
                        fullWidth
                        variant="standard"
                        value={customer.city}
                        onChange={e => setCustomer({...customer, city: e.target.value})}            />
                    <TextField
                        margin="dense"
                        label="Email"
                        fullWidth
                        variant="standard"
                        value={customer.email}
                        onChange={e => setCustomer({...customer, email: e.target.value})}            />
                    <TextField
                        margin="dense"
                        label="Phone"
                        fullWidth
                        variant="standard"
                        value={customer.phone}
                        onChange={e => setCustomer({...customer, phone: e.target.value})}            />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={saveCustomer}>Save</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}