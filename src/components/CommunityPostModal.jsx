import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ModeCommentIcon from "@mui/icons-material/ModeComment";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Button } from "@mui/material";
import { useAuth } from "../hooks/useAuth";
import axios from "axios";
import Swal from "sweetalert2";
import { useState } from "react";
import { useEffect } from "react";

export default function CommunityPostModal({
  postDetail,
  setPosts,
  posts,
  handleClosePost,
}) {
  const { loginUser } = useAuth();
  const deletePost = async (id) => {
    const res = await axios.delete(
      `${process.env.REACT_APP_API_URL}/post/${id}`,
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
    );
    if (res.data.code === 200) {
      setPosts(posts.filter((p) => p.id !== id));
      Swal.fire({
        text: res.data.message,
        icon: "success",
      });
      handleClosePost();
    }
  };

  // 게시글 작성자 팔로우 관련
  const [myFollowing, setMyFollowing] = useState();

  const getFollowings = async()=>{
    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/users/followings/${loginUser?.id}`,{
            headers: {
                Authorization: loginUser.token
            }
        })
        setMyFollowing(res.data.payload);
        // console.log(res.data.payload);
    } catch (error){
        console.error(error);
    }
  }
  useEffect(()=>{
    getFollowings();
    getLikedPostsByUserId()
  }, []);

  const followUser = async (id) => {
    const res = await axios.post(
      `${process.env.REACT_APP_API_URL}/users/follow`,
      {
        id,
      },
      {
        headers: {
          Authorization: loginUser.token
        },
      }
    );
    if (res.data.code === 200) {
      Swal.fire({
        text: res.data.message,
        icon: "success",
      });
      getFollowings()
      handleClosePost();
    }
  };

  const unfollowUser = async (id) => {
    const res = await axios.delete(
      `${process.env.REACT_APP_API_URL}/users/follow`,
      {
        headers: {
          Authorization: loginUser.token
        },
        data: {
          id,
        },
      }
    );
    if (res.data.code === 200) {
      Swal.fire({
        text: res.data.message,
        icon: "success",
      });
      getFollowings()
      handleClosePost();
    }
  };
  // 게시글 좋아요
  const [pressedLike, setPressedLike] = useState();
  const getLikedPostsByUserId = async()=>{
    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/post/postlike/likePosts/${loginUser.id}`,{
            headers: {
                Authorization: loginUser.token
            }
        })
        setPressedLike(res.data.payload)
    } catch (error){
        console.error(error);
    }
  }

  const likePost = async (id) => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/post/postlike`, {id},
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      if (res.data.code === 200) {
        Swal.fire({
          text: res.data.message,
          icon: "success",
        });
      }
    } catch (error) {
      Swal.fire({
        text: "게시물에 좋아요를 누르는 중 오류가 발생했습니다.",
        icon: "error",
      });
    } finally {
      handleClosePost();
    }
  };

  const unlikePost = async (id) => {
    try {
      const res = await axios.delete(
        `${process.env.REACT_APP_API_URL}/post/postlike`, {id},
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      if (res.data.code === 200) {
        Swal.fire({
          text: res.data.message,
          icon: "success",
        });
      }
    } catch (error) {
      Swal.fire({
        text: "게시물에 좋아요 취소를 하는 중 오류가 발생했습니다.",
        icon: "error",
      });
    } finally {
      handleClosePost();
    }
  };

  return (
    <Card sx={{ boxShadow: "none" }}>
      <CardHeader
        avatar={<Avatar src={`http://localhost:8000/${postDetail.User.img}`} />}
        title={postDetail.User.nickname}
        subheader={postDetail.createdAt.slice(0, 10)}
        action={ (loginUser.id && loginUser.id !== postDetail.UserId) ?
            (myFollowing?.findIndex(f => f.id === postDetail.UserId) !== -1 ?
              <Button onClick={() => unfollowUser(postDetail.UserId)}>팔로우 취소</Button>
              :
              <Button onClick={() => followUser(postDetail.UserId)}>팔로우</Button>
            )
          :
            ''
        }
      />

      <CardMedia
        component="img"
        height="200"
        image={`http://localhost:8000/${postDetail.img}`}
        alt="본문 이미지"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {postDetail.content}
        </Typography>
      </CardContent>
      <CardActions style={{ display: "flex", justifyContent: "space-between" }}>
        <div>
          <IconButton>
            {pressedLike?.findIndex(f => f.id === postDetail.id) == -1 ?
              <FavoriteBorderIcon
                style={{ color: "red" }}
                onClick={() => {
                likePost(postDetail.id);
              }}
              />
              :
              <FavoriteIcon 
                style={{color:'red'}}
                onClick={()=>{
                unlikePost(postDetail.id)
              }}
            />
            }
            
          </IconButton>
          <IconButton>
            <ModeCommentIcon />
          </IconButton>
        </div>
        {loginUser.id === postDetail.UserId && (
          <Button onClick={() => deletePost(postDetail.id)}>삭제</Button>
        )}
      </CardActions>
    </Card>
  );
}
