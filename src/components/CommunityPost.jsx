import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ModeCommentIcon from '@mui/icons-material/ModeComment';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useState } from "react";
import { Button } from "@mui/material";



export default function CommunityPost() {

  const [handleLikeColor, setHandleLikeColor] = useState(true);
  const [handleFollow, setHandleFollow] = useState(true);

  return (
    <Card sx={{ maxWidth: 368 }}>
      <CardHeader
        avatar={
          <Avatar>
            프사
          </Avatar>
        }
        action={
          <Button variant="text" onClick={()=>{setHandleFollow(!handleFollow)}}>
            팔로우 {handleFollow ? '취소' : ''}
          </Button>
        }
        title="사용자 닉네임"
        subheader="May 7, 2024"
      />
      <CardMedia
        component="img"
        height="250"
        image="https://img.danawa.com/prod_img/500000/750/822/img/17822750_3.jpg?_v=20220929125248"
        alt="본문 이미지"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse cupiditate voluptatem facilis necessitatibus, 
          nam quod sed illo ullam aspernatur! Nihil ullam dicta natus, doloribus sunt atque laboriosam magni rerum modi?
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton onClick={()=>{setHandleLikeColor(!handleLikeColor)}}>
          {handleLikeColor ? 
            <FavoriteBorderIcon style={{color:'red'}}/> 
            : 
            <FavoriteIcon style={{color:'red'}}/>}
        </IconButton>

        <IconButton>
          <ModeCommentIcon />
        </IconButton>

      </CardActions>
    </Card>
  );
}
