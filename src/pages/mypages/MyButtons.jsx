
import MyStyle from "../../components/css_module/MyPage.module.css"
import MadeChallenge from "./MadeChallenge";
import PurchaseList from "./PurchaseList";

const MyButtons = () => {
    return (
    <div className={MyStyle.MyButtons} >
        <PurchaseList/>
        <MadeChallenge/>

    </div> );
}

export default MyButtons;