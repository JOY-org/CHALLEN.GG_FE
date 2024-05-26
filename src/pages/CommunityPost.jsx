import { Button, IconButton, InputAdornment, Stack, TextField} from '@mui/material';
import styles from '../components/css_module/CommunityPost.module.css'
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Pagination } from '@mui/material';
import PostCreate from '../components/PostCreate';
import PostModal from '../components/PostModal';
import { postApi } from "../api/services/post";
import Swal from 'sweetalert2';
import SearchIcon from '@mui/icons-material/Search';
import RestartAltIcon from '@mui/icons-material/RestartAlt';

const CommunityPost = () => {
    const navigate = useNavigate()
    const params = useParams();
    const [posts, setPosts] = useState();
    const [commId, setCommId] = useState();
    const [curPage, setCurPage] = useState(1);
    const [totalPage, setTotalPage] = useState();
    const [searchWord, setSearchWord] = useState();
    const [originalPosts, setOriginalPosts] = useState([]);
    const SHOW_POST_NUM = 10;

    const search = () => {
        // searchWord가 null이나 undefined일 수 있는 상황에서 안전하게 문자열의 공백을 제거한 값을 처리하기 위해 사용
        const trimmedSearchWord = searchWord?.trim()
        if(!trimmedSearchWord){
            Swal.fire({
                text: "검색어를 입력해주세요",
                icon: "error",
            });
        }else{
            setPosts(originalPosts.filter((v) => v.title.includes(trimmedSearchWord)));
            setSearchWord('');
        }
    }

    const searchReset = () => {
        setPosts(originalPosts);
        setSearchWord('');
    }

    const obj = {
        "자유": 1,
        "유머": 2,
        "운동": 3,
        "질문": 4,
        "지역": 5,
        "홍보": 6
    }

    useEffect(() => {
        setCommId(obj[params.title])
        getPostsByCommId(obj[params.title]);

        if(!Object.keys(obj).includes(params.title)){
            navigate('*')
        }
    }, []);

    const getPostsByCommId = async(commId) => {
        try {
            const res = await postApi.getPostsByCommId(commId);
            setPosts(res.payload);
            setOriginalPosts(res.payload)
        } catch (error) {
            console.error(error);
        }
    }
    // pagination 관련
    useEffect(()=> {
        setTotalPage(Math.floor(posts?.length/SHOW_POST_NUM) + 1);
    }, [posts])

    const handlePage = (e, v) => {
        setCurPage(v);
    }
    // post modal 관련
    const [open, setOpen] = useState(false);
    const [postDetail, setPostDetail] = useState(null);

    const handleClickOpenPost = (p) => {
        setPostDetail(p)
        setOpen(true);
    };

    const handleClosePost = () => {
        setOpen(false);
    };

    return ( 
        <section className={styles.notice}>
            <div className={styles.pageTitle}>
                <div className={styles.container}>
                    <h3 className={styles.title}>{params.title}</h3>
                </div>
            </div>

            <div id={styles.boardSearch}>
                <div className={styles.container}>
                    <div className={styles.searchWindow}>
                        <TextField 
                            id="standard-basic" 
                            label="검색어(제목)를 입력하세요" 
                            className={styles.searchInput} 
                            value={searchWord}
                            onChange={(e)=>setSearchWord(e.target.value)}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton onClick={search}>
                                            <SearchIcon className={styles.searchIcon}/>
                                        </IconButton>
                                        <IconButton onClick={searchReset}>
                                            <RestartAltIcon className={styles.resetIcon}/>
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <PostCreate commId={commId} setPosts={setPosts} posts={posts}/>
                    </div>
                </div>
            </div>

            <div id={styles.boardList}>
                <div className={styles.container}>
                    <table className={styles.boardTable}>
                        <thead>
                        <tr>
                            <th scope="col" className={styles.thNum}>추천수</th>
                            <th scope="col" className={styles.thtitle}>제목</th>
                            <th scope="col" className={styles.thwriter}>작성자</th>
                            <th scope="col" className={styles.thDate}>등록일</th>
                        </tr>
                        </thead>
                        <tbody>
                            {posts && posts
                                .slice( SHOW_POST_NUM * (curPage-1), SHOW_POST_NUM * curPage )
                                .map((p)=>{
                                    return(
                                        <tr className={styles.post} onClick={()=>handleClickOpenPost(p)}>
                                            <td className={styles.postLike}>0</td>
                                            <th className={styles.postTitle}>{p.title}  
                                                <span className={styles.commentColor}>[0]</span> 
                                            </th>
                                            <td>{p.User.nickname}</td>
                                            <td>{p.createdAt.slice(0,10)}</td>
                                        </tr>
                                    )
                                })}
                        </tbody>
                    </table>
                    <Stack sx={{alignItems: 'center', mt: '20px'}}>
                        <Pagination count={totalPage} onChange={handlePage}></Pagination>
                    </Stack>
                </div>
            </div>

            {open &&
                <PostModal 
                    postDetail={postDetail}
                    open={open} 
                    handleClosePost={handleClosePost}
                    setPosts={setPosts}
                    posts={posts}
                />
            }

        </section>
    );
}

export default CommunityPost;