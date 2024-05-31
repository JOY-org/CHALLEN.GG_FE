import styleHome from "../components/css_module/Home.module.css"
import Challenge from "../pages/homes/components/Challenge";
import Ranker from "../pages/homes/components/Ranker";
import { Children, useEffect, useState } from "react";
import ChallengeModal from "../pages/homes/components/ChallengeModal";
import Btn from "../components/Btn";
import AdMain from "../pages/homes/components/AdMain";
import { challengApi } from "../api/services/challenge";
import { useAuth } from "../hooks/useAuth";


const Home = () => {
    const { loginUser } = useAuth();
    //챌린지내용가져오기
    const [challengeList, setChallengeList] = useState();
    const [challengeDetail, setChallengeDetail] = useState();

    const getChallenge = async()=>{
        try{
            const res= await challengApi.getChallenge();
            setChallengeList(res.data.payload)
        }catch(err){
            console.error(err)
        }
    }

    useEffect(()=>{
        getChallenge();
    },[])

    //챌린지상세모달창의 상태 관리 코드
    const [ isModalOpen, setIsModalOpen] = useState(false);
    const handleOpen = (challenge) => {
        setIsModalOpen(true);
        setChallengeDetail(challenge);
    }
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
                {loginUser?
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
                :
                <div className={styleHome.btn}>
                    <Btn>전체</Btn>
                    <Btn>신규</Btn>
                    <Btn>마감임박</Btn>
                    <Btn>인기</Btn>
                    <input type="text"
                        placeholder={adText}
                    ></input>
                    <Btn>검색</Btn>
                </div>
                }

                <AdMain/>
                <div className={styleHome.challengeContainer}>
                    {/* CHALLENGE LIST */}
                    <Challenge challengeList={challengeList} handleOpen={handleOpen} />
                    <Ranker/>
                </div>
                { challengeDetail &&
                    <ChallengeModal isModalOpen={isModalOpen} handleClose={handleClose} challenge={challengeDetail}/>
                }
            </div>
    );
}



export default Home;