import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import Swal from 'sweetalert2';

export default function PostCreate() {
    const {loginUser} = useAuth();

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        try {
            if(loginUser.id){
                setOpen(true)
            }
        } catch (error) {
            Swal.fire({
                text: '로그인 이후에 가능해요',
                icon: "error"
            });
        }
        // if(loginUser.id){
        //     setOpen(true)
        // }else{
        //     Swal.fire({
        //         text: '로그인 이후에 가능해요',
        //         icon: "error"
        //     });
        // }
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <React.Fragment>
            <Button variant="outlined" onClick={handleClickOpen} style={{height:'56px'}}>
                게시글 등록
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
            <DialogTitle>게시글 등록</DialogTitle>
            <DialogContent>
                <TextField
                autoFocus
                required
                margin="dense"
                id="name"
                name="name"
                label="글 제목"
                type="text"
                fullWidth
                autoComplete="off"
                    />
                <TextField
                    label="글 내용"
                    multiline
                    rows={5}
                    required
                    fullWidth
                    style={{marginTop:5}}
                    autoComplete="off"
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