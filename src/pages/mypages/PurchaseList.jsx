import React from 'react';
import { useNavigate } from 'react-router-dom';
import MyStyle from "../mypages/css_module/MyPage.module.css";

const PurchaseList = () => {
    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate('/shoppingpurchase');
    }

    return (
        <div>
            <button className={MyStyle.PurchaseList} onClick={handleNavigate}>구매목록</button>
        </div>
    );
}

export default PurchaseList;