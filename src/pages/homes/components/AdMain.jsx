import { useEffect, useState } from 'react';
import { challengApi } from '../../../api/services/challenge';
import styles from '../css_module/Home.module.css'


const AdMain = () => {
    const [challengeImg, setchallengeImg] = useState([]);
    const getChallenge = async () => {
        try {
            const res = await challengApi.getChallenge();
            setchallengeImg(res.data.payload);
            console.log(res.data.payload);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        getChallenge();
    }, []);

    return (
        <div className={styles.AdMain}>
            {challengeImg.map((c) => (
                <div key={c.id}>
                    <img src={c.img} />
                </div>
            ))}
        </div>
    )
}

export default AdMain;