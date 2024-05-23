import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import CommunityPostModal from './CommunityPostModal';
import styles from './css_module/PostModal.module.css'

export default function PostModal({open, handleClosePost, postDetail}) {
    return (
        <>
            <Dialog
                open={open}
                onClose={handleClosePost}
                aria-labelledby="responsive-dialog-title"
                
            >   
                <DialogContent className={styles.dialog}>
                    <CommunityPostModal postDetail={postDetail}/>
                </DialogContent>
                {/* <DialogActions>
                    <Button Button autoFocus onClick={handleClosePost}>
                        닫기
                    </Button>
                </DialogActions> */}
            </Dialog>
        </>
    );
}