import { useAuth } from "../../../hooks/useAuth";
import Btn from "../../../components/Btn";
import styleHome from "../css_module/Home.module.css"
import TopAd from "./TopAd";
import { useState} from "react";



const Menufilter = ({challengeList,setChallengeList}) => {
    const { loginUser } = useAuth();

    const [filterselet, setFilterselet] = useState();

    const handleFilterClick = (filterMenu) => {
        let filteredList = [...challengeList];
        if (!filterMenu) return challengeList; // 필터가 없으면 전체 리스트 반환
        if (filterMenu === "전체") return filteredList;
        if (filterMenu === "신규") {
            filteredList= filteredList.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            console.log("신규");
        }
        if (filterMenu === "마감임박") {
            filteredList= filteredList.sort((a, b) => new Date(b.endDay) - new Date(a.endDay));
        }
        if (filterMenu === "인기") {
            filteredList= filteredList.sort((a, b) => new Date(b.max) - new Date(a.max));
        }
        if (filterMenu === "관심") {
            filteredList = filteredList.filter(challenge => challenge.Interester.some(user => user.id === loginUser.userId));
        }
        if (filterMenu === "참여챌린지") {
            filteredList = filteredList.filter(challenge => challenge.userAttend);
        }
        setChallengeList(filteredList);
    };

    return (
        <>
            {loginUser ?
                <div className={styleHome.btn}>
                    {/* 그냥 전체 나열 */}
                    <Btn onClick={() => handleFilterClick('전체')}>전체</Btn>
                    {/* createdAt 최근순 */}
                    <Btn onClick={() => handleFilterClick('신규')}>신규</Btn>
                    {/* startDay가 현재날짜와 가장 가까운순 */}
                    <Btn onClick={() => handleFilterClick('마감임박')}>마감임박</Btn>
                    {/* max최대인원수가 가장 적게 남은 사람 */}
                    <Btn onClick={() => handleFilterClick('인기')}>인기</Btn>
                    {/* 로그인한 사용자가 좋아요한 리스트 */}
                    <Btn onClick={() => handleFilterClick('관심')}>관심</Btn>
                    {/* 로그인한 사용자가 참여중인 챌린지 리스트 */}
                    <Btn onClick={() => handleFilterClick('참여챌린지')}>참여챌린지</Btn>
                    <input type="text"></input><TopAd/>
                    <Btn>검색</Btn>
                </div>
                :
                <div className={styleHome.btn}>
                    <Btn onClick={() => handleFilterClick('전체')}>전체</Btn>
                    <Btn onClick={() => handleFilterClick('신규')}>신규</Btn>
                    <Btn onClick={() => handleFilterClick('마감임박')}>마감임박</Btn>
                    <Btn onClick={() => handleFilterClick('인기')}>인기</Btn>
                    <input type="text"></input><TopAd/>
                    <Btn>검색</Btn>
                </div>
            }
        </>
    );
}

export default Menufilter;