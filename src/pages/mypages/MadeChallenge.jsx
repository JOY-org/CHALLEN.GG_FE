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


//챌린지 기획 모달--------------------------------------------------------
export const MadeChallengeModal = ({isOpen, CloseModal}) => {
    const token = localStorage.getItem('token');
    //전체파일 상태관리
    const [uploadPlan, setUploadPlan] = useState();
    //각각 상태관리
    const [img, setImg] = useState(null);
    const [challengeName, setChallengeName] = useState("");
    const [imagePreview, setImagePreview] = useState(null);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [introduction, setIntroduction] = useState("");
    const [caution, setCaution] = useState("");
    const [deposit, setDeposit] = useState("");
    const [max, setMax] = useState(20);
    // FileReader()방식?
    //string길이가김 대신 가비지콜렉터에 의해 자동 수거
    //createObjectURL 방식??
    //가짜이미지??string길이가 짧은대신 자동수거 불가 적절한 revoke =>URL.revokeObjectURL()???

    const handleImageUpload = (e) => {
        const files = e.target.files;
        if (files && files[0]) {
            const file = files[0];
            const reader = new FileReader();
            reader.onloadend = () => {
                setImg(file);
                //console.log(file);
                setImagePreview(reader.result);
                //console.log(reader.result); //잘 들어오는데 서버로 전달이 안된다???
            };
            reader.readAsDataURL(file);
        }
    };
    const handleChallengeNameChange = (e) => setChallengeName(e.target.value);
    const handleStartDateChange = (e) => setStartDate(e.target.value);
    const handleEndDateChange = (e) => setEndDate(e.target.value);
    const handleIntroductionChange = (e) => setIntroduction(e.target.value);
    const handlemaxChange = (e) => setMax(e.target.value);
    const handleCautionChange = (e) => setCaution(e.target.value);
    const handleDepositChange = (e) => setDeposit(e.target.value);

    const uploadChallenge = async () => {
        if (!challengeName || !startDate || !endDate || !introduction || !deposit) {
            alert('필수 필드를 모두 입력해야 합니다.');
            return;
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
            img:img
        };
        try{
                const res = await challengApi.uploadChallenge(data, token);
                setUploadPlan(res.data.payload);
                console.log(res.data.payload);
                alert("챌린지 등록이 완료되었습니다");
                CloseModal();
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
                    {imagePreview && <img src={imagePreview} alt="대표 이미지 미리보기" />}
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