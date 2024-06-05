//import socket from '../api/services/socket';
import * as React from 'react';
import { styled } from '@mui/material/styles';
import { grey } from '@mui/material/colors';
import Typography from '@mui/material/Typography';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import { userApi } from '../api/services/user';
import { useEffect } from 'react';
import { useState } from 'react';
import styleHome from "../pages/homes/css_module/Home.module.css"
const drawerBleeding = 56;


const Root = styled('div')(({ theme }) => ({
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

  const deleteNotification = async (id) => {
    const res = await userApi.deleteNotification(id, localStorage.getItem("token"));
    if (res.data.code === 200) {
      setNotis(notis.filter((c) => c.id !== id));
      Swal.fire({
        text: res.data.message,
        icon: "success",
      });
    }
  };


  return (
    <Root >
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
          <Typography sx={{ p: 2, }}>&lt;My Message/&gt;</Typography>
          <div className={styleHome.Messages}>
            {notis.map((noti, index) => (
              <div key={noti.id || index}>
                <Typography className={styleHome.Message}>{noti.content || noti}</Typography>
                <button                      
                  onClick={() => {
                  deleteNotification(noti.id);
                  }}>
                삭제
                </button>
              </div>
            ))
          }
          </div>
      </SwipeableDrawer>
    </Root>
  );
}

export default SwipeableEdgeDrawer;
