import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import styleHome from "../../../components/css_module/Home.module.css";
import { RiStarSmileFill } from "react-icons/ri";
import { useState, useEffect } from "react";
import { useAuth } from "../../../hooks/useAuth";
import { challengApi } from "../../../api/services/challenge";

export default function Challenge({ challengeList, handleOpen }) {

    return (
        <>
        {challengeList?.map((challenge) => (
        <ChallengeCard
            challenge={challenge}
            handleOpen={handleOpen}
        />
        ))}
    </>
    );
}

//챌린지 내용
const ChallengeCard = ({ challenge, handleOpen }) => {
    const token = localStorage.getItem('token');
    const { loginUser } = useAuth();
    //관심챌린지 백엔드로 전송하는 상태관리코드
    const [postChallenge, setPostChallenge] = useState();
    //관심취소챌린지 백엔드로 전송하는 상태관리코드
    const [deleChallenge, setdeleChallenge] = useState();
     //관심'별' 상태관리코드
    const [starLike, setStarLike] = useState(false);

    const handleStar = (challenge) => {
        postStar(challenge.id);
        setStarLike(true);
    };
    const handleUnstar = (challenge) => {
        deleteStar(challenge.id);
        setStarLike(false);
    };
    //별모양 누르면 흥미있는 챌린지에 업로드
    const postStar = async(id)=>{
        try{
            const res = await challengApi.interestChallenge(id, token)
            setPostChallenge(res.data.payload);
        }catch(err){
            console.error(err);
        }
    }

    //별모양 다시 누르면 흥미있는 챌린지 삭재
    const deleteStar = async(id)=>{
        try{
            const res = await challengApi.uninterestChallenge(id, token)
            setdeleChallenge(res.data.payload);
        }catch(err){
            console.error(err);
        }
    }

    useEffect(()=>{
        const interesterArr = challenge.Interester;
        const result = interesterArr.some(obj => obj.id === loginUser);
        setStarLike(result)
    }, [challenge.Interester,loginUser.userId])

    useEffect(()=>{
        const uninteresterArr = challenge.Interester;
        const result = uninteresterArr.some(obj => obj.id === loginUser);
        setStarLike(result)
    }, [])

    return (
    <Card
        key={challenge.id}
        sx={{ maxWidth: 345 }}
        className={styleHome.Challenge}
    >
        <CardActionArea onClick={() => handleOpen(challenge)}>
        <CardMedia
            component="img"
            height="140"
            image={`http://localhost:8000${challenge.img}`}
            alt="챌린지사진"
        />
        <CardContent>
            <Typography gutterBottom variant="h5" component="div">
            {challenge.name}
            </Typography>
            <Typography variant="body2" >
            시작일: {challenge.startDay}
            <br />
            완료일: {challenge.endDay}
            </Typography>
        </CardContent>
        </CardActionArea>
        <Typography variant="body3">
        {loginUser ? (
            starLike ? (
                <RiStarSmileFill
                    onClick={() => handleUnstar(challenge)}
                    style={{ fontSize: "30px", margin: "10px", color: "yellow" }}
                />
            ) : (
                <RiStarSmileFill
                    onClick={() => handleStar(challenge)}
                    style={{ fontSize: "30px", margin: "10px", color: "black" }}
                />
            )
        ) : (
            ''
        )}

        </Typography>
    </Card>
    );
};
