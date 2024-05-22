import { Button } from "@material-ui/core";
import axios from "axios";
import { useEffect, useState } from "react";
import Modal from 'react-modal';
import MyStyle from "../../components/css_module/MyPage.module.css"
import { Height, Margin } from "@mui/icons-material";
import { useAuth } from "../../hooks/useAuth";
//팔로잉팔로우 모달창

const Follow = ({user}) => {
    const { loginUser } = useAuth();
    //팔로워
    const [followerList, setFollowerList] = useState();
    //팔로워모달창
    const [followerOpen, setFollowerOpen] = useState(false);
    //이미지를 가져오는
    const [profileImg, setProfileImg] = useState("");
    //팔로우삭제
    const [delFollower, setdelFollower] = useState();


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

    useEffect(()=>{
        getFollowerList();
    },[])
    const followerToggle =()=>{
        setFollowerOpen(!followerOpen)
    }

    //로컬에 저장한 프로필 이미지를 불러오는 코드
    useEffect(() => {
        const key =`profileImg_${loginUser.id}`;
        setProfileImg(key);
    }, [loginUser.id]);



    //(언팔로워) 삭제버튼
    const deleteFollow = async (id) => {
        try{
            const res = await axios.delete(`${process.env.REACT_APP_API_URL}/users/follow`,{
                headers:{
                    "Authorization": localStorage.getItem('token')
                }, data: {
                    id: id // 삭제하려는 사용자의 ID를 data로 전달
                }
            });
            if(res.data.code === 200) {
                console.log(res.data);
                setFollowerList(prevList => prevList.filter(follower => follower.id !== id));
            }else{
                console.log('API 호출 실패: 상태 코드', res.data.code);
            }
        } catch (error) {
            // API 호출 중에 발생한 오류를 처리
            console.error('API 호출 중 에러:', error);
        }
    }


    return (
    <>
        <Button onClick={followerToggle}>팔로잉</Button>
            {followerOpen &&
                <FollowList
                    user={user}
                    followerList={followerList}
                    isOpen={followerOpen}
                    onRequestClose={followerToggle}
                    deleteFollow={deleteFollow}

                />
            }
    </>
    );
}

export default Follow;
Modal.setAppElement("#root");

//팔로워리스트 모달창
export const FollowList = ({ followerList, isOpen, onRequestClose, profileImg,deleteFollow}) => {

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

    return (
        <div>
            <Modal
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
                        src={`http://localhost:8000/uploads/${profileImg}.png`}
                        onError={(e) => e.target.src = `http://localhost:8000/uploads/default.png`}
                    />
                </div>
                <div className={MyStyle.flexContainer}>
                    <div className={MyStyle.followNick}>
                        {follower.nickname}
                    </div>
                    <div className={MyStyle.followDel}>
                        <button onClick={()=>{deleteFollow(follower.id)}}>삭제</button>
                    </div>
                </div>

            </li>
        ))}
        </ul>
        </Modal>
        </div>
        );
    };

