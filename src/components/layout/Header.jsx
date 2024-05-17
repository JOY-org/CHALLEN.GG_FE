import React, { useEffect, useState } from "react";
import styleHeader from  "../css_module/Header.module.css"
import { Navigate, useNavigate } from "react-router-dom";
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import PeopleIcon from '@mui/icons-material/People';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import LogoutIcon from '@mui/icons-material/Logout';
import Message from "../Message";
import Banner from "../Banner";
import NotificationsIcon from '@mui/icons-material/Notifications';
//styleHeader.HeaderClass:헤더 전체
//logo:challen.gg 로고


const Header = () => {
    const [value, setValue] = React.useState('recents');

    const handleChange = (event, newValue) => {
    setValue(newValue);
    };

    const navigate = useNavigate();
    //에러나서 디비 로 아이디 가져올수있을떄 수정하기!!!!!!!!!!!!!!!!!!!!

    // //기본메뉴:로그아웃된상태
    // const [menus, setMenus] = useState([
    //     { path: "/community" , label:"커뮤니티" },
    //     { path: "/shopping" , label:"쇼핑몰" },
    //     { path: "/login" , label:"로그인" },
    // ]);
    // //로그인되어잇을시
    // useEffect(()=>{
    //     if(){
    //         setMenus([
    //             { path: "/community" , label:"커뮤니티" },
    //             { path: "/shopping" , label:"쇼핑몰" },
    //             { path: "/login" , label:"로그인" },
    //         ]);
    //     }else {
    //     SentimentNeutralSharp({
    //         {path: "", label:"알림"},
    //         {path: "", label:"커뮤니티"},
    //         {path: "", label:"마이페이지"},
    //         {path: "", label:"쇼핑몰"},
    //         {path: "", label:"로그아웃"},
    //     })
    // }
    // })

    const goToMenu = (path) => {
        navigate(path);
    };

    const [openDrawer, setOpenDrawer] = useState(false);

    const toggleDrawer = () => {
        setOpenDrawer(!openDrawer); // 알람 창 열기/닫기 토글
    };

    return (
        <>
        <Message ><Banner /></Message>
        <div className={styleHeader.HeaderClass}>
            <h1 id={styleHeader['logo']}
                onClick={() => goToMenu('/')}
            >challen.gg</h1>

            <BottomNavigation sx={{ width: 700 , backgroundColor:'#4483FD' }} value={value} onChange={handleChange}>
            <BottomNavigationAction
                    label="alarm"
                    value="alarm"
                    icon={<NotificationsIcon/>}
                    onClick={toggleDrawer}
                />
                <BottomNavigationAction
                    label="Community"
                    value="Community"
                    icon={<PeopleIcon
                    onClick={() => goToMenu('/Community')} />}
                />
                <BottomNavigationAction
                    label="Mypage"
                    value="Mypage"
                    icon={<FavoriteIcon
                        onClick={() => goToMenu('/mypage')}
                />}
                />
                <BottomNavigationAction
                    label="shopping"
                    value="shopping"
                    icon={<AddShoppingCartIcon
                        onClick={() => goToMenu('/shopping')}
                    />}
                />
                <BottomNavigationAction
                    label="Logout"
                    value="Logout"
                    icon={<LogoutIcon />} />
                </BottomNavigation>
        </div>
        </>
    );
}

export default Header;