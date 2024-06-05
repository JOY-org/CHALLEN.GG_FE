import  Styles  from "../mypages/css_module/MyPage.module.css"
import MyInfo from "./MyInfo";

const MyDashBoard = () => {
    return (
        <div className={Styles.gridBox}>
            <MyInfo />
        </div>
    );
}

export default MyDashBoard;