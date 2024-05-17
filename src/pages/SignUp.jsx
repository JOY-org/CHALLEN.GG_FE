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
import {useForm} from 'react-hook-form'
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';


export default function SignUp() {
    const{
        register, 
        handleSubmit, 
        formState:{isSubmitting, isSubmitted, errors}
    } = useForm() 

    const navigate = useNavigate()

    const onRegist = (async (data) => {
        const { email, nickname, password, passwordCheck } = data
        try {
            if (email && nickname && password && passwordCheck && (password === passwordCheck)) {
                const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/join`, {
                    email,
                    nickname,
                    password
                })
                if (res.data.code === 200) {
                    Swal.fire({
                        title: "축하합니다!",
                        text: res.data.message,
                        icon: "success"
                    });
                    navigate('/');
                } else {
                    throw new Error(res.data.message);
                }
            } else {
                throw new Error("입력값을 확인해주세요");
            }
        } catch (err) {
            Swal.fire({
                title: "에러 발생",
                text: err.message,
                icon: "error"
            });
        }
    });

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
                sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                }}
            >
            <Avatar sx={{ m: 1, bgcolor: '#4483FD' }}>
                <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
                회원가입
            </Typography>
            <Box component="form" 
                onSubmit={handleSubmit(onRegist)} 
                noValidate 
                sx={{ mt: 1 }}
            >
                <TextField
                    autoComplete="off"
                    margin="normal"
                    required
                    fullWidth
                    id="userId"
                    label="아이디"
                    name="userId"
                    {...register("userId", 
                                {
                                    pattern: { 
                                        value: /^[a-z0-9_-]{5,20}$/, 
                                        message: "5~20자의 영문 소문자, 숫자와 특수기호(_),(-)만 사용 가능합니다." 
                                    } 
                                }
                            )}
                            error={errors.userPassword ? true : false}
                            helperText={errors.userPassword && "아이디는 필수 입력값입니다."}
                />
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            autoComplete="off"
                            margin="normal"
                            name="userPassword"
                            required
                            fullWidth
                            id="userPassword"
                            label="비밀번호"
                            {...register("userPassword", 
                                {
                                    pattern: { 
                                        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/, 
                                        message: "8~16자의 영문 대/소문자, 숫자, 특수문자를 사용해 주세요." 
                                    } 
                                }
                            )}
                            error={errors.userPassword ? true : false}
                            helperText={errors.userPassword && "비밀번호는 필수 입력값입니다."}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            autoComplete="off"
                            margin="normal"
                            required
                            fullWidth
                            id="passwordCheck"
                            label="비밀번호 확인"
                            name="passwordCheck"
                        />
                    </Grid>
                </Grid>
                <TextField
                    autoComplete="off"
                    margin="normal"
                    required
                    fullWidth
                    id="userNickName"
                    label="닉네임"
                    name="userNickName"
                    {...register('username',
                        {
                            required: '닉네임은 필수 입력입니다.',
                            maxLength: {
                                value: 8,
                                message: '8자리 이하 아이디를 사용하세요.'
                            },
                            minLength: {
                                value: 2,
                                message: '2자리 이상 아이디를 사용하세요.'
                            }
                        }
                    )}
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    disabled={isSubmitting}
                >
                    회원가입
                </Button>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Link href="/signin" variant="body2">
                                이미 아이디가 있으신가요?
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
}