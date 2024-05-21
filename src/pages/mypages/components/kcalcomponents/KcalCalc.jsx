import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

//저장버튼 누르면 디비로 보낼거임
//디비로 보내고 각 날짜별로 해당 칼로리 달력에 보여주기
//달력아래 한달치섭취 칼로리 할까말까?????????????


Modal.setAppElement('#root');

const KcalCalc=({isOpen,handleOpen,handleClose}) => {
    const [morning, setMorning] = useState(0);
    const [lunch, setLunch] = useState(0);
    const [dinner, setDinner] = useState(0);
    const [snack, setSnack] = useState(0);

    const sum = () => {
        return morning + lunch + dinner + snack;
    }

    return (
    <div>
        <Modal
        isOpen={isOpen}
        onAfterOpen={handleOpen}
        onRequestClose={handleClose}
        style={customStyles}
        contentLabel="Example Modal"
        >
            <h2>오늘 섭취 칼로리를 입력해주세요</h2>
            <label>아침</label>
            <input type="number" value={morning} onChange={(e) => setMorning(parseInt(e.target.value))} />
            <label>점심</label>
            <input type="number" value={lunch} onChange={(e) => setLunch(parseInt(e.target.value))} />
            <label>저녁</label>
            <input type="number" value={dinner} onChange={(e) => setDinner(parseInt(e.target.value))} />
            <label>간식</label>
            <input type="number" value={snack} onChange={(e) => setSnack(parseInt(e.target.value))} />
            <p>총 칼로리: {sum()}</p>
            <button type='submit' onClick={handleClose}>저장</button>
        </Modal>
    </div>
    );
}

export default KcalCalc;