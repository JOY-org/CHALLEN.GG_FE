import MyStyle from "../mypages/css_module/MyPage.module.css"
import MadeChallenge from "../mypages/MadeChallenge";
import PurchaseList from "../mypages/PurchaseList";

const MyButtons = () => {
    return (
    <>
        <PurchaseList className={MyStyle.Buttons1}/>
        <MadeChallenge className={MyStyle.Buttons2}/>
    </>
    );
}

export default MyButtons;