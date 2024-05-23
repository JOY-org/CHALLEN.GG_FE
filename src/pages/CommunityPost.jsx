import { Button, Stack, TextField} from '@mui/material';
import styles from '../components/css_module/CommunityPost.module.css'
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Pagination } from '@mui/material';
import PostCreate from '../components/PostCreate';
import PostModal from '../components/PostModal';
import { postApi } from "../api/services/post";

const CommunityPost = () => {
    const navigate = useNavigate()
    const params = useParams();
    const [posts, setPosts] = useState();
    const [commId, setCommId] = useState();
    const [curPage, setCurPage] = useState(1);
    const [totalPage, setTotalPage] = useState();
    const SHOW_POST_NUM = 10;

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
            
        } catch (error) {
            console.error(error);
        }
    }
    
    useEffect(()=> {
        setTotalPage(Math.floor(posts?.length/SHOW_POST_NUM) + 1);
    }, [posts])

    const handlePage = (e, v) => {
        setCurPage(v);
    }

    const [open, setOpen] = useState(false);

    const handleClickOpenPost = () => {
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
                        <TextField id="standard-basic" label="검색어를 입력하세요" className={styles.searchInput}/>
                        <Button variant="contained" className={styles.searchBtn} sx={{mr:'30px'}}>검색</Button>
                        <PostCreate commId={commId}/>
                    </div>
                </div>
            </div>

            <div id={styles.boardList}>
                <div className={styles.container}>
                    <table className={styles.boardTable}>
                        <thead>
                        <tr>
                            <th scope="col" className={styles.thNum}>번호</th>
                            <th scope="col">제목</th>
                            <th scope="col">작성자</th>
                            <th scope="col" className={styles.thDate}>등록일</th>
                        </tr>
                        </thead>
                        <tbody>
                            {posts && posts
                                .slice( SHOW_POST_NUM * (curPage-1), SHOW_POST_NUM * curPage )
                                .map((p)=>{
                                    return(
                                        <tr className={styles.postTitle} onClick={handleClickOpenPost}>
                                            <td>{p.id}</td>
                                            <th>{p.title}</th>
                                            <td></td>
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
                    open={open} 
                    handleClosePost={handleClosePost}
                />
            }

        </section>
    );
}

export default CommunityPost;