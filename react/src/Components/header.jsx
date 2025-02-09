import React from 'react';
import styles from '../css/header.module.css';

export default function Header() {
  return (
    <header className={styles.header}>
        <a href="#" className={styles.profile}>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSx5H3czTHdNck8h89PWryXrFzqpIJkS3PDmMIp2bpT66t-2HtmKVTMpxkr8ABLPkgcUyy6qX8RItPR4x74iMN7Qg" className={styles.avatar} />
            <div className={styles.stylesInfo}>
                <div className={styles.nickname}>Nickname</div>
                <div className={styles.balance}>Balance: 200 ⭐️</div>
            </div>
        </a>
    </header>
  )
}
