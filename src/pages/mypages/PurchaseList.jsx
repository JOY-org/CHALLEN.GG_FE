import MyStyle from "../mypages/css_module/MyPage.module.css"

const PurchaseList = () => {
    return (
        <div>
            <button className={MyStyle.PurchaseList}>구매목록</button>
        </div>
     );
}

export default PurchaseList;