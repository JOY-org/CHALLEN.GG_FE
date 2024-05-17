import { Box, Modal, Typography, styled } from '@mui/material';
import React, { useState } from 'react';
import Button from '@mui/material/Button';


const ChallengeModal = ({IsModalOpen, handleClose,handleOpen}) => {

    return (
        <>
        <div>
            <Modal
                open={IsModalOpen}
                onClose={handleClose}
                aria-labelledby="title"
                aria-describedby="body"
        >
                <Box sx={style}>
                <Typography id="title" variant="h6" component="h2">
                    챌린지 제목
                </Typography>
                <Typography id="body1" >
                    이미지넣을 곳
                </Typography>
                <Typography id="body2" >
                    상세설명,후기,주의사항,기한
                </Typography>
                <Typography id="body3" >
                    <Button>신청/취소버튼</Button>
                </Typography>
                <Typography id="body4" >
                    포인트점수
                </Typography>
                </Box>
        </Modal>
    </div>
    </>
    );
}
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    };

export default ChallengeModal;


