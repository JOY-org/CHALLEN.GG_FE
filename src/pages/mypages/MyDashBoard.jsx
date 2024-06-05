import  Styles  from "../mypages/css_module/MyPage.module.css"
import MyInfo from "./MyInfo";
import Kcal from "./Kcal";
import MyButtons from "./MyButtons";
import ChallengeManage from "./ChallengeManage";

const MyDashBoard = () => {
    return (
        <div className={Styles.gridBox}>
            <MyInfo />
            {/* <ChallengeManage /> */}
            <Kcal />
            <MyButtons/>
        </div>
    );
}

export default MyDashBoard;