import React, { useEffect, useState } from "react";
import styleHeader from  "../css_module/Header.module.css"
import { Navigate, useNavigate } from "react-router-dom";
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import PeopleIcon from '@mui/icons-material/People';//커뮤니티아이콘
import FavoriteIcon from '@mui/icons-material/Favorite';//마이페이지 아이콘
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';//쇼핑몰아이콘
import LogoutIcon from '@mui/icons-material/Logout';//로그아웃 아이콘
import Banner from "../Banner";
import AdMessage from "../AdMessage";
import NotificationsIcon from '@mui/icons-material/Notifications';//마이메세지아이콘
import SwipeableEdgeDrawer from "../MyMessage"
import ExitToAppIcon from '@mui/icons-material/ExitToApp';//로그인아이콘
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import { useAuth } from "../../hooks/useAuth";
import { Nightlife } from "@mui/icons-material";
//styleHeader.HeaderClass:헤더 전체
//logo:challen.gg 로고

//문제점!!!!!!!!!!!!
//로그인을 하지않아도 첫페이지는 로그인된 상태
//로그인이 틀려도 로그인버튼을 누르면 마이페이지로 이동
const Header = () => {
    const {loginUser, login, logout} = useAuth();
    const [value, setValue] = React.useState('recents');

    const handleChange = (event, newValue) => {
    setValue(newValue);
    };

    const navigate = useNavigate();

    //기본메뉴:로그아웃된상태
    const [menus, setMenus] = useState([
        { path: "/community" , label:"커뮤니티",icon:PeopleIcon },
        { path: "/shopping" , label:"쇼핑몰",icon:AddShoppingCartIcon },
        { path: "/login" , label:"로그인",icon:ExitToAppIcon },
    ]);
    //로그인되어잇을시
    useEffect(()=>{
        if(loginUser?.id){
            setMenus([
                {path: "/", label:"마이메세지",icon:NotificationsIcon},
                {path: "/community", label:"커뮤니티",icon:PeopleIcon},
                {path: "/mypage", label:"마이페이지",icon:FavoriteIcon},
                {path: "/shopping", label:"쇼핑몰",icon:AddShoppingCartIcon},
                {path: "/logout", label:"로그아웃",icon:LogoutIcon},
                ])
        }else {
            setMenus([
                { path: "/community" , label:"커뮤니티",icon:PeopleIcon },
                { path: "/shopping" , label:"쇼핑몰" ,icon:AddShoppingCartIcon},
                { path: "/signin" , label:"로그인",icon:LogoutIcon },
            ]);
            }
    },[loginUser])

    const goToMenu = (path) => {
        navigate(path);
    };

    const [openDrawer, setOpenDrawer] = useState(false);


    const toggleDrawer = () => {
        setOpenDrawer(!openDrawer); // 알람 창 열기/닫기 토글
    };

    return (
        <>
        {/* 최상단 광고배너 */}
        <Banner ><AdMessage /></Banner>
        {/* 챌린지 홈 마크 */}
        <div className={styleHeader.HeaderClass}>
            <h1 id={styleHeader['logo']}
                onClick={() => goToMenu('/')}
            >CHALLEN.GG</h1>
        {/* 상단바  */}
        <BottomNavigation sx={{ width: 700 , backgroundColor:'#4483FD' }} value={value} onChange={handleChange}>
            {/* <BottomNavigationAction
                label="alarm"
                value="alarm"
                icon={<NotificationsIcon/>}
                onClick={toggleDrawer}
            /> */}
                {
                    menus.map((m, idx) => (
                        <BottomNavigationAction
                            key={idx}
                            label={m.label}
                            icon={m.icon?<m.icon />: null}
                            onClick={
                                m.path === '/logout'?
                                    ()=>logout(()=>{goToMenu('/')})
                                    :
                                    m.label === '마이메세지' ? toggleDrawer :()=>goToMenu(m.path)
                            }
                            >
                                {m.label}
                        </BottomNavigationAction>
                    ))
                }
            </BottomNavigation>
        </div>

        {/* 마이메세지페이지 사이드바 창 */}
        <SwipeableEdgeDrawer openDrawer={openDrawer} toggleDrawer={toggleDrawer} />
        </>
    );
}

export default Header;