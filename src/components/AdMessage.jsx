import React from 'react';
import styles from '../components/css_module/Banner.module.css';
const Banner = () => {
    const randomChoiceAD = () => {
        const advertise = ["한국장학재단tel:02-4252-1845",
                            "한빛고아원 봉사자모집",
                            "아름드리 양로원 어버이날 행사 봉사자모집"]
        const idx = Math.floor(Math.random() * advertise.length);
        return advertise[idx]
    }
    return (
            <span className='first'>
                {randomChoiceAD()}
            </span>

    );
}

export default Banner;

