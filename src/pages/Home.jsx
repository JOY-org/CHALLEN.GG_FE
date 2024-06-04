import styleHome from "../pages/homes/css_module/Home.module.css"
import Challenge from "../pages/homes/components/Challenge";
import Ranker from "../pages/homes/components/Ranker";
import AdMain from "../pages/homes/components/AdMain";
import Menufilter from "./homes/components/MenuFilter";
import { useState, useEffect } from "react";
import { challengApi } from "../api/services/challenge";
import { useAuth } from "../hooks/useAuth";
import oneimg from "../pages/homes/images/header_bg.jpg"
import twoimg from "../pages/homes/images/app_image1.jpg"
import threeimg from "../pages/homes/images/app_image2.png"
import fourtimg from "../pages/homes/images/app_image3.png"
import fiveimg from "../pages/homes/images/five.png"
import siximg from "../pages/homes/images/iPhone-app.png"
import sevenimg from "../pages/homes/images/seven_img.jpg"

const Home = () => {
    const { loginUser, kakaoLogin } = useAuth();
    const [sortKey, setSortKey] = useState();
    const [searchTerm, setSearchTerm] = useState("");
    const [challengeList, setChallengeList] = useState([]);
    
    useEffect(() => {
        kakaoLogin();
    }, []);

    useEffect(() => {
        getChallenge(); // 페이지가 처음 렌더링될 때 챌린지 데이터를 가져옴
    }, [sortKey]);

    const getChallenge = async () => {
        try {
            const res = await challengApi.getChallenge();
            sortData(res.data.payload);
            console.log(res.data.payload);
        } catch (err) {
            console.error(err);
        }
    };

    const sortData = (arr) => {
        let data;
        if (!sortKey || sortKey === "전체") setChallengeList(arr); // 필터가 없으면 전체 리스트 반환
        if (sortKey === "신규") {
            data = [...arr.sort((a, b) => {
                return new Date(a.createdAt) - new Date(b.createdAt)
            })];
            setChallengeList([...data]);
        }
        if (sortKey === "마감임박") {
            data = [...arr.sort((a, b) => new Date(b.endDay) - new Date(a.endDay))];
            setChallengeList([...data]);
        }
        if (sortKey === "인기") {
            data = [...arr.sort((a, b) => new Date(b.number) - new Date(a.number))];
            setChallengeList([...data]);
        }
        if (sortKey === "관심") {
            setChallengeList(arr.filter(challenge => challenge.Interester.some(user => user.id === loginUser)));
        }
    };

    const handleSearchInputChange = (e) => {
        setSearchTerm(e.target.value); // 입력된 검색어를 상태에 저장
    };

    const handleSearch = () => {
        if (searchTerm.trim() === "") {
            // 검색어가 비어있으면 전체 리스트 보여주기
            getChallenge(); // 검색어가 없을 때는 전체 리스트를 다시 불러오기
        } else {
            console.log("ddddd");
            // 검색어가 입력되면 해당 검색어를 기준으로 필터링
            const filteredList = challengeList.filter(challenge =>
                challenge.name.toLowerCase().includes(searchTerm.toLowerCase()) // name을 기준으로 검색
            );
            setChallengeList(filteredList);
        }
    };
     //styleHeader.HeaderClass:헤더 전체
    //logo:challen.gg 로고


    return (
        <div className={styleHome.Home}>
            <img
                src={oneimg}
                alt="여성이 주먹을 쥐고노려보는 이미지"
                className={styleHome.girlImg}/>
            <p className={styleHome.text}>챌린지지와<br/> 함께 새로운 도전이 시작된다</p>

            <div className={styleHome.threeImg}>
                <img src={threeimg} alt="운동하는 여성"/>
                <div>
                    <h1>CHALLEN.GG(챌린지지)</h1>
                    <div>
                        <p>패자의 뜻인 GG?! NO!</p>
                        <p>GG는 원래 good game이 줄임말입니다.</p>
                        <p>good game이라는 말을 패자가 하여 마치 진다는 뜻으로 와전되었지만
                    사실 승자를 인정하고 도전 자체를 즐기는 뜻입니다.</p>
                    <p>CHALLEN.GG(챌린지지)는 끊임없이 도전하고 성공과 실패를 겪으며 도파민을 충족하는 도전자들의
                    욕구를 채우기 위해 등장했습니다.</p>
                    <p>CHALLEN.GG(챌린지지)안에는 여러 도전자들이 만든 많은 도전과제로 가득하며 그안에서 서로의
                    성공과정을 보며 의지를 다잡을수있습니다.</p>
                    <p>우리는 수많은 도전을통해 정신과 신체에 건강을 불어넣으며 커뮤니티를 통해 같은 생각을 공유하는
                    사람들과 소통하고 소속감을 부여하여
                    갓생러들의 모습을 기대합니다.</p>
                    </div>
                </div>
            </div>
            <div className={styleHome.menu}>
                <h1 className={styleHome.menufirstText}> 페이지별 소개</h1>
                <div className={styleHome.menuText}>
                    <div>
                        <h2>&lt;메인페이지/&gt;</h2>
                        <p>챌린지지의 소개및 수많은챌린지,오늘의 프로챌린저를 확인하세요</p>
                    </div>
                    <div>
                        <h2>&lt;커뮤니티/&gt;</h2>
                        <p>같은 챌린지나 비슷한 관심사를 공유하는 사람과 소통해보세요</p>
                    </div>
                    <div>
                        <h2>&lt;쇼핑몰/&gt;</h2>
                        <p>요즘은 장비발! 안전을 위해 운동제품을 구매하는건 어떠세요?</p>
                    </div>
                    <div>
                        <h2>&lt;마이페이지/&gt;</h2>
                        <p>나의레벨,포인트,팔로워와 진행중인 챌린지를 한눈에 확인가능합니다
                            <br/>다이어트는 식이! 매일 칼로리를 기록하세요
                        </p>
                    </div>
                </div>
                <div >
                    <img src={fiveimg}  className={styleHome.menuImg}/>
                </div>
            </div>
            <div>
            </div>

            <div className={styleHome.develop}>
                <div className={styleHome.develop1}>
                <h1 className={styleHome.developText}>백엔드가 전합니다</h1>
                    <p>
                        <p style={{fontWeight:"bold"}}>
                        &lt;김우진 백엔드개발자/&gt;</p>
                        여기서 여러분은 다양한 건강 챌린지에 참여하며 새로운 건강한 삶을 시작하실 수 있습니다.
                        꾸준한 도전과 성취를 통해 여러분의 생활 습관을 긍정적으로 변화시키고, 건강한 몸과 마음을 만들어 나가세요.
                        뿐만 아니라, 여러분의 소중한 운동 꿀팁과 경험을 많은 사람들과 나눌 수 있는 공간도 마련되어 있습니다.
                        여러분의 공유와 소통이 더 많은 사람들에게 동기부여가 될 것입니다.
                        우리와 함께 건강한 삶을 만들어가는 여정에 동참해보세요. 여러분의 건강한 삶을 진심으로 응원합니다!
                    </p>
                    <br/>
                    <p>
                    <p style={{fontWeight:"bold"}}>
                        &lt;박석원 백엔드개발자/&gt;</p>
                        "Hello I'm Seokwon. 저희 개발팀은 CHALLEN.GG를 통해 여러분이 더 쉽게 운동을 계획하고, 동기부여를 받고, 목표를 달성할 수 있기를 바랍니다.
                        Without me. 저는 여러분의 건강에 별로 관심이 없기 때문에, 저희 앱을 추천드리지 않도록 하겠습니다.
                        Because... 저희 앱을 이용하신다면 건강해지는 건 당연하기 때문입니다. 설마 여기까지 읽는 사람이 있겠어?
                        Anyway, 저 같은 경우는 개발에 열중한 나머지 머리를 자를 시간이 없어 어느새 앞머리가 콧구멍까지 내려왔습니다.
                        추천하지는 않겠지만 이용해주신다면 감사하겠습니다. Thank you"
                    </p>
                </div>
                <img src={siximg} className={styleHome.develop2} alt="두남녀가 서로 등을 맞대고 서있는 이미지"/>
                <div className={styleHome.develop3}>
                <h1 >프론트가 전합니다</h1>
                    <p>
                    <p style={{fontWeight:"bold"}}>
                        &lt;차민성 프론트개발자/&gt;</p>
                        안녕하세요! 저희는 CHALLEN.GG의 개발팀입니다. 이 플랫폼은 여러분이 건강하고 활기찬 삶을 누릴 수 있도록 돕기 위해 만들어졌습니다.
                        우리는 건강 관리가 재미있고 보람 있는 경험이 되기를 바라는 마음으로 CHALLEN.GG를 개발했습니다.
                        여러분이 작은 도전부터 큰 목표까지 이룰 수 있도록, 레벨업 시스템과 보상 구조를 설계했습니다.
                        커뮤니티와 함께하는 과정 속에서 서로 격려하고 응원하며 더 나은 자신을 만들어 가세요.
                        항상 여러분의 건강과 행복을 응원합니다. 함께 도전하고, 함께 성장합시다!
                    </p>
                    <br/>
                    <p>
                    <p style={{fontWeight:"bold"}}>
                        &lt;김진영 프론트개발자/&gt;</p>
                        "안녕하세요, CHALLEN.GG 개발팀입니다.
                        CHALLEN.GG를 통해 여러분이 더 쉽게 운동을 계획하고, 동기부여를 받고, 목표를 달성할 수 있기를 바랍니다.
                        여러분의 건강과 행복을 위해 저희가 만든 이 어플리케이션이 작은 도움이 되기를 진심으로 바랍니다.
                        여러분의 피드백은 언제나 환영합니다. 함께 성장하고, 도전하며, 더 나은 내일을 만들어 나가요.
                        감사합니다."
                    </p>
                    <br/>
                    <p>
                    <p style={{fontWeight:"bold"}}>
                        &lt;조다솜 프론트개발자/&gt;</p>
                        안녕하세요 JOY팀의 조다솜개발자입니다.
                        저희 팀은 사용자의 편의를 위해 최선을 다해 고민했고 개발 하는 과정에서도 가장 좋은 코드와 디자인을 만들어내기위해
                        최선을 다했습니다.
                        저희 챌린지지는 여러분의 적극적인 활동을 위해 커뮤니케이션과 챌린지 개설등 사용자가 원하는 도전을 할수있게 만들었습니다.
                        작은 도전이라도 주저하지마시고 성취해내어 더나은 내일이 되길 바랍니다
                    </p>
                </div>
            </div>
            <div>
                <img src={sevenimg} alt="남자가 앉아있는 이미지"/>
            </div>
            <Menufilter
                sortKey={sortKey}
                setSortKey={setSortKey}
                handleSearchInputChange={handleSearchInputChange}
                handleSearch={handleSearch}
            />
            <div className={styleHome.challengeContainer}>
                <Challenge challengeList={challengeList} />
            </div>
            <Ranker />
            <AdMain />
        </div>
    );
};

export default Home;

