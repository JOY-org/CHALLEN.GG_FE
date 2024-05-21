import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { useState } from 'react';
import CommunityPostModal from './CommunityPostModal';

export default function PostModal({open, handleClosePost}) {
    return (
        <>
            <Dialog
                open={open}
                onClose={handleClosePost}
                aria-labelledby="responsive-dialog-title"
            >   
                <DialogContent>
                    <CommunityPostModal/>
                </DialogContent>
                <DialogActions>
                    <Button Button autoFocus onClick={handleClosePost}>
                        닫기
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}