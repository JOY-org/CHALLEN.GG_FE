import React, { useEffect } from 'react';
import styles from '../components/css_module/Banner.module.css';

const Message = ({ children, style  }) => {

    return (
        <button style={style} className={`${styles.btn} ${styles['btn-marquee']}`}>
            <span data-text='안녕하세요 challen.gg 입니다.여러분의 도전을 응원합니다'>{children}</span>
        </button>
    );
}

export default Message;


//제이슨으로 리스트 빼기 