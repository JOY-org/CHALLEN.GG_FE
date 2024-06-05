import { useState,useContext, useEffect } from "react";
import MyStyle from "../mypages/css_module/MyPage.module.css";
import Modal from 'react-modal';
import { UserChallengeItem } from "../mypages/ChallengeManage"
import { challengApi } from "../../api/services/challenge";
import MyPage from "../MyPage";

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
    const [showChallengeList, setShowChallengeList] = useState([]);

    const showChallenge = (e) => {
        const files = e.target.files;
        if (files && files[0]) {
            const file = files[0];
            const reader = new FileReader();
            reader.onloadend = () => {
                setMyImg(file);
                setPreImg(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const uploadChallenge = async () => {
        const data = {
            img: myImg,
            SuccessId: challengeItem.id
        };
        try {
            if (myImg) {
                const res = await challengApi.uploadCheck(data, token);
                setComplete(res.data.payload);
                alert("인증완료하였습니다")
                showList();
                setMyImg(null);
                setPreImg(null);

            } else {
                alert("이미지를 업로드해야 챌린지 인증이 가능합니다");
            }
        } catch (err) {
            console.error(err);
        }
    }

    // 인증현황리스트
    const showList = async () => {
        try {
            const id = challengeItem.ChallengeId;
            console.log(id);
            const res = await challengApi.getCheckByChallengeId(id);
            if (res && res.data) {
                setShowChallengeList(res.data);  // res.data를 사용해 상태 설정
                console.log(res.data);
            } else {
                console.error("Unexpected response structure", res);
            }
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        showList();
    }, []);

    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            width: '400px',
            height: '500px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
            boxSizing: 'border-box',
            borderTop:'10px solid #00aedam',
            borderBottom:'10px solid #00aeda',
            // 이거 하며 윗 공간 남는거 아닌가
            minHeight: 'calc(100vh - 200px)',
            overflowY: 'auto',
        },
        overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.75)',
        },
    };
    return (

        <Modal
            isOpen={modal}
            onRequestClose={close}
            contentLabel="챌린지 인증모달"
            style={customStyles}
        >
            <h3>{challengeItem.Challenge.name}</h3>
            <p style={{color:'gray'}}>인증 처리는 오전 12시 이후 갱신 됩니다</p>
            <label htmlFor="uploadImg">인증 자료를 업로드 하기 click!</label>
            <input type="file" onChange={showChallenge} id="uploadImg" style={{display:'none'}} />
            {preImg ?
                <img src={preImg} alt="나의 인증 이미지"  style={{width:'318px',height:'318px'}}/>
                :
                ""
            }
            <button onClick={uploadChallenge}>인증완료</button>

            <p>일자별 인증 현황리스트</p>
            <div className={MyStyle.CertificationList}>
                {showChallengeList.map(item => (
                    item.SuccessId === challengeItem.id && (
                        <div key={item.id}>
                            <p>ID: {challengeItem.UserId}</p>
                            <p>Date: {item.createdAt}</p>
                            <img src={`http://localhost:8000${item.img}`} alt="타 유저의 인증 이미지" />
                        </div>
                    )
                ))}
            </div>
        </Modal>
    );
};

