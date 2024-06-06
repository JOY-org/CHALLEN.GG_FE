import axios from "axios";
import MyStyle from "../mypages/css_module/MyPage.module.css"
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Follow from "./Follow";
import { useAuth } from "../../hooks/useAuth";
import { userApi } from "../../api/services/user";
import ChallengeManage from "./ChallengeManage";
import Kcal from "./Kcal";
import MyButtons from "./MyButtons";

const MyInfo = () => {
    const token = localStorage.getItem('token');
    //로그인된사용자 정보 가져오는 상태관리
    const [userProfile, setUserProfile] = useState();
    //레벨 조건 exp의 범위에 따라 5가지 레벨로 나눔 (feat.피보나치수열)
    const [level, setLevel] = useState();
    //이미지 받는
    const [profileImg, setProfileImg] = useState("");
    const { id } = useParams();
    //포인트
    const [myPoint, setMyPoint] = useState();
    //이미지 변경시
    const [change, setChange] = useState(false);
    const handleChange=()=>{setChange(true)}
    //닉네임변경시
    const [nickname, setNickname] = useState(false);
    //닉네임변경시
    const openName = () =>{setNickname(true)}
    const closeName = () =>{setNickname(false)}

    //로그인된 사용자의 개인정보를 불러옴
    const getUserInfo = async()=>{
        try {
            const res = await userApi.getUserInfo(token)
            setUserProfile(res.data.payload);
            setProfileImg(res.data.payload.img);
        } catch (error){
            console.error(error);
        }
    }
    useEffect(()=>{
        getUserInfo();
    }, []);


    //사용자의 exp를통해 레벨을 계산해주는 코드
    const getExp = (exp) =>{
        let level;
        if (exp >= 21) {
            level = '카이저';
        }else if (exp >= 13) {
            level = '에너자이저';
        }else if (exp >= 8) {
            level = '에너지';
        }else if (exp >= 5) {
            level = '엔돌핀';
        }else if (exp >= 0) {
            level = '스타터';
        }
        return level;
    }
    // userProfile?.exp;
    useEffect(() => {
        if(userProfile){
            const exp = userProfile.exp;
            setLevel(getExp(exp))
        }
    }, [userProfile]);



    //포인트가져오는 코드
    const Point = async()=>{
        try{
            const res = await userApi.getPoint(id,token)
            setMyPoint(res.data.payload)
        }catch(error){
            console.error(error)
        }
    }

    useEffect(()=>{
        Point();
    },[])


    // 프로필 이미지 업로드하는곳
    const uploadProfileImg = async (e) => {
        try{
            e.preventDefault();
            const formData = new FormData();
                formData.append('img', e.target[0].files[0])
            const response = await userApi.patchUploadImg(formData, token)
                console.log(response.data);
                setProfileImg(response.data.img + `?timestamp=${new Date().getTime()}`); //이미지 바뀔때마다 url이 바로알수잇도록
                setChange(false);//클릭에서 다시 프로필 변경 버튼으로
        }catch(err){
            console.error(err);
        }
    }

    //닉네임 바꾸는 코드
    const uploadNickname= async (e) => {
        try{
            e.preventDefault();
            const formData = new FormData();
                formData.append('nickname', e.target[0].value)
            const response = await userApi.patchUploadImg(formData, token)
            setUserProfile(prev => ({...prev, nickname: response.data.nickname}))
            closeName(false);
        }catch(err){
            console.error(err);
        }
    }


    return (
            <div className={MyStyle.MyInfo} >
                <div className={MyStyle.Info1}>
                    {/* 프로필이미지 */}
                    <div >
                            <img
                                src={`http://localhost:8000/${profileImg}`}
                                id={MyStyle.profileImg}
                            />
                        </div>
                        <div className={MyStyle.MyInfos}>
                        {/* 프로필이미지변경버튼 */}
                        <form onSubmit={uploadProfileImg}  >
                            <input
                                type="file"
                                id="fileInput"
                                onChange={handleChange}
                                className={MyStyle.ImgBtn}/>
                            {change ?
                            <button type='submit' >click !</button>
                            :
                            <label htmlFor="fileInput" className={MyStyle.ProfileText} >프로필을 변경할까요?</label>
                            }
                        </form>
                        {/* 닉네임 */}
                        {userProfile ? <span className={MyStyle.Nick}>{userProfile.nickname}</span> : <p>Loading...</p>}
                        {/* 닉네임변경버튼 */}
                        <form onSubmit={uploadNickname}>
                            <label htmlFor="changename" className={MyStyle.changname} onClick={openName}>닉네임을 변경할까요?</label>
                            {nickname?
                                <div className={MyStyle.changBtn}>
                                    <input
                                        type="text"
                                        name='nickname'
                                        id="changename"
                                        placeholder="닉네임을 입력해주세요"/>
                                    <button type='submit'>save</button>
                                </div>
                                :
                                <div className={MyStyle.changBtn} style={{display:'none' }}>
                                    <input
                                        type="text"
                                        name='nickname'
                                        id="changename"
                                        placeholder="닉네임을 입력해주세요"/>
                                    <button type='submit' >save</button>
                                </div>}
                        </form>
                        <div className={MyStyle.Lv} >
                        {/* 유저레벨 레벨을 강조해주세요 각 레벨별로 색으로 표시하는등*/}
                        {userProfile ? <p>LV.{level}</p> : <p >Loading...</p>}
                        </div>

                        <div className={MyStyle.Points} >
                        {/* 유저포인트 */}
                        {myPoint ? <p >{myPoint.point}Point</p> : <p >Loading...</p>}
                        </div>
                        <div className={MyStyle.Challengg}>
                            <p>CHALLEN.GG</p>
                        </div>
                    </div>
                    </div>
                    <div className={MyStyle.FollowAndChallenge}>
                    <div  className={MyStyle.Info2}>
                        {/* 팔로우팔로잉버튼 */}
                        {userProfile &&
                            <Follow user={userProfile}/>}
                    </div>

                    {/* 챌린지 진행.완료목록 */}
                    <div  className={MyStyle.Info3}>
                        <ChallengeManage/>
                    </div>
                    </div>
                    {/* 칼로리캘린더 */}
                    <div>
                        <div className={MyStyle.kcals}>
                            <Kcal />
                        </div>
                        {/* 챌린지개설 구매목록 */}
                        <div className={MyStyle.Buttons}>
                            <MyButtons/>
                        </div>
                    </div>
            </div>

    );
}

export default MyInfo;


//개인정보 수정 칸


