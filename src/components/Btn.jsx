import React from 'react';
import styles from '../components/css_module/Btn.module.css';

const Btn = ({children,style}) => {
    return (
        <button style={style} className={`${styles.btn} ${styles['btn-open-line']}`}>
            {children}
        </button>
    );
}

export default Btn;