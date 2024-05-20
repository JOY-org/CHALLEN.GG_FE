import { Box, Container, Grid } from "@mui/material";
import CommunityList from "../components/CommunityList";
import CommunityPost from '../components/CommunityPostModal';
import styles from '../components/css_module/Community.module.css'

const Community = () => {
    return ( 
        <div className={styles.container}>
            <div className={styles.CommunityContainer}>
                <CommunityList/>
            </div>
        </div>
    );
}

export default Community;