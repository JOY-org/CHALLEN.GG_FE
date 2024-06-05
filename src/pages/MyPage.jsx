import  Styles  from "../pages/mypages/css_module/MyPage.module.css"
import { Box } from "@material-ui/core";
import MyInfo from "./mypages/MyInfo";
import Kcal from "./mypages/Kcal";
import MyButtons from "./mypages/MyButtons";
import ChallengeManage from "./mypages/ChallengeManage";
import mainimg from "../images/main.jpg"

const MyPage = () => {
    return (
    <Box className={Styles.Container}>
    <img
        src={mainimg}
        alt="한가로운 골목"
        className={Styles.mainImg}
    />
    <p className={Styles.mainText}>MY PAGE</p>
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