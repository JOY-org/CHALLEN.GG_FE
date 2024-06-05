import MyStyle from "../mypages/css_module/MyPage.module.css"
import * as React from "react";
import { useState,useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import moment from "moment";
import Modal from 'react-modal';
import { userApi } from "../../api/services/user";


//마이페이지의 칼로리 달력 코드입니다
//칼로리달력 , 칼로리 계산 모달창

const Kcal = () => {
  const token = localStorage.getItem("token")
  const [value, setValue] = useState(new Date());

  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);
  const [dateKcal, setDateKcal] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const kcalOpen = (value, event) => {
    setIsOpen(true);
    setSelectedDate(value);
  };

  const todayKcal = async()=>{
    try{
        const res = await userApi.getCalorie(token);
          setDateKcal(res.data.payload)
    }catch(err){
      console.error(err);
    }
  }

  useEffect(()=>{
    todayKcal();
  },[isOpen])


  return (
    <div className={MyStyle.Kcal}>
      <Calendar
        sx={{
          wordWrap: 'break-word',
          textAlign: 'center',
          fontSize: '12px',
          maxWidth: '100px', 
          height: 'auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '5px',
          boxSizing: 'border-box'
        }}
        className={MyStyle.Calendar}
        value={value}
        onClickDay={(value, event) => kcalOpen(value, event)}
        formatDay={(locale, date) => moment(date).format("DD")}
        tileContent={({ date }) => {
          const formattedDate = moment(date).format("YYYY-MM-DD");
          const kcalInfo = dateKcal.find((item) => item.date === formattedDate);
          if (kcalInfo) {
            return <p className={MyStyle.KcalTile}>{kcalInfo.sum}K</p>;
          } else {
            return null; // 칼로리 정보가 없는 날짜는 표시하지 않음
          }
        }}
      />
      <KcalCalc
        className={MyStyle.KcalCalc}
        handleOpen={handleOpen}
        handleClose={() => setIsOpen(false)}
        isOpen={isOpen}
        selectedDate={selectedDate}
      />
    </div>
  );
};

export default Kcal;


// 칼로리 입력하는 모달창 코드

Modal.setAppElement("#root");

const KcalCalc = ({ isOpen, handleOpen, handleClose, selectedDate }) => {
  const token = localStorage.getItem("token")
  const [morning, setMorning] = useState(0);
  const [lunch, setLunch] = useState(0);
  const [dinner, setDinner] = useState(0);
  const [snack, setSnack] = useState(0);

  const [Kcal, setKcal] = useState(0);

  const  sumKcal = async() => {
    try{
      const totalCalories = morning + lunch + dinner + snack;
      const data = {
        date: selectedDate,
        sum: totalCalories
      };
        const res = await userApi.uploadCalorie(data,token);
        setKcal(res.data.payload.sum);
        console.log(res.data.payload.sum);
        console.log(res.data.payload);
    }catch(err){
      console.error(err);
    }
  };

  return (
    <div >
      <Modal
        isOpen={isOpen}
        onAfterOpen={handleOpen}
        onRequestClose={handleClose}
        className={MyStyle.KcalWrite}
        contentLabel="KcalCalc Modal"
      >
        <h2 >오늘 섭취 칼로리를 입력해주세요</h2>
        <div>
        <label>아침 : </label>
          <input
            type="number"
            value={morning}
            onChange={(e) => setMorning(parseInt(e.target.value))}
          />
        </div>
        <div>
          <label>점심 : </label>
          <input
            type="number"
            value={lunch}
            onChange={(e) => setLunch(parseInt(e.target.value))}
          />
        </div>
        <div>
          <label>저녁 : </label>
          <input
            type="number"
            value={dinner}
            onChange={(e) => setDinner(parseInt(e.target.value))}
          />
        </div>
        <div>
          <label>간식 : </label>
          <input
            type="number"
            value={snack}
            onChange={(e) => setSnack(parseInt(e.target.value))}
          />
        </div>
        <button onClick={sumKcal} className={MyStyle.btn3}>계산하기</button>
        <p className={MyStyle.sum} >총 칼로리: {Kcal}Kcal</p>
        <button type="submit" onClick={handleClose}  className={MyStyle.btn3}>
          저장하기
        </button>
      </Modal>
    </div>
  );
};
