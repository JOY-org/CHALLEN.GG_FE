import { useState, useEffect } from "react";

const TopAd = () => {
    const [adText, setAdText] = useState();
    const TextList = [
        '오늘의 챌린지 추천!',
        "하늘 봉사단에서 멤버모집",
        '베스트첼린저 랭킹 변동!',
        '다이어트에 좋은 챌린지추천',
        '트래킹챌린지 출시'
    ]

    function getRandomInt(max){
        return Math.floor(Math.random()*max);
    }

    useEffect(()=>{
        const randomIndex = getRandomInt(TextList.length);
        const selecedAdText = TextList[randomIndex];
        setAdText(selecedAdText);
    }, [])

    const handleAdClick = () =>{
        setAdText("");
    }
    return (
        <>
        <p onClick={handleAdClick}>{adText}</p>
        </>
    );
}

export default TopAd;