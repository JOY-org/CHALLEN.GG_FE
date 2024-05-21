import axios from "axios";
import MyStyle from "../../../../components/css_module/MyPage.module.css"
import { useEffect, useState } from "react";
import { useAuth } from "../../../../hooks/useAuth";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { atom, useRecoilState, useSetRecoilState } from "recoil";


const MyInfo = () => {

    //로그인된사용자 정보 가져오는 상태관리
    const [userProfile, setUserProfile] = useState();
    //레벨 조건 exp의 범위에 따라 5가지 레벨로 나눔 (feat.피보나치수열)
    const [level, setLevel] = useState(1);
    //이미지 받는
    const [profileImg, setProfileImg] = useState("");

    //로그인된 사용자의 개인정보를 불러옴
    const GetUserInfo = async()=>{
        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/users`)
            setUserProfile(res.data.payload[0]); //개인정보는 0번째 배열에 들어있다
            //console.log(res.data.payload); //개인정보 배열번호를 이곳에서 확인
        } catch (error){
            console.error(error);
        }
    }
    useEffect(()=>{
        GetUserInfo();
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
    //빽의 미완

    //개인정보수정 코드
    //일단 보류



    //프로필 이미지 업로드하는곳(빽의 미완)
//     const uploadProfileImg = async (e) => {
//         // e.target.files[0] 업로드할 파일
//         const formData = new FormData();
//         formData.append('img', e.target.files[0])
//         const response = await axios.post(`${process.env.REACT_APP_API_URL}/users/profileimg`,
//         formData,
//         {
//             headers: {
//                 "Content-Type": "multipart/form-data", //내가 보낼 데이터는 이미지이다
//                 "Authorization": localStorage.getItem("token"),
//             }
//     }
// )}
//     //로컬에 저장한 프로필 이미지를 불러오는 코드
//     useEffect(() => {
//         const key =`profileImg_${userProfile.id}`;
//         // 로컬 스토리지에서 이미지 URL 가져오기
//         const savedProfileImg = localStorage.getItem(key);
//         if (savedProfileImg) {
//             setProfileImg(savedProfileImg);
//         }
//     }, [userProfile.id]);

    return (

            <div className={MyStyle.MyInfo} >
                <h2>나의 정보관리</h2>

                {/* <label>이미지 들어갈곳</label>
                <input type="file" onChange={ UploadProfileImg } id="inputField" /> */}

                {userProfile ? <p>프로필이미지:{userProfile.img}</p> : <p>Loading...</p>}
                {userProfile ? <p>닉네임{userProfile.nickname}</p> : <p>Loading...</p>}
                {userProfile ? <p>레벨:{level}</p> : <p>Loading...</p>}
                {/* <label htmlFor="inputField" >
                    프로필이미지변경
                </label>
                <input type="file" onChange={uploadProfileImg } id="inputField" /> */}

            </div>

    );
}

export default MyInfo;