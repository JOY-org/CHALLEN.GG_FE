import styleHome from "../pages/homes/css_module/Home.module.css"
import Challenge from "../pages/homes/components/Challenge";
import Ranker from "../pages/homes/components/Ranker";
import AdMain from "../pages/homes/components/AdMain";
import Menufilter from "./homes/components/MenuFilter";
import { useState, useEffect } from "react";
import { challengApi } from "../api/services/challenge";

const Home = () => {

     //챌린지내용가져오기
    const [challengeList, setChallengeList] = useState();
     //챌린지 리스트를 가져오는 코드
    const getChallenge = async () => {
        try {
            const res = await challengApi.getChallenge();
            setChallengeList(res.data.payload)
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(()=>{
        getChallenge();
    },[]);



    return (
            <div className={styleHome.Home}>
                <Menufilter challengeList={challengeList} setChallengeList={setChallengeList} />
                <div className={styleHome.challengeContainer}>
                    <Challenge  challengeList={challengeList}  />
                    <Ranker/>
                </div>
                <AdMain/>
            </div>
    );
}



export default Home;