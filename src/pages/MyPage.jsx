import  Styles  from "../pages/mypages/css_module/MyPage.module.css"
import { Box } from "@material-ui/core";
import MyInfo from "./mypages/MyInfo";
import Kcal from "./mypages/Kcal";
import MyButtons from "./mypages/MyButtons";
import ChallengeManage from "./mypages/ChallengeManage";
import mainimg from "../pages/mypages/images/main.jpg"

const MyPage = () => {
    return (
    <Box className={Styles.Container}>
    <img
        src={mainimg}
        alt="앉아있는 남자"
        className={Styles.mainImg}
    />
    <p className={Styles.mainText}>MY PAYGE</p>
    <div className={Styles.gridBox}>
        <MyInfo />
        <ChallengeManage />
        <Kcal />
        <MyButtons />
    </div>
    </Box>
    );
}

export default MyPage;