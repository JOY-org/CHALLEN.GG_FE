import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import  styleHome  from "../../../components/css_module/Home.module.css";
import { RiStarSmileFill } from "react-icons/ri"
import { useState,useEffect } from "react";
import { challengApi } from "../../../api/services/challenge"




export default function Challenge({handleOpen}) {

    //관심'별' 상태관리코드
    const [starLike, setstarLike] = useState(false);
    const handleStar =()=>{
        setstarLike(!starLike)
    }

    //챌린지내용가져오기
    const [challengeList, setChallengeList] = useState([]);
    const getChallenge = async()=>{
        try{
            const res= await challengApi.getChallenge();
            setChallengeList(res.data.payload)
        }catch(err){
            console.error(err)
        }
    }

    useEffect(()=>{
        getChallenge();
    },[])

//     //기간 계산하기
//     const endDate = new Date({challengeList.endDay});
//     const createdAtDate = new Date({challengeList.createdAt});

// // 기간을 밀리초로 계산합니다.
//     const durationInMillis = endDate - createdAtDate;
//     const durationInDays = Math.ceil(durationInMillis / (1000 * 60 * 60 * 24))

    return (
        <>
        {challengeList.map((challenge) => (
            <Card
                key={challenge.id}
                sx={{ maxWidth: 345 }} className={styleHome.Challenge}  >
                <CardActionArea onClick={handleOpen} >
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
                        <Typography variant="body2" color="text.secondary">
                        
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <Typography variant="body3">
                    <RiStarSmileFill
                        onClick={handleStar}
                        style={{ fontSize: '30px', margin: '10px', color: starLike ? 'yellow' : "black" }}
                    />
                </Typography>
                </Card>
            ))}
        </>
    );
}