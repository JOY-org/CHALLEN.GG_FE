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
                        <p>운동은 장비발! 안전을 위해 운동제품을 구매하는건 어떠세요?</p>
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
                        안녕하세요! 쇼핑몰을 담당한 차민성 개발자입니다.
                        쇼핑몰에선 여러분의 도전에 도움이 될만한 물품을 많이 판매하고있습니다.
                        도전도 좋지만 안전도전하세요!!
                    </p>
                    <br/>
                    <p>
                    <p style={{fontWeight:"bold"}}>
                        &lt;김진영 프론트개발자/&gt;</p>
                        "안녕하세요, CHALLEN.GG 개발팀에서 커뮤니티 페이지를 담당한 김진영 개발자입니다
                        커뮤니케이션이 챌린지지의 영혼이라고 볼수있는데요. 여기서 같은 관심사를 가진 사람들과
                        대화하며 감정을 교류하세요
                    </p>
                    <br/>
                    <p>
                    <p style={{fontWeight:"bold"}}>
                        &lt;조다솜 프론트개발자/&gt;</p>
                        안녕하세요 CHALLEN.GG 개발팀의 조다솜개발자입니다.
                        저는 메인페이지와 마이페이지를 담당했는데요. 메인페이지에선 챌린지의 정체성과 많은 챌린지를
                        사용자의 입장에서 편리하게 보여주기위해 최선을 다했으며 많은 피드백을 환영합니다
                        마이페이지는 챌린지지의 가장중요한 핵심기능이라고 생각되는데요 나의 개인정보와 진행중인 챌린지
                        그리고 칼로리를 기록하고 챌린지를 내가 개설할수있는 칸이 마련되있습니다.
                        이곳에서 자신의 도전을 기록하세요!!
                    </p>
                </div>
            </div>

                <img src={sevenimg} alt="남자가 앉아있는 이미지" className={styleHome.lastImg}/>
                <p className={styleHome.lastText}>자 이제 챌린지지를 이해하셨나요?<br/>그럼 당장 도전하세요 당신의 새로운 미래를 위해</p>
                <box  className={styleHome.Box}></box>
            <Menufilter
                sortKey={sortKey}
                setSortKey={setSortKey}
                handleSearchInputChange={handleSearchInputChange}
                handleSearch={handleSearch}
            />
            <div className={styleHome.challengeContainer}>
                <Challenge challengeList={challengeList} />
            </div>
            <div>
                <Ranker />
            </div>
            {/* <AdMain /> */}
        </div>
    );
};

export default Home;

