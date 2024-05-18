import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Swal from 'sweetalert2';
import { useForm } from 'react-hook-form';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function SignIn() {
    const {loginUser, login, logout} = useAuth();
    const navigate = useNavigate();

    // 로그인 성공시 홈으로 가는 Navi
    const handleLoginSuccess = () => {
        navigate('/MyPage');
    };

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
        }
    });

    const  onSubmit = (data) => {
        login(() => {
            Toast.fire({
                    icon: "error",
                    title: "틀렸습니다.",
                    text: '아이디나 비밀번호가 틀렸어요.'
                });
        }, data)
        reset();
        // 성공시 호출
        handleLoginSuccess();
    };

    const handleLogout = () => {
        logout(() => {
            Toast.fire({
                icon: "success",
                title: "안녕히가세요."
            });
        });
    }

    return (
        <Container component="main" maxWidth="xs" >
            <CssBaseline />
            <Box
                sx={{
                marginTop: 3,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                }}
            >
            <Avatar sx={{ m: 1, bgcolor: '#4483FD' }}>
                <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
                로그인
            </Typography>
            <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="id"
                    label="아이디"
                    name="id"
                    {...register("id",
                        {
                            required: '아이디는 필수 입력입니다.'
                        }
                    )}
                    error={errors.id ? true : false}
                    helperText={errors.id && errors.id.message}
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="비밀번호"
                    type="password"
                    id="password"
                    {...register("password",
                        {
                            required: '비밀번호는 필수 입력입니다.'
                        }
                    )}
                    error={errors.password ? true : false}
                    helperText={errors.password && errors.password.message}
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    // onClick={handleNavi}
                >
                    로그인
                </Button>
                <Grid container>
                    <Grid item xs>
                        <Link href="#" variant="body2">
                            비밀번호를 잊으셨나요?
                        </Link>
                    </Grid>
                    <Grid item>
                        <Link href="/signup" variant="body2">
                            {"아직 회원가입을 안하셨나요?"}
                        </Link>
                    </Grid>
                </Grid>
            </Box>
        </Box>
        </Container>
    );
}