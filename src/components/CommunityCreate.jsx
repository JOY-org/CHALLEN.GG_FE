import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';

export default function CommunityCreate() {
const [open, setOpen] = useState(false);

const handleClickOpen = () => {
    setOpen(true);
};

const handleClose = () => {
    setOpen(false);
};

return (
    <React.Fragment>
        <Button variant="outlined" onClick={handleClickOpen} style={{height:'100%'}}>
            등록
        </Button>
        <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
            component: 'form',
            onSubmit: (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            const email = formJson.email;
            console.log(email);
            handleClose();
            },
        }}
        >
        <DialogTitle>커뮤니티 등록</DialogTitle>
        <DialogContent>
            <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="name"
            label="커뮤니티 이름"
            type="text"
            fullWidth
                />
            <TextField
                label="커뮤니티 소개"
                multiline
                rows={3}
                required
                fullWidth
                style={{marginTop:5}}
            />
            <TextField
                type='file'
                style={{marginTop:5}}
            />
        </DialogContent>
        <DialogActions>
            <Button type="submit">등록</Button>
            <Button onClick={handleClose}>취소</Button>
        </DialogActions>
        </Dialog>
    </React.Fragment>
);
}