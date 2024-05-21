import ChallengeManage from "./mypages/components/challengemanagcomponents/ChallengeManag";
import MyInfo from './mypages/components/myinfocomponents/MyInfo'
import Kcal from "./mypages/components/kcalcomponents/Kcal";
import MyButton from "./mypages/components/mybuttoncomponents/MyButton";
import  Styles  from "../components/css_module/MyPage.module.css"
import { Box, Container } from "@material-ui/core";


const MyPage = () => {
    return (
    <Box className={Styles.Container}>
    <div className={Styles.gridBox}>
        <MyInfo/>
        <ChallengeManage/>
        <Kcal/>
        <MyButton/>
    </div>
    </Box>
    );
}

export default MyPage;