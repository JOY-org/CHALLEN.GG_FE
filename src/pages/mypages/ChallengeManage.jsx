import { useEffect, useState } from "react";
import MyStyle from "../../components/css_module/MyPage.module.css"
import { challengApi } from "../../api/services/challenge"

const ChallengeManage = () => {
    const [openChallengeList, setOpenChallengeList] = useState(false);
    const closeList = () => {setOpenChallengeList(false)}
    const openList = () => {setOpenChallengeList(true)}

//개인 첼린지가 들어가야하는데 전체 챌린지를 불러옴
//나중에 바꾸셈
    const [challengeList, setChallengeList] = useState([]);

    const getChallenge = async()=>{
        try{
            const res= await challengApi.getChallenge();
            setChallengeList(res.data.payload)
            console.log(res.data.payload);
        }catch(err){
            console.error(err)
        }
    }

    useEffect(()=>{
        getChallenge();
    },[])

    return (
        <div className={MyStyle.ChallengeManag}>
            <button onClick={openList}>진행중</button>
            <button onClick={closeList}>완료</button>
            {openChallengeList ? (
                <ul>
                    {challengeList
                        .filter(challenge => !challenge.isCompleted)
                        .map(challenge => (
                            <li key={challenge.id} className={MyStyle.ChallengeItem}>
                                {challenge.name}
                                <button className={MyStyle.AuthButton}>인증</button>
                            </li>
                        ))
                    }
                </ul>
            ) : (
                <ul>
                    {challengeList
                        .filter(challenge => challenge.isCompleted)
                        .map(challenge => (
                            <li key={challenge.id} className={MyStyle.ChallengeItem}>
                                {challenge.name}
                                <button className={MyStyle.AuthButton}>완료</button>
                            </li>
                        ))
                    }
                </ul>
            )}
        </div>
    );
}

export default ChallengeManage;