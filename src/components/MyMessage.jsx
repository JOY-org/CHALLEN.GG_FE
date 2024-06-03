//import socket from '../api/services/socket';
import * as React from 'react';
import { Global } from '@emotion/react';
import { styled } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { grey } from '@mui/material/colors';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import { userApi } from '../api/services/user';
import { useEffect } from 'react';
import { useState } from 'react';
const drawerBleeding = 56;


const Root = styled('div')(({ theme }) => ({
  height: '100%',
  backgroundColor:
    theme.palette.mode === 'light' ? grey[100] : theme.palette.background.default,
}));

function SwipeableEdgeDrawer({openDrawer,toggleDrawer}) {

  const token = localStorage.getItem("token")
  const [notis, setNotis] = useState([]);

  const GetNotification = async () => {
    try {
      const res = await userApi.getNotification(token);
      if (!res.data.payload || res.data.payload.length === 0) {
        setNotis(["알림이 없습니다"]);
      }else{
        setNotis(res.data.payload);
        console.log(res.data.payload);}
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    GetNotification();
  }, []); // useEffect를 이 함수 내에서 호출하도록 이동


  return (
    <Root >
      <CssBaseline />
      <SwipeableDrawer
        open={openDrawer}
        onClose={() => { toggleDrawer(false) }}
        onOpen={() => { toggleDrawer(true) }}
        swipeAreaWidth={drawerBleeding}
        disableSwipeToOpen={false}
        ModalProps={{
          keepMounted: true,
        }}
      >
          <Typography sx={{ p: 2, color: 'text.secondary' }}>My Message</Typography>
            {notis.map((noti, index) => (
              <div key={noti.id || index}>
              <Typography>{noti.content || noti}</Typography>
            </div>
            ))
          }
      </SwipeableDrawer>
    </Root>
  );
}

export default SwipeableEdgeDrawer;
