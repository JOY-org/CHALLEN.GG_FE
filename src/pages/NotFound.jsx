import Button from '@mui/material/Button';
import styles from '../components/css_module/NotFoundCss.module.css'
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
    const navigate = useNavigate();
    return ( 
        <div className={styles.div}>
            <p>다시 한번 확인해 주세요!</p>
            <p>지금 입력하신 주소의 페이지는</p>
            <p>사라졌거나 다른 페이지로 변경되었습니다.</p>
            <p>주소를 다시 확인해주세요.</p>
            <Button variant="contained" onClick={()=>navigate('/')}>홈으로 가기</Button>
        </div>
    );
}

export default NotFound;