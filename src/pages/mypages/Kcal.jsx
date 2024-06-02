import MyStyle from "../mypages/css_module/MyPage.module.css"
import * as React from "react";
import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import moment from "moment";
import Modal from 'react-modal';
//마이페이지의 칼로리 달력 코드입니다
//칼로리달력 , 칼로리 계산 모달창

const Kcal = () => {
  const [value, setValue] = useState(new Date());

  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  const kcalOpen = (value, event) => {
    setIsOpen(true);
  };

  return (
    <div className={MyStyle.Kcal}>
      <Calendar
        className={MyStyle.Calendar}
        value={value}
        onClickDay={(value, event) => kcalOpen(value, event)}
        formatDay={(locale, date) => moment(date).format("DD")}
      />
      <KcalCalc
        className={MyStyle.KcalCalc}
        handleOpen={handleOpen}
        handleClose={handleClose}
        isOpen={isOpen}
      />
    </div>
  );
};

export default Kcal;


// 칼로리 입력하는 모달창 코드

Modal.setAppElement("#root");

const KcalCalc = ({ isOpen, handleOpen, handleClose }) => {
  const [morning, setMorning] = useState(0);
  const [lunch, setLunch] = useState(0);
  const [dinner, setDinner] = useState(0);
  const [snack, setSnack] = useState(0);

  const sum = () => {
    return morning + lunch + dinner + snack;
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
        <p className={MyStyle.sum}>총 칼로리: {sum()}Kcal</p>
        <button type="submit" onClick={handleClose}>
          저장
        </button>
      </Modal>
    </div>
  );
};
