import MyStyle from "../mypages/css_module/MyPage.module.css"
import * as React from "react";
import { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import moment from "moment";
import Modal from 'react-modal';
import { userApi } from "../../api/services/user";
import Box from '@mui/material/Box';

// 마이페이지의 칼로리 달력 코드입니다
// 칼로리달력, 칼로리 계산 모달창

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

  const todayKcal = async() => {
    try {
        const res = await userApi.getCalorie(token);
        setDateKcal(res.data.payload);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    todayKcal();
  }, [isOpen]);

  return (
    <Box
      className={MyStyle.Kcal}
      sx={{
        '& .react-calendar': {
          borderTop: '3px solid #00aeda;',
          borderBottom: '3px solid #00aeda;',
          borderLeft:'none',
          borderRight:'none',
          padding: '10px',
        },
        '& .react-calendar__tile': {
          textAlign: 'center',
          height: '80px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
        },
      }}
    >
      <Calendar
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
    </Box>
  );
};

export default Kcal;

Modal.setAppElement("#root");

const KcalCalc = ({ isOpen, handleOpen, handleClose, selectedDate }) => {

  const token = localStorage.getItem("token")
  const [morning, setMorning] = useState(0);
  const [lunch, setLunch] = useState(0);
  const [dinner, setDinner] = useState(0);
  const [snack, setSnack] = useState(0);

  const [Kcal, setKcal] = useState(0);

  const sumKcal = async() => {
    try {
      const totalCalories = morning + lunch + dinner + snack;
      const data = {
        date: selectedDate,
        sum: totalCalories
      };
      const res = await userApi.uploadCalorie(data, token);
      setKcal(res.data.payload.sum);
      console.log(res.data.payload.sum);
      console.log(res.data.payload);
    } catch (err) {
      console.error(err);
    }
  };


  return (
    <div>
      <Modal
        isOpen={isOpen}
        onAfterOpen={handleOpen}
        onRequestClose={handleClose}
        className={MyStyle.KcalWrite}
        // style={customStyles}
        contentLabel="KcalCalc Modal"
      >
        <h2 id={MyStyle.KcalText}>오늘 섭취 칼로리를 입력해주세요</h2>
        <div className={MyStyle.FoodKcal}>
          <label>아침 : </label>
          <input
            type="number"
            value={morning}
            onChange={(e) => setMorning(parseInt(e.target.value))}
          />
        </div>
        <div className={MyStyle.FoodKcal}>
          <label>점심 : </label>
          <input
            type="number"
            value={lunch}
            onChange={(e) => setLunch(parseInt(e.target.value))}
          />
        </div>
        <div className={MyStyle.FoodKcal}>
          <label>저녁 : </label>
          <input
            type="number"
            value={dinner}
            onChange={(e) => setDinner(parseInt(e.target.value))}
          />
        </div>
        <div className={MyStyle.FoodKcal}>
          <label>간식 : </label>
          <input
            type="number"
            value={snack}
            onChange={(e) => setSnack(parseInt(e.target.value))}
          />
        </div>
        <div  className={MyStyle.btn3}>
          <button onClick={sumKcal} className={MyStyle.btn4}>계산하기</button>
          <p className={MyStyle.sum}>총 칼로리: {Kcal}Kcal</p>
          <button
            type="submit"
            onClick={handleClose}
            className={MyStyle.btn4}>
            저장하기
          </button>
        </div>
      </Modal>
    </div>
  );
};
