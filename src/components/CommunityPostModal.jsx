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



export default function CommunityPostModal() {

  const [handleLikeColor, setHandleLikeColor] = useState(true);
  const [handleFollow, setHandleFollow] = useState(true);

  return (
      <Card sx={{ boxShadow: 'none'}}>
        <CardHeader
          avatar={
            <Avatar
              src='https://images.unsplash.com/photo-1551884831-bbf3cdc6469e?q=80&w=1948&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
            />
          }
          action={
            <Button variant="text" onClick={()=>{setHandleFollow(!handleFollow)}}>
              팔로우 {handleFollow ? '취소' : ''}
            </Button>
          }
          title="김진영"
          subheader="2024.05.20"
        />
        <CardMedia
          component="img"
          height="250"
          image="https://images.unsplash.com/photo-1585909694668-0a6e0ddbfe8b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTA4fHxpbmZvcm1hdGlvbnxlbnwwfHwwfHx8MA%3D%3D"
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
