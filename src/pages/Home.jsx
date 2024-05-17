import styleHome from "../components/css_module/Home.module.css"
import Challenge from "../components/Challenge";
import Ranker from "./Ranker";
import { Children, useEffect, useState } from "react";
import ChallengeModal from "./ChallengeModal";
import Btn from "../components/Btn";



const Home = () => {
    //챌린지상세모달창의 상태 관리 코드
    const [ IsModalOpen, setIsModalOpen] = useState(false);
    const handleOpen = () => setIsModalOpen(true);
    const handleClose = () => setIsModalOpen(false);
    const [adText, setAdText] = useState();
    const [clickHolder, setClickHolder] = useState(false);
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


    return (

            <div className={styleHome.Home}>
                <div className={styleHome.btn}>
                    <Btn>전체</Btn>
                    <Btn>신규</Btn>
                    <Btn>마감임박</Btn>
                    <Btn>인기</Btn>
                    <Btn>관심</Btn>
                    <Btn>참여챌린지</Btn>
                    <input type="text"
                        placeholder={adText}
                    ></input>
                    <Btn>검색</Btn>
                </div>
                <div className={styleHome.challengeContainer}>
                    <Challenge handleOpen={handleOpen} />
                    <Challenge handleOpen={handleOpen} />
                    <Challenge handleOpen={handleOpen} />


                    <Ranker/>
                </div>
                { //false가 기본값이라 클릭전에는 모달이 보이지않음
                    <ChallengeModal handleClose={handleClose} IsModalOpen={IsModalOpen}/>
                }
            </div>
    );
}



export default Home;