import MyStyle from "../../../../components/css_module/MyPage.module.css";
import * as React from 'react';
import { useState } from "react";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import moment from "moment";
import KcalCalc from './KcalCalc';


const Kcal = () => {


    const [value, setValue] = useState(new Date());

    const [isOpen, setIsOpen] = useState(false);
    const handleOpen = () => setIsOpen(true);
    const handleClose = () => setIsOpen(false);

    const kcalOpen =(value, event)=>{
        setIsOpen(true)
    }

    return (
        <div className={MyStyle.Kcal}>
            <Calendar className={MyStyle.Calendar}
                        value={value}
                        onClickDay={(value, event) => kcalOpen(value, event)}
                        formatDay={(locale, date) => moment(date).format("DD")}
            />
            <KcalCalc className={MyStyle.KcalCalc} handleOpen={handleOpen} handleClose={handleClose} isOpen={isOpen}/>
        </div>
    );
}

export default Kcal;
