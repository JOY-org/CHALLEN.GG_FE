import axios from "axios";
import MyStyle from "../../components/css_module/MyPage.module.css"
import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import Follow from "./Follow";
import { LabelSharp } from "@mui/icons-material";

const MyInfo = () => {
    const { loginUser } = useAuth();
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
    const [ninkname, setNinkname] = useState("");
    //로그인된 사용자의 개인정보를 불러옴
    const getUserInfo = async()=>{
        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/users/myinfo`,{
                headers: {
                    Authorization: loginUser.token
                }
            })
            setUserProfile(res.data.payload); //개인정보는 들어있다
            //console.log(res.data.payload); //개인정보 배열번호를 이곳에서 확인
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
            level = 'Lv.5';
        }else if (exp >= 13) {
            level = 'Lv.4';
        }else if (exp >= 8) {
            level = 'Lv.3';
        }else if (exp >= 5) {
            level = 'Lv.2';
        }else if (exp >= 0) {
            level = 'Lv.1';
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
    const point = async()=>{
        try{
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/users/point`,{
                headers:{
                    "Authorization": localStorage.getItem('token')
                }, data: {
                    id: id
                }
            })
            setMyPoint(res.data.payload)
        }catch(error){
            console.error(error)
        }
    }

    useEffect(()=>{
        point();
    },[])

    //개인정보수정 코드
    //일단 보류



    // 프로필 이미지 업로드하는곳
    const uploadProfileImg = async (e) => {
        console.log(e);
        e.preventDefault();
        const formData = new FormData();
        formData.append('img', e.target[0].files[0])
        const response = await axios.patch(`${process.env.REACT_APP_API_URL}/users`,
        formData,
        {
            headers: {
                "Content-Type": "multipart/form-data", //내가 보낼 데이터는 이미지이다
                "Authorization": localStorage.getItem("token"),
            }
        }
    );
        console.log(response.data);
        setProfileImg(response.data.img + `?timestamp=${new Date().getTime()}`); //이미지 바뀔때마다 url이 바로알수잇도록
        setChange(false);//클릭에서 다시 프로필 변경 버튼으로
    }

    const uploadPnickname= async (e) => {
        console.log(e);
        e.preventDefault();
        const formData = new FormData();
        formData.append('nickname', e.target[0].value)
        const response = await axios.patch(`${process.env.REACT_APP_API_URL}/users`,
        formData,
        {
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem("token"),
            }
        }
    );
        console.log(response.data);
        //setNinkname(response.data.img);
    }


    return (

            <div className={MyStyle.MyInfo} >
                <div className={MyStyle.BgInfo}>
                    {/* 프로필이미지 */}
                    <div className={MyStyle.profileImg}>
                        <img
                            src={`http://localhost:8000/${profileImg}`}
                        />
                    </div>
                    {/* 프로필이미지변경버튼 */}
                    <form onSubmit={uploadProfileImg}  className={MyStyle.ImgBtn}>
                        <input type="file" id="fileInput" onChange={handleChange} />
                        {change ?
                        <button type='submit' >click !</button>
                        :
                        <label htmlFor="fileInput" className={MyStyle.profile} >프로필을 변경할까요?</label>
                        }
                    </form>
                    {/* 닉네임 */}
                    {userProfile ? <p className={MyStyle.Nick}>{userProfile.nickname}</p> : <p>Loading...</p>}
                    {/* 닉네임변경버튼 */}
                    {/* <form onSubmit={uploadPnickname}>
                        <input type="text" name='nickname' id="nickname"/>
                        <button type='submit'>save</button>
                        <label htmlFor="nickname">닉네임을 변경할까요</label>
                    </form> */}
                    {/* 유저레벨 */}
                    {userProfile ? <p className={MyStyle.Lv}>{level}</p> : <p>Loading...</p>}
                    {/* 유저포인트 */}
                    {myPoint ? <p className={MyStyle.Lv}>{myPoint.point}Point</p> : <p>Loading...</p>}
                    {/* 팔로우팔로잉버튼 */}
                    {userProfile &&
                        <Follow user={userProfile}/>}

                </div>
            </div>

    );
}

export default MyInfo;


//개인정보 수정 칸


