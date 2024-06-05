import { createContext, useEffect, useState } from "react";
import MyStyle from "../mypages/css_module/MyPage.module.css";
import { challengApi } from "../../api/services/challenge";
import { useAuth } from "../../hooks/useAuth";
import Certification from "../mypages/Certification";

const ChallengeManage = () => {
    const { loginUser } = useAuth();
    const token = localStorage.getItem('token');
    const [openChallengeList, setOpenChallengeList] = useState(true);
    const closeList = () => { setOpenChallengeList(false) };
    const openList = () => { setOpenChallengeList(true) };

    const [myChallenge, setMyChallenge] = useState([]);

    const getChallenge = async () => {
        try {
            const res = await challengApi.getSuccess(loginUser.userId, token);
            setMyChallenge(res.data.payload);
        } catch (err) {
            console.error(err);
        }
    };


    useEffect(() => {
        getChallenge();
    }, []);

        return (
            <div className={MyStyle.ChallengeManag}>
                <div className={MyStyle.btn1}>
                    <button onClick={closeList}  className={MyStyle.btn2}>완료</button>
                    <button onClick={openList}  className={MyStyle.btn2}>진행중</button>
                </div>
                {openChallengeList ? (
                <ChallengeList challenges={myChallenge.filter((challengeItem) => !challengeItem.success)}
                />
            ) : (
                <ChallengeList challenges={myChallenge.filter((challengeItem) => challengeItem.success)} />
            )}
            </div>
        );
    };

export default ChallengeManage;

export const UserChallengeItem = createContext("챌린지 정보가없습니다")

export const ChallengeList = ({ challenges }) => {
    return (
        <div className={MyStyle.ChallengeMap}>
            {challenges.map((challengeItem) => (
                <UserChallengeItem.Provider
                    key={challengeItem.Challenge.id}
                    value={challengeItem}>
                    {challengeItem.Challenge && (
                        <li className={MyStyle.ChallengeLists} key={challengeItem.Challenge.id} >
                            {challengeItem.Challenge.name}
                            {!challengeItem.success ?
                                <Certification challengeItem={challengeItem} />
                                : ""
                            }
                        </li>
                    )}
                </UserChallengeItem.Provider>
            ))}
        </div>
    );
};

