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
import { postApi } from "../api/services/post";
import { useAuth } from "../hooks/useAuth";
import axios from "axios";
import { useCallback } from "react";
import Swal from "sweetalert2";



export default function CommunityPostModal({postDetail, setPosts, posts, handleClosePost}) {
  const {loginUser} = useAuth()

  const [myFollowing, setMyFollowing] = useState();

    const deletePost = async (id) => {
      const res = await axios.delete(`${process.env.REACT_APP_API_URL}/post/${id}`, {
          headers: {
              "Authorization": localStorage.getItem("token"),
          },
      });
      if (res.data.code === 200) {
          setPosts(posts.filter(p => p.id !== id));
          Swal.fire({
              text: res.data.message,
              icon: "success"
          })
          handleClosePost()
      }
  }


  

  return (
      <Card sx={{ boxShadow: 'none'}}>
        <CardHeader
          avatar={
            <Avatar
              src='https://images.unsplash.com/photo-1551884831-bbf3cdc6469e?q=80&w=1948&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
            />
          }

          title={postDetail.User.nickname}
          subheader={postDetail.createdAt.slice(0,10)}
        />
        <CardMedia
          component="img"
          height="250"
          image={`http://localhost:8000/${postDetail.img}`}
          alt="본문 이미지"
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {postDetail.content}
          </Typography>
        </CardContent>
        <CardActions style={{display:'flex', justifyContent:'space-between'}}>
          <div>
            <IconButton>
                <FavoriteBorderIcon style={{color:'red'}}/> 
                {/* <FavoriteIcon style={{color:'red'}}/> */}
            </IconButton>
            <IconButton>
              <ModeCommentIcon />
            </IconButton>
          </div>
          {loginUser.id === postDetail.UserId &&
            <Button onClick={()=>deletePost(postDetail.id)}>삭제</Button>
          }
          
        </CardActions>
      </Card>
  );
}
