import { Box, Container, Grid } from "@mui/material";
import CommunityList from "../components/CommunityList";
import CommunityPost from './../components/CommunityPost';
import styles from '../components/css_module/Community.module.css'
import CommunityListHeader from "../components/CommunityListHeader";

const Community = () => {
    return ( 
        <div className={styles.container}>
            <div className={styles.CommunityContainer}>
                <CommunityListHeader/>
                <CommunityList/>
            </div>
            <div className={styles.RecommendCommunity}>

            </div>
        </div>
    );
}

export default Community;