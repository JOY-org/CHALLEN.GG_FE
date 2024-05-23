import { useEffect, useState } from "react";
import MyStyle from "../../components/css_module/MyPage.module.css"
import Modal from 'react-modal';
import { Chalet } from "@mui/icons-material";
import { useAuth } from "../../hooks/useAuth";


const MadeChallenge = () => {
    const [isOpen, setIsOpen] = useState(false);
    const OpenModal = () => setIsOpen(true);
    const CloseModal = () => setIsOpen(false);



    return (
        <div>
            <button
                className={MyStyle.MadeChallenge}
                onClick={OpenModal}
            >
            챌린지개설
            </button>
            <MadeChallengeModal
                isOpen={isOpen}
                CloseModal={CloseModal}
                />
        </div>
    );
}

export default MadeChallenge;

//챌린지 기획 모달
export const MadeChallengeModal = ({isOpen, CloseModal}) => {
    const { loginUser } = useAuth();
    //챌린지 기획서 이미지
    const [challengeImg, setChallengeImg] = useState();

    const customStyles = {
        content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            width:'500px',
            height:'500px',
            transform: "translate(-50%, -50%)",
        },
        };

    const UploadchallengeImg = () =>{
        //챌린지를 업로드합니다
    }

    useEffect(() => {
        //새로운 챌린지파일 이름
        const key =`profileImg_${loginUser.id}`;
        setChallengeImg(key);
    }, [loginUser.id]);

    const DeleteBtn =()=>{
        CloseModal();
    }

    return (
    <div>
        <Modal
            isOpen={isOpen}
            onRequestClose={CloseModal}
            style={customStyles}
            contentLabel="Followers List"
        >
            <h3>챌린지 기획서</h3>
            <div>
                <p>대표이미지</p>
                <img
                    src={`http://localhost:8000/uploads/challenge/${challengeImg}.png`}
                    onError={(e) => e.target.src = `http://localhost:8000/uploads/default.png`}
                />
                <input type='file' onChange={UploadchallengeImg}></input>
                <div>
                    <label>챌린지 이름</label>
                    <input type="text" placeholder="챌린지명을 입력하시오"></input>
                </div>
                <div>
                    <label>챌린지 기간</label>
                    <input type="date" placeholder="챌린지명을 입력하시오"></input>
                    -
                    <input type="date"></input>
                </div>
                <div>
                    <label>챌린지 소개</label>
                    <input type="text" placeholder="당신의 챌린지를 소개해주세요"></input>
                </div>
                <div>
                    <label>챌린지 주의사항</label>
                    <input type="text" placeholder="당신의 챌린지를 소개해주세요"></input>
                </div>
                <div>
                    <label>예치금</label>
                    <input type="number" ></input>:P
                </div>
                <div>
                    <button>등록하기</button>
                    <button onClick={DeleteBtn}>취소하기</button>
                    </div>
            </div>

        </Modal>
    </div> );
}

