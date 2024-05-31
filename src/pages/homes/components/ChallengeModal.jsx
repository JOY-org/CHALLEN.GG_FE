import { Box, Modal, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { useState,useEffect } from "react";
import { challengApi } from "../../../api/services/challenge"
import { useAuth } from "../../../hooks/useAuth";

const ChallengeModal = ({isModalOpen, handleClose,challenge}) => {
    const token = localStorage.getItem('token');
    const { loginUser } = useAuth();
    //유저가 참석했는지 확인하는 코드
    const [userAttend, setUserAttend] = useState();
    //참석하기 / 취소하기 버튼
    const [attend, setAttend] = useState();
    //참석버튼 클릭시 백엔드로 유저 정보 보내는 코드
    const [attendChallenge, setAttendChallenge] = useState();
    //취소버튼 클릭시 백엔드로 유저정보 보내는 코드
    const [refuse, setRefuse] = useState();

    const openAttend = () => {
        deleteAttend();
        setAttend(true)
    }

    const closeAttend = () => {
        postAttend(challenge.id)
        setAttend(false)
    }

    //챌린저 참여 여부를 알수있는 코드
    const getAttend = async()=>{
        try{
            const id = challenge.id
            const res = await challengApi.getSuccess(id,token)
            console.log(res.data.payload);
            setUserAttend(Boolean(res.data.payload.length))
            //.length 빈배열이면 0(false)
        }
        catch(err){
            console.error(err);
        }
    }

    //참여버튼 클릭시 백엔드로 유저 정보 보내는 코드
    const postAttend = async()=>{
        try{
            const challengeId = challenge.id
            const res = await challengApi.uploadSuccess(challengeId,token);
            setAttendChallenge(res.data.payload);
            setUserAttend(true);
        }
        catch(err){
            console.error(err);
        }
    }

    //취소버튼 클릭시 백엔드로 유저정보 보내는 코드
    const deleteAttend = async()=>{
        try{
            const challengeId = challenge.id
            const res = await challengApi.deleteSuccess(challengeId, token)
            setRefuse(res.data.payload)
            setUserAttend(false);
        }
        catch(err){
            console.error(err);
        }
    }


    useEffect(()=>{
        getAttend();
    },[challenge])

    return (
        <Modal
            open={isModalOpen}
            onClose={handleClose}
            aria-labelledby="title"
            aria-describedby="body"
        >
            <Box sx={style}>
                <div key={challenge.id}>
                    <Typography id="title" variant="h6" component="h2">
                        {challenge.name}
                    </Typography>
                    <Typography id="body1">
                        <img src={`http://localhost:8000${challenge.img}`} alt="챌린지 이미지" />
                    </Typography>
                    <Typography id="body2">
                        {challenge.comment}<br />
                        {challenge.caution}<br />
                        시작일: {challenge.startDay}<br />
                        완료일: {challenge.endDay}
                    </Typography>
                    <Typography id="body3">
                        {userAttend ?
                            <Button onClick={openAttend}>취소하기</Button>
                            :
                            <Button onClick={closeAttend}>참여하기</Button>
                        }
                    </Typography>
                    <Typography id="body4">
                        포인트점수:{challenge.point}P
                    </Typography>
                </div>
            </Box>
        </Modal>
    );
};
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    };

export default ChallengeModal;


