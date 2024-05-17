import React from 'react';
import styles from '../components/css_module/Message.module.css';

const Message = ({ children, style  }) => {
    return (
        <button style={style} className={`${styles.btn} ${styles['btn-marquee']}`}>
            <span data-text="안녕하세요 challen.gg입니다. 저희는 여러분들의 도전을 응원합니다">{children}</span>
        </button>
    );
}

export default Message;