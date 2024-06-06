import React from 'react';

const Banner = () => {
    const randomChoiceAD = () => {
        const advertise = ["한국장학재단tel:02-4252-1845",
                            "8282런닝 크루 멤버 모집",
                            "나이스윙 골프크루 32회 골프대회 우승"]
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

