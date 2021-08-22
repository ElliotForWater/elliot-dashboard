import React from 'react'
import SearchBar from '../components/SearchBar/SearchBar'
import styles from './Dashboard.module.css'
import Logo from '../images/logo.svg'

function Dashboard() {
  return (
    <div className={styles.dashboardContainer}>
      <section className={styles.searchBarSection}>
        <div className={styles.logo}>
          <div className={styles.logoImgWrap}>
            <img className={styles.logoImg} src={Logo} alt='Elliot For Water' title='Elliot For Water' />
          </div>
        </div>
        <div className={styles.searchWrap}>
          <SearchBar />
        </div>
      </section>
    </div>
  )
}

export default Dashboard
