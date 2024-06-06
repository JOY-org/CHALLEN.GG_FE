import React, { useEffect } from 'react';
import styles from '../components/css_module/Banner.module.css';

const Message = ({ children, style }) => {
    return (
        <button style={style} className={`${styles.btn} ${styles['btn-marquee']}`}>
            <span>{children}</span>
            <span className={styles['marquee-text']}></span>
        </button>
    );
}

export default Message;
