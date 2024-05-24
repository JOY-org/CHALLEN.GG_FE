import { Button } from "@material-ui/core";
import axios from "axios";
import { useEffect, useState } from "react";
import Modal from 'react-modal';
import MyStyle from "../../components/css_module/MyPage.module.css"
import { Height, Margin } from "@mui/icons-material";
import { useAuth } from "../../hooks/useAuth";
//팔로잉팔로우 모달창

const Follow = ({user}) => {
    //팔로잉모달창
    const [modalOpen, setModalOpen] = useState(null);

    const followingOpen =()=>{
        setModalOpen('following')
    }

    const followerOpen = () => {
        setModalOpen('follower')
    }

    const modalClose = () => {
        setModalOpen(null);
    }

    return (
    <div className={MyStyle.followBtn}>
        <Button onClick={followerOpen}>팔로워</Button>
        <FollowList
            isOpen={modalOpen}
            onRequestClose={modalClose}
            user={user}
        />
        <Button onClick={followingOpen}>팔로잉</Button>
        <FollowList
            isOpen={modalOpen}
            onRequestClose={modalClose}
            user={user}
        />
    </div>
    );
}

export default Follow;

// --------------------------팔로우 모달창---------------
Modal.setAppElement("#root");

//팔로워리스트 모달창
export const FollowList = ({isOpen, onRequestClose ,user,followingOpen}) => {

    const { loginUser } = useAuth();

    //이미지를 가져오는
    const [profileImg, setProfileImg] = useState("");

    //팔로워리스트
    const [followerList, setFollowerList] = useState([]);
    //팔로잉리스트
    const [followingList, setFollowingList] = useState([]);

    //팔로우하기
    const [followYou, setfollowYou] = useState([]);

    //팔로워리스트
    const getFollowerList = async () =>{
        try {
            const id = user.id
            // console.log(id); 아이디 제대로 찍힘
            const url = `${process.env.REACT_APP_API_URL}/users/followers/${id}`;
            const res = await axios.get(url);
            if(res.data.code===200){
                setFollowerList(res.data.payload)
                //console.log(res.data.payload); //제대로 가져옴
            }
        }catch (error) {
            console.error(error);
        }
    }


    //팔로잉리스트
    const getFollowingList = async () =>{
        try {
            const id = user.id
            // console.log(id); 아이디 제대로 찍힘
            const url = `${process.env.REACT_APP_API_URL}/users/followings/${id}`;
            const res = await axios.get(url);
            if(res.data.code===200){
                setFollowingList(res.data.payload)
                //console.log(res.data.payload); //제대로 가져옴
            }
        }catch (error) {
            console.error(error);
        }
    }

    //로컬에 저장한 프로필 이미지를 불러오는 코드
    useEffect(() => {
        const key =`profileImg_${loginUser.id}`;
        setProfileImg(key);
    }, [loginUser.id]);

    //(언팔로워) 삭제버튼
    const unFollow = async (id) => {
        try{
            const res = await axios.delete(`${process.env.REACT_APP_API_URL}/users/follow`,{
                headers:{
                    "Authorization": localStorage.getItem('token')
                }, data: {
                    id: id // 삭제하려는 사용자의 ID를 data로 전달
                }
            });
            if(res.data.code === 200) {
                setFollowingList(prevList => prevList.filter(following => following.id !== id));
            }else{
                console.log('API 호출 실패: 상태 코드', res.data.code);
            }
        } catch (error) {
            // API 호출 중에 발생한 오류를 처리
            console.error('API 호출 중 에러:', error);
        }
    }

    //팔로우하기 버튼(팔로워모달창에 존재)
    const handleFollowYou = async(id)=>{
        try{
            const res = await axios.post(
                `${process.env.REACT_APP_API_URL}/users/follow`,
                { id: id },
                { headers:{ "Authorization": localStorage.getItem('token') }}
            );
            if(res.data.code === 200) {
                setfollowYou(res.data.payload)
                // 팔로잉 리스트를 갱신
                getFollowingList();
            }else{
                console.log('API 호출 실패: 상태 코드', res.data.code);
            }
        } catch (error) {
            // API 호출 중에 발생한 오류를 처리
            console.error('API 호출 중 에러:', error);
        }
    }
    useEffect(()=>{
        getFollowerList();
        getFollowingList();
    },[])



    const customStyles = {
        content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            width:'300px',
            height:'400px',
            transform: "translate(-50%, -50%)",
        },
        };

    if (isOpen === 'follower')
        return (<Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            style={customStyles}
            contentLabel="Followers List"
        >
            <h2>Followers</h2>
            <ul>
                {followerList.map((follower) => (
                    <li key={follower.id}>
                        <div>
                            <img className={MyStyle.followImg}
                                src={`http://localhost:8000/uploads/user/${profileImg}.png`}
                                onError={(e) => e.target.src =  `http://localhost:8000/uploads/user/default.png`}
                            />
                        </div>
                        <div className={MyStyle.flexContainer}>
                            <div className={MyStyle.followNick}>
                                {follower.nickname}
                            </div>
                            <div className={MyStyle.followYou}>
                                <button
                                    onClick={()=>{handleFollowYou(follower.id)}}
                                    style={{
                                        border:'none',
                                        padding:'3px' ,
                                        borderRadius:"5px",
                                        margin:'5px',
                                        cursor:'pointer',
                                        backgroundColor: followerList.some(f => f.id === follower.id)
                                            && followingList.some(f => f.id === follower.id)
                                            ? "#b5ccfa"  // "팔로잉"일 때의 배경색
                                            : "#4483FD",  // "팔로워"일 때의 배경색 (기본값)
                                    }}>
                                        {followerList.some(f => f.id === follower.id)
                                        && //.some함수가 하나라도 만족해야되지만 &&때문에 동시에 실행되어 조건을 두개다 만족해야 true
                                        followingList.some(f => f.id === follower.id)
                                        ?
                                        "팔로잉"
                                        :
                                        "팔로워"}
                                        </button>
                                    </div>

                        </div>
                    </li>
                ))}
            </ul>
        </Modal>)
    else if (isOpen === 'following')
        return (<Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            style={customStyles}
            contentLabel="Followings List"
        >
            <h2>Followings</h2>
            <ul>
                {followingList.map((following) => (
                    <li key={following.id}>
                        <div>
                            <img className={MyStyle.followImg}
                                src={`http://localhost:8000/uploads/user/${profileImg}.png`}
                                onError={(e) => e.target.src = `http://localhost:8000/uploads/user/default.png`}
                            />
                        </div>
                        <div className={MyStyle.flexContainer}>
                            <div className={MyStyle.followNick}>
                                {following.nickname}
                            </div>
                            <div className={MyStyle.followDel}>
                                <button
                                    onClick={()=>{unFollow(following.id)}}
                                    style={{
                                        border:'none',
                                        padding:'3px' ,
                                        borderRadius:"5px",
                                        margin:'5px',
                                        cursor:'pointer',
                                    }}
                                    >언팔로우</button>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </Modal>)
    else return(<></>)
}