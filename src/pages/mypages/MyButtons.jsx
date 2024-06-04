import MyStyle from "../mypages/css_module/MyPage.module.css"
import MadeChallenge from "../mypages/MadeChallenge";
import PurchaseList from "../mypages/PurchaseList";

const MyButtons = () => {
    return (
    <div className={MyStyle.MyButtons} >
        <PurchaseList/>
        <MadeChallenge/>

    </div> );
}

export default MyButtons;