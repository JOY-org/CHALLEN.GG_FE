import { useEffect, useState } from "react";
import MyStyle from "../mypages/css_module/MyPage.module.css"
import Modal from 'react-modal';
import { useAuth } from "../../hooks/useAuth";
import { challengApi } from "../../api/services/challenge";


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
    const token = localStorage.getItem('token');
    const { loginUser } = useAuth();

    const [uploadPlan, setUploadPlan] = useState();

    const [img, setImg] = useState(null);
    const [challengeName, setChallengeName] = useState("");
    const [imagePreview, setImagePreview] = useState(null);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [introduction, setIntroduction] = useState("");
    const [caution, setCaution] = useState("");
    const [deposit, setDeposit] = useState("");
    const [max, setMax] = useState(20);

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        setImg(file);
        setImagePreview(URL.createObjectURL(file)); // 이미지 미리보기 업데이트
    };

    const handleChallengeNameChange = (e) => setChallengeName(e.target.value);
    const handleStartDateChange = (e) => setStartDate(e.target.value);
    const handleEndDateChange = (e) => setEndDate(e.target.value);
    const handleIntroductionChange = (e) => setIntroduction(e.target.value);
    const handlemaxChange = (e) => setMax(e.target.value);
    const handleCautionChange = (e) => setCaution(e.target.value);
    const handleDepositChange = (e) => setDeposit(e.target.value);

    const uploadChallenge = async () => {
        if (!challengeName || !startDate || !endDate) {
            console.error('필수 필드를 모두 입력해야 합니다.');
            return;
        }
        let imgUrl = null;
    if (img) {
        imgUrl = URL.createObjectURL(img);
    }
        // 서버로 전송할 데이터 구성
        const data = {
            name: challengeName,
            startDay: startDate,
            endDay: endDate,
            comment: introduction,
            caution: caution,
            point: deposit,
            max:max,
            img:imgUrl
        };
        try{
            // 파일이 선택된 경우에만 이미지 URL을 전달하도록 수정
            if (img) {
                data.img = URL.createObjectURL(img);
            }
                const res = await challengApi.uploadChallenge(data, token);
                setUploadPlan(res.data.payload);
        }
        catch(err){
            console.error(err);
        }
    }

    const DeleteBtn = () => {
        CloseModal();
    }

    return (
        <div>
            <Modal
                isOpen={isOpen}
                onRequestClose={CloseModal}
                contentLabel="챌린지 기획서"
            >
                <h3 className={MyStyle.name}>챌린지 기획서</h3>
                <div className={MyStyle.image}>
                    <p>대표이미지</p>
                    <input type="file" onChange={handleImageUpload}></input>
                    <img src={imagePreview} alt="대표 이미지 미리보기" />
                    <div>
                        <label>챌린지 이름</label>
                        <input type="text" placeholder="챌린지명을 입력하시오" onChange={handleChallengeNameChange}></input>
                    </div>
                    <div>
                        <label>챌린지 기간</label>
                        <input type="date" onChange={handleStartDateChange}></input>
                        -
                        <input type="date" onChange={handleEndDateChange}></input>
                    </div>
                    <div>
                        <label>챌린지 소개</label>
                        <input type="text" placeholder="당신의 챌린지를 소개해주세요" onChange={handleIntroductionChange}></input>
                    </div>
                    <div>
                        <label>챌린지 주의사항</label>
                        <input type="text" placeholder="당신의 챌린지를 소개해주세요" onChange={handleCautionChange}></input>
                    </div>
                    <div>
                        <label>모집인원</label>
                        <input type="text"  onChange={handlemaxChange} placeholder="최대 20명"></input>:명
                    </div>
                    <div>
                        <label>예치금</label>
                        <input type="number" onChange={handleDepositChange}></input>:P
                    </div>
                    <div>
                        <button onClick={uploadChallenge}>등록하기</button>
                        <button onClick={DeleteBtn}>취소하기</button>
                    </div>
                </div>
            </Modal>
        </div>
    );
}