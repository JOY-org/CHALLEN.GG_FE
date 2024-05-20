import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import  styleHome  from "../../../components/css_module/Home.module.css";
import { RiStarSmileFill } from "react-icons/ri"
import { useState } from "react";
import { Height } from '@mui/icons-material';



export default function Challenge({handleOpen}) {

    //관심'별' 상태관리코드
    const [starLike, setstarLike] = useState(false);
    const handleStar =()=>{
        setstarLike(!starLike)
    }

    return (
    <Card sx={{ maxWidth: 345}} className={styleHome.Challenge}  >
        {/* 챌린지를 누르면 모달 창이 나오도록 onClick 조치 */}
        <CardActionArea onClick={handleOpen} >
        <CardMedia
            component="img"
            height="140"
            image="https://res.heraldm.com/content/image/2016/09/06/20160906001324_0.jpg"
            alt="챌린지사진"
        />
        <CardContent>
            <Typography gutterBottom variant="h5" component="div">
            하루에 푸시업 100개씩
            </Typography>
            <Typography variant="body2" color="text.secondary">
            챌린지 기간
            </Typography>
        </CardContent>
        </CardActionArea>
        <Typography variant="body3">
            {/* 관심"별" */}
            <RiStarSmileFill
                onClick={handleStar}
                style={{fontSize:'30px',margin:'10px',color: starLike? 'yellow':"black"}}
            />
            </Typography>
    </Card>
        )
}