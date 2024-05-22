import  Styles  from "../components/css_module/MyPage.module.css"
import { Box, Container } from "@material-ui/core";
import MyInfo from "./mypages/MyInfo";
import Kcal from "./mypages/Kcal";
import MyButton from "./mypages/MyButton";
import ChallengeManage from "./mypages/ChallengeManage";


const MyPage = () => {
    return (
    <Box className={Styles.Container}>
    <div className={Styles.gridBox}>
        <MyInfo />
        <ChallengeManage />
        <Kcal />
        <MyButton />
    </div>
    </Box>
    );
}

export default MyPage;