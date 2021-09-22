import React, { useState, useEffect } from 'react'
import SearchBar from '../components/SearchBar/SearchBar'
import styles from './Dashboard.module.css'
import Logo from '../images/logo_white.svg'

function Dashboard() {
  var [date, setDate] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setDate(new Date()), 1000)

    return function cleanup() {
      clearInterval(timer)
    }
  })

  const timeFormat = Intl.DateTimeFormat('en', { hour: 'numeric', minute: 'numeric', hour12: false }).format(date)

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
        <div className={styles.timeContainer}>
          <p className={styles.greetings}>The search engine that supports clean water projects</p>
          <time dateTime={JSON.stringify(date.toLocaleTimeString)}>{timeFormat}</time>
        </div>
      </section>
    </div>
  )
}

export default Dashboard
