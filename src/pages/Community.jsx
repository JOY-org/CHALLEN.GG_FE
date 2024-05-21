import CommunityList from "../components/CommunityList";
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