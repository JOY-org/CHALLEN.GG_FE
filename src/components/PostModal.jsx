import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import CommunityPostModal from './CommunityPostModal';
import styles from './css_module/PostModal.module.css'

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
            </Dialog>
        </>
    );
}