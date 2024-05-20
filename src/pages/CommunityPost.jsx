import { Button, Stack, TextField } from '@mui/material';
import styles from '../components/css_module/CommunityPost.module.css'
import CommunityCreate from '../components/CommunityCreate';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Pagination } from '@mui/material';

const CommunityPost = () => {
    const params = useParams();
    const [posts, setPosts] = useState();
    const [curPage, setCurPage] = useState(1);
    const [totalPage, setTotalPage] = useState();
    const SHOW_POST_NUM = 10;

    useEffect(() => {
        const obj = {
            "자유": 1,
            "유머": 2,
            "운동": 3,
            "질문": 4
        }
        const comm_id = obj[params.id];
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

    return ( 
        <section className={styles.notice}>
            <div className={styles.pageTitle}>
                <div className={styles.container}>
                    <h3>{params.id}</h3>
                </div>
            </div>

            <div id={styles.boardSearch}>
                <div className={styles.container}>
                    <div className={styles.searchWindow}>
                        <TextField id="standard-basic" label="검색어를 입력하세요" />
                        <Button variant="contained" style={{height:'100%'}}>검색</Button>
                        <CommunityCreate />
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
                                        <tr>
                                            <td>1</td>
                                            <th><a href="#!">{p.title}</a></th>
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

        </section>
    );
}

const post = [{
    writer : '김진영',
    title : '예시 제목1',
    date : '2024.05.20'
},
{
    writer : '김진영',
    title : '예시 제목2',
    date : '2024.05.20'
},
{
    writer : '김진영',
    title : '예시 제목3',
    date : '2024.05.20'
},
{
    writer : '김진영',
    title : '예시 제목4',
    date : '2024.05.20'
},
{
    writer : '김진영',
    title : '예시 제목5',
    date : '2024.05.20'
},
{
    writer : '김진영6',
    title : '예시 제목6',
    date : '2024.05.20'
},
{
    writer : '김진영',
    title : '예시 제목2',
    date : '2024.05.20'
},
{
    writer : '김진영',
    title : '예시 제목3',
    date : '2024.05.20'
},
{
    writer : '김진영',
    title : '예시 제목4',
    date : '2024.05.20'
},
{
    writer : '김진영',
    title : '예시 제목5',
    date : '2024.05.20'
},
{
    writer : '김진영6',
    title : '예시 제목6',
    date : '2024.05.20'
},
{
    writer : '김진영',
    title : '예시 제목2',
    date : '2024.05.20'
},
{
    writer : '김진영',
    title : '예시 제목3',
    date : '2024.05.20'
},
{
    writer : '김진영',
    title : '예시 제목4',
    date : '2024.05.20'
},
{
    writer : '김진영',
    title : '예시 제목5',
    date : '2024.05.20'
},
{
    writer : '김진영6',
    title : '예시 제목6',
    date : '2024.05.20'
},
{
    writer : '김진영',
    title : '예시 제목2',
    date : '2024.05.20'
},
{
    writer : '김진영',
    title : '예시 제목3',
    date : '2024.05.20'
},
{
    writer : '김진영',
    title : '예시 제목4',
    date : '2024.05.20'
},
{
    writer : '김진영',
    title : '예시 제목5',
    date : '2024.05.20'
},
{
    writer : '김진영6',
    title : '예시 제목6',
    date : '2024.05.20'
}]

export default CommunityPost;