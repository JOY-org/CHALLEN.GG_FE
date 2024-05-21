import axios from "axios";
import MyStyle from "../../../../components/css_module/MyPage.module.css"
import { useEffect, useState } from "react";
import { useAuth } from "../../../../hooks/useAuth";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { atom, useRecoilState, useSetRecoilState } from "recoil";


const MyInfo = () => {

    const [userProfile, setUserProfile] = useState();

    //레벨 조건 exp의 범위에 따라 5가지 레벨로 나눔 (feat.피보나치수열)
    const [level, setLevel] = useState(1);

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
        }
        return level;
    }
    // userProfile?.exp;
    useEffect(() => {
        const exp = 7
        console.log( exp );
        setLevel(level);
    }, [userProfile]);

    //로그인된 사용자의 개인정보를 불러옴
    const GetUserInfo = async()=>{
        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/users`)
            setUserProfile(res.data.payload[0]); //개인정보는 0번째 배열에 들어있다
            // console.log(res.data.payload); 개인정보 배열번호를 이곳에서 확인
        } catch (error){
            console.error(error);
        }
    }
    useEffect(()=>{
        GetUserInfo();
    }, []);


    //이미지 업로드하는곳(빽의 미완)
    // const UploadProfileImg  = async(e) =>{
    //     const formData = new FormData();
    //     formData.append('img', e.target.files[0])
    //     const response = await axios.post(`${process.env.REACT_APP_API_URL}/users/profilimg`)
    // }


    return (

            <div className={MyStyle.MyInfo} >
                <h2>나의 정보관리</h2>

                {/* <label>이미지 들어갈곳</label>
                <input type="file" onChange={ UploadProfileImg } id="inputField" /> */}

                {userProfile ? <p>프로필이미지:{userProfile.img}</p> : <p>Loading...</p>}
                {userProfile ? <p>닉네임{userProfile.nickname}</p> : <p>Loading...</p>}
                {userProfile ? <p>레벨:{level}</p> : <p>Loading...</p>}
                {/* {userProfile &&
                <ProfileInfo user={userProfile} />
            } */}
            </div>

    );
}

export default MyInfo;