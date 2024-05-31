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
import {
  Box,
  Button,
  Divider,
  InputAdornment,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Pagination,
  Stack,
  TextField,
} from "@mui/material";
import { useAuth } from "../../hooks/useAuth";
import Swal from "sweetalert2";
import { useState } from "react";
import { useEffect } from "react";
import { postApi } from "../../api/services/post";
import { userApi } from "../../api/services/user";
import { getRelativeTime } from "../../utils/date";
import AddCommentIcon from "@mui/icons-material/AddComment";
import { useForm } from "react-hook-form";

export default function CommunityPostModal({
  postDetail,
  setPosts,
  posts,
  handleClosePost,
  postComment,
  setPostComment,
  getComment,
}) {
  const SHOW_POST_NUM = 5;
  const { loginUser } = useAuth();
  const [curPage, setCurPage] = useState(1);
  const [totalPage, setTotalPage] = useState();
  const [pressedLike, setPressedLike] = useState();
  const [myFollowing, setMyFollowing] = useState();
  const [showComment, setShowComment] = useState(false);

  const {
    register,
    reset,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm({ mode: "onChange" });

  // 게시글 삭제
  const deletePost = async (id) => {
    const res = await postApi.deletePost(id, localStorage.getItem("token"));
    if (res.data.code === 200) {
      setPosts(posts.filter((p) => p.id !== id));
      Swal.fire({
        text: res.data.message,
        icon: "success",
      });
      handleClosePost();
    }
  };
  // --------

  // 게시글 작성자 팔로우 관련
  const getFollowings = async (id) => {
    try {
      const res = await userApi.getFollowings(
        id,
        localStorage.getItem("token")
      );
      setMyFollowing(res.data.payload);
    } catch (error) {
      console.error(error);
    }
  };

  const followUser = async (id) => {
    const res = await userApi.followUser(id, localStorage.getItem("token"));
    if (res.data.code === 200) {
      Swal.fire({
        text: res.data.message,
        icon: "success",
      });
      getFollowings(loginUser);
    }
  };

  const unfollowUser = async (id) => {
    const res = await userApi.unFollowUser(id, localStorage.getItem("token"));
    if (res.data.code === 200) {
      Swal.fire({
        text: res.data.message,
        icon: "success",
      });
      getFollowings(loginUser);
    }
  };
  // --------

  // 댓글창 관련
  const toggleComment = () => {
    setShowComment((prev) => !prev);
  };

  console.log(postComment);
  const onRegist = async (data) => {
    try {
      const commentInput = {
        content: data.content,
        postId: postDetail.id,
      };
      const res = await postApi.uploadComment(
        commentInput,
        localStorage.getItem("token")
      );
      if (res.data.code === 200) {
        setPostComment(res.data.payload);
        reset();
      } else {
        throw new Error("알 수 없는 에러");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const deleteComment = async (id) => {
    const res = await postApi.deleteComment(id, localStorage.getItem("token"));
    if (res.data.code === 200) {
      setPostComment(postComment.filter((c) => c.id !== id));
      Swal.fire({
        text: res.data.message,
        icon: "success",
      });
    }
  };

  // pagination 관련
  useEffect(() => {
    setTotalPage(Math.floor(postComment?.length / SHOW_POST_NUM) + 1);
  }, [postComment]);

  const handlePage = (e, v) => {
    setCurPage(v);
  };
  // --------

  // 게시글 좋아요 관련
  const getLikedPostsByUserId = async (id) => {
    try {
      const res = await postApi.getLikedPostsByUserId(
        id,
        localStorage.getItem("token")
      );
      setPressedLike(res.data.payload);
    } catch (error) {
      console.error(error);
    }
  };

  const likePost = async (id) => {
    try {
      const res = await postApi.likePost(id, localStorage.getItem("token"));
      if (res.data.code === 200) {
        getLikedPostsByUserId(loginUser);
      }
    } catch (error) {
      Swal.fire({
        text: "게시물에 좋아요를 누르는 중 오류가 발생했습니다.",
        icon: "error",
      });
    }
  };

  const unlikePost = async (id) => {
    try {
      const res = await postApi.unlikePost(id, localStorage.getItem("token"));
      if (res.data.code === 200) {
        getLikedPostsByUserId(loginUser);
      }
    } catch (error) {
      Swal.fire({
        text: "게시물에 좋아요 취소를 하는 중 오류가 발생했습니다.",
        icon: "error",
      });
    }
  };
  // --------

  const handleClick = () => {
    window.open(
      `http://localhost:8000/${postDetail.img}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  useEffect(() => {
    getComment(postDetail.id);
  }, []);

  useEffect(() => {
    getFollowings(loginUser);
    getLikedPostsByUserId(loginUser);
  }, [loginUser]);

  return (
    <Card sx={{ boxShadow: "none" }}>
      <CardHeader
        avatar={<Avatar src={`http://localhost:8000/${postDetail.User.img}`} />}
        title={postDetail.User.nickname}
        subheader={getRelativeTime(postDetail.createdAt)}
        action={
          loginUser && loginUser !== postDetail.UserId ? (
            myFollowing?.findIndex((f) => f.id === postDetail.UserId) !== -1 ? (
              <Button onClick={() => unfollowUser(postDetail.UserId)}>
                팔로우 취소
              </Button>
            ) : (
              <Button onClick={() => followUser(postDetail.UserId)}>
                팔로우
              </Button>
            )
          ) : (
            ""
          )
        }
      />

      <CardMedia
        component="img"
        // height="200"
        style={{ width: "100%", cursor: "pointer" }}
        title="클릭하면 확대된 사진을 볼 수 있어요"
        image={`http://localhost:8000/${postDetail.img}`}
        onClick={handleClick}
        alt="본문 이미지"
      />
      <CardContent>
        <Typography
          variant="body1"
          color="text.secondary"
          style={{ textAlign: "left" }}
        >
          {postDetail.content}
        </Typography>
      </CardContent>
      <CardActions style={{ display: "flex", justifyContent: "space-between" }}>
        <div>
          {loginUser ? (
            pressedLike?.findIndex((f) => f.id === postDetail.id) === -1 ? (
              <IconButton>
                <FavoriteBorderIcon
                  style={{ color: "red" }}
                  onClick={() => {
                    likePost(postDetail.id);
                  }}
                />
              </IconButton>
            ) : (
              <IconButton>
                <FavoriteIcon
                  style={{ color: "red" }}
                  onClick={() => {
                    unlikePost(postDetail.id);
                  }}
                />
              </IconButton>
            )
          ) : null}

          <IconButton onClick={toggleComment}>
            <ModeCommentIcon sx={{color:'#4483FD'}}/>
          </IconButton>
        </div>
        {loginUser === postDetail.UserId && (
          <Button onClick={() => deletePost(postDetail.id)}>삭제</Button>
        )}
      </CardActions>
      <CardActions>
        {showComment && (
          <List sx={{ width: "100%", bgcolor: "background.paper" }}>
            <Box
              component="form"
              onSubmit={handleSubmit(onRegist)}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                multiline
                sx={{ width: "100%", marginBottom: "10px" }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton type="submit" disabled={isSubmitting}>
                        <AddCommentIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                autoComplete="off"
                {...register("content", {
                  required: "댓글은 필수 입력입니다.",
                  maxLength: {
                    value: 150,
                    message: "댓글은 최대 150자까지 입력가능합니다.",
                  },
                })}
                spellCheck={false}
                error={errors.content ? true : false}
                helperText={errors.content && errors.content.message}
              />
            </Box>
            {/* 댓글목록 뿌려주기 */}
            {postComment &&
              postComment
                .slice(SHOW_POST_NUM * (curPage - 1), SHOW_POST_NUM * curPage)
                .map((c) => {
                  return (
                    <>
                      <Divider variant="inset" component="li" />
                      <ListItem alignItems="flex-start">
                        <ListItemAvatar>
                          <Avatar src={`http://localhost:8000/${c.User.img}`} />
                        </ListItemAvatar>
                        <ListItemText
                          sx={{ width: "80%" }}
                          secondary={
                            <React.Fragment>
                              <Typography
                                sx={{ display: "inline" }}
                                component="span"
                                variant="body2"
                                color="text.primary"
                              >
                                {c.User.nickname}
                                <p
                                  style={{
                                    marginRight: "0px",
                                    fontSize: "12px",
                                  }}
                                >
                                  {getRelativeTime(c.createdAt)}
                                </p>
                              </Typography>
                              <br />
                              {c.content}
                            </React.Fragment>
                          }
                        />
                        {loginUser === c.UserId && (
                          <Button onClick={()=>{deleteComment(c.id)}}>
                            삭제
                          </Button>
                        )}
                      </ListItem>
                    </>
                  );
                })}
            <Stack sx={{ alignItems: "center", mt: "20px" }}>
              <Pagination count={totalPage} onChange={handlePage}></Pagination>
            </Stack>
          </List>
        )}
      </CardActions>
    </Card>
  );
}
