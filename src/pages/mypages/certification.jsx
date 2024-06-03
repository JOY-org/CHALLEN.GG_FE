import { useState,useContext, useEffect } from "react";
import MyStyle from "../mypages/css_module/MyPage.module.css";
import Modal from 'react-modal';
import { UserChallengeItem } from "../mypages/ChallengeManage"
import { challengApi } from "../../api/services/challenge";

const Certification = () => {

    const [modal, setModal] = useState(false);
    const open = () => {setModal(true)}
    const close = () => {setModal(false)}

    return (
        <>
            <button className={MyStyle.AuthButton} onClick={open}>인증</button>
            <CertificationModal close={close} modal={modal}/>
            {/* 이미지,제목,인증하기,인증현황 */}
        </>
    );
}

export default Certification;

// 인증 모달 컴포넌트------------------------------------------------
export const CertificationModal = ({close,modal}) => {
    const token = localStorage.getItem("token")
    const challengeItem = useContext(UserChallengeItem);
    console.log(challengeItem );
    const [myImg, setMyImg] = useState(null);
    const [preImg, setPreImg] = useState(null);
    const [complete, setComplete] = useState();
    const [showChallengeList, setShowChallengeList] = useState();

    const showChallenge = (e) => {
        const files = e.target.files;
        if (files && files[0]) {
            const file = files[0];
            const reader = new FileReader();
            reader.onloadend = () => {
                setMyImg(file);
                console.log(file);
                setPreImg(reader.result);
                console.log(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const uploadChallenge = async()=>{
        const data = {
            img:myImg,
            SuccessId:challengeItem.id
        }
        try{
            if(myImg){
            const res = await challengApi.uploadCheck(data , token)
                setComplete(res.data.payload)
                console.log(res.data.payload);
            }else{
                alert("이미지를 업로드 챌린지 인증이 가능합니다")
            }
        }catch(err){
            console.error(err);
        }
    }
    // 인증현황리스트
    const showList =async()=>{
        try{
            const challengeId = challengeItem.ChallengeId
            const res = await challengApi.getCheckByChallengeId(challengeId)
            setShowChallengeList(res.data.payload)
            console.log(res.data.payload);
        }catch(err){
            console.error(err);
        }
    }

    useEffect(()=>{
        showList()
    })

    return (
                <Modal
                    isOpen={modal}
                    onRequestClose={close}
                    contentLabel="챌린지 인증모달"
                >
                    <h3>{challengeItem.Challenge.name}</h3>
                    <label htmlFor="uploadImg">인증 자료를 업로드 하기</label>
                    <input type="file" onChange={showChallenge} id="uploadImg" />
                    {preImg ?
                    <img src={preImg} alt="나의 인증 이미지"  />
                    :
                    ""
                    }
                    <button onClick={uploadChallenge} >인증완료</button>

                    <p>일자별 인증 현황리스트</p>
                    <p>{showChallengeList}</p>
                </Modal>
    );
};