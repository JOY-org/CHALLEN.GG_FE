import { Button, Stack, TextField} from '@mui/material';
import styles from '../components/css_module/CommunityPost.module.css'
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Pagination } from '@mui/material';
import PostCreate from '../components/PostCreate';
import PostModal from '../components/PostModal';

const CommunityPost = () => {
    const params = useParams();
    const [posts, setPosts] = useState();
    const [curPage, setCurPage] = useState(1);
    const [totalPage, setTotalPage] = useState();
    const SHOW_POST_NUM = 5;

    useEffect(() => {
        const obj = {
            "전체": 1,
            "자유": 2,
            "유머": 3,
            "운동": 4,
            "질문": 5,
            "지역": 6,
        }
        
        const comm_id = obj[params.title];
        getPostsByCommId(comm_id);
    }, []);

    useEffect(()=> {
        setTotalPage(Math.floor(posts?.length/SHOW_POST_NUM) + 1);
    }, [posts])

    const handlePage = (e, v) => {
        setCurPage(v);
    }

    const getPostsByCommId = async(comm_id) => {
        try {
            // 데이터 받아와서 뿌려주기만 하면 됨
            // await axios
            // setPosts;
            setPosts(post);
        } catch (error) {
            console.error(error);
        }
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
                        <PostCreate/>
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
                                            <td>{p.postNum}</td>
                                            <th>{p.title}</th>
                                            <td>{p.writer}</td>
                                            <td>{p.date}</td>
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

const post = [{
    postNum : 1,
    writer : '김진영',
    title : '예시 제목1',
    date : '2024.05.20'
},
{
    postNum : 1,
    writer : '김진영',
    title : '예시 제목1',
    date : '2024.05.20'
},
{
    postNum : 1,
    writer : '김진영',
    title : '예시 제목1',
    date : '2024.05.20'
},
{
    postNum : 1,
    writer : '김진영',
    title : '예시 제목1',
    date : '2024.05.20'
},
{
    postNum : 1,
    writer : '김진영',
    title : '예시 제목1',
    date : '2024.05.20'
},
{
    postNum : 1,
    writer : '김진영',
    title : '예시 제목1',
    date : '2024.05.20'
},
{
    postNum : 1,
    writer : '김진영',
    title : '예시 제목1',
    date : '2024.05.20'
},
{
    postNum : 1,
    writer : '김진영',
    title : '예시 제목1',
    date : '2024.05.20'
},
{
    postNum : 1,
    writer : '김진영',
    title : '예시 제목1',
    date : '2024.05.20'
},
{
    postNum : 1,
    writer : '김진영',
    title : '예시 제목1',
    date : '2024.05.20'
},
{
    postNum : 1,
    writer : '김진영',
    title : '예시 제목1',
    date : '2024.05.20'
},
{
    postNum : 1,
    writer : '김진영',
    title : '예시 제목1',
    date : '2024.05.20'
},
{
    postNum : 1,
    writer : '김진영',
    title : '예시 제목1',
    date : '2024.05.20'
},
{
    postNum : 1,
    writer : '김진영',
    title : '예시 제목1',
    date : '2024.05.20'
},
{
    postNum : 1,
    writer : '김진영',
    title : '예시 제목1',
    date : '2024.05.20'
},
{
    postNum : 1,
    writer : '김진영',
    title : '예시 제목1',
    date : '2024.05.20'
},
{
    postNum : 1,
    writer : '김진영',
    title : '예시 제목1',
    date : '2024.05.20'
},
{
    postNum : 1,
    writer : '김진영',
    title : '예시 제목1',
    date : '2024.05.20'
},
{
    postNum : 1,
    writer : '김진영',
    title : '예시 제목1',
    date : '2024.05.20'
},
{
    postNum : 1,
    writer : '김진영',
    title : '예시 제목1',
    date : '2024.05.20'
},
{
    postNum : 1,
    writer : '김진영',
    title : '예시 제목1',
    date : '2024.05.20'
},
{
    postNum : 1,
    writer : '김진영',
    title : '예시 제목1',
    date : '2024.05.20'
},
{
    postNum : 1,
    writer : '김진영',
    title : '예시 제목1',
    date : '2024.05.20'
},
{
    postNum : 1,
    writer : '김진영',
    title : '예시 제목1',
    date : '2024.05.20'
},
{
    postNum : 1,
    writer : '김진영',
    title : '예시 제목1',
    date : '2024.05.20'
},
{
    postNum : 1,
    writer : '김진영',
    title : '예시 제목1',
    date : '2024.05.20'
},
{
    postNum : 1,
    writer : '김진영',
    title : '예시 제목1',
    date : '2024.05.20'
},
{
    postNum : 1,
    writer : '김진영',
    title : '예시 제목1',
    date : '2024.05.20'
},
{
    postNum : 1,
    writer : '김진영',
    title : '예시 제목1',
    date : '2024.05.20'
},
{
    postNum : 1,
    writer : '김진영',
    title : '예시 제목1',
    date : '2024.05.20'
},
{
    postNum : 1,
    writer : '김진영',
    title : '예시 제목1',
    date : '2024.05.20'
},
]

export default CommunityPost;