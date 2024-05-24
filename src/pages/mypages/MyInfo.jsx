import axios from "axios";
import MyStyle from "../../components/css_module/MyPage.module.css"
import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import Follow from "./Follow";

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
        // e.target.files[0] 업로드할 파일
        const formData = new FormData();
        formData.append('img', e.target[0].files[0])
        //formData.append('nickname', e.target[1].value)
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
        setProfileImg(response.data.img);
    }

    const uploadPnickname= async (e) => {
        console.log(e);
        e.preventDefault();
        // e.target.files[0] 업로드할 파일
        const formData = new FormData();
        formData.append('img', e.target[0].files[0])
        //formData.append('nickname', e.target[1].value)
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
        setProfileImg(response.data.img);
    }


    return (

            <div className={MyStyle.MyInfo} >
                <div className={MyStyle.BgInfo}>

                    {/* <form onSubmit={}>
                        <input type="text" name='nickname' />
                        <button type='submit'>save</button>
                    </form> */}

                    <div className={MyStyle.profileImg}>
                        <img
                            src={`http://localhost:8000/${profileImg}`}
                        />
                    </div>

                    <form onSubmit={uploadProfileImg} className={MyStyle.ImgBtn}>
                        <input type="file" id="fileInput" />
                        <label htmlFor="fileInput">프로필선택</label>
                        <button type='submit' >change</button>
                    </form>

                    {userProfile ? <p className={MyStyle.Nick}>{userProfile.nickname}</p> : <p>Loading...</p>}
                    {userProfile ? <p className={MyStyle.Lv}>{level}</p> : <p>Loading...</p>}
                    {myPoint ? <p className={MyStyle.Lv}>{myPoint.point}Point</p> : <p>Loading...</p>}

                    {userProfile &&
                        <Follow user={userProfile}/>}

                </div>
            </div>

    );
}

export default MyInfo;


//개인정보 수정 칸


