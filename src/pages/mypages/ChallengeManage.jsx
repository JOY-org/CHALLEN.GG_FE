import { useEffect, useState } from "react";
import MyStyle from "../mypages/css_module/MyPage.module.css";
import { challengApi } from "../../api/services/challenge";
import { useAuth } from "../../hooks/useAuth";

const ChallengeManage = () => {
    const { loginUser } = useAuth();
    const token = localStorage.getItem('token');
    const [openChallengeList, setOpenChallengeList] = useState(false);
    const closeList = () => { setOpenChallengeList(false) };
    const openList = () => { setOpenChallengeList(true) };

    const [myChallenge, setMyChallenge] = useState([]);

    const getChallenge = async () => {
        try {
            const res = await challengApi.getSuccess(loginUser.userId, token);
            console.log(res.data.payload);
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
                <button onClick={openList}>진행중</button>
                <button onClick={closeList}>완료</button>
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

export const ChallengeList = ({ challenges }) => {
    return (
        <ul>
            {challenges.map((challengeItem) => (
                challengeItem.Challenge && (
                    <li key={challengeItem.Challenge.id} className={MyStyle.ChallengeItem}>
                        {challengeItem.Challenge.name}
                        {!challengeItem.success?
                            <button className={MyStyle.AuthButton}>인증</button>
                        :
                            ""
                        }
                    </li>
                )
            ))}
        </ul>
    );
};

