import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import CommunityPostModal from './CommunityPostModal';
import styles from './css_module/PostModal.module.css'
import { Button, DialogActions } from '@mui/material';

export default function PostModal({open, handleClosePost, postDetail, setPosts, posts}) {
    return (
        <>
            <Dialog
                open={open}
                onClose={handleClosePost}
                aria-labelledby="responsive-dialog-title"
                
            >   
                <DialogContent className={styles.dialog}>
                    <CommunityPostModal 
                        postDetail={postDetail} 
                        setPosts={setPosts} 
                        posts={posts} 
                        open={open} 
                        handleClosePost={handleClosePost}
                    />
                </DialogContent>
                {/* <DialogActions>
                    <Button autoFocus onClick={handleClosePost}>
                        닫기
                    </Button>
                </DialogActions> */}
            </Dialog>
        </>
    );
}