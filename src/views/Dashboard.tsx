import React, { useState, useEffect } from 'react'
import SearchBar from '../components/SearchBar/SearchBar'
import styles from './Dashboard.module.css'
import Logo from '../images/logo_white.svg'
import { extensionApiObject } from '../App'
import ButtonPrimary from '../components/Buttons/ButtonPrimary/ButtonPrimary'

function Dashboard() {
  const [date, setDate] = useState(new Date())
  const [showWelcomeMessage, setShowWelcomeMessage] = useState(false)
  const timeFormat = Intl.DateTimeFormat('en', { hour: 'numeric', minute: 'numeric', hour12: false }).format(date)

  useEffect(() => {
    const timer = setInterval(() => setDate(new Date()), 1000)

    /* eslint-disable no-undef */
    if (extensionApiObject?.runtime) {
      if (window.location.search === '?install') {
        setShowWelcomeMessage(true)
      }
    }
    /* eslint-enable no-undef */

    return () => {
      clearInterval(timer)
    }
  }, [])

  function handleDefaultSearchClick(searchEngine) {
    localStorage.setItem('defaultSearchEngine', searchEngine)
    setShowWelcomeMessage(false)
    window.location.search = ''
  }

  return (
    <div className={styles.dashboardContainer}>
      <section className={styles.searchBarSection}>
        <div className={styles.logo}>
          <div className={styles.logoImgWrap}>
            <img className={styles.logoImg} src={Logo} alt='Elliot For Water' title='Elliot For Water' />
          </div>
        </div>
        {showWelcomeMessage ? (
          <div className={styles.welcomeContainer}>
            <h1 className={styles.welcomeTitle}>Give clean water by searching the web!</h1>
            <h4 className={styles.welcomeSubtitle}>
              Choose your default search engine between Bing or Elliot:
              <br />
              your clicks will always support clean water projects.
            </h4>
            <div className={styles.buttonSearchEngine}>
              <ButtonPrimary size='big' onClick={() => handleDefaultSearchClick('bing')}>
                Bing
              </ButtonPrimary>
            </div>
            <div className={styles.buttonSearchEngine}>
              <ButtonPrimary size='big' onClick={() => handleDefaultSearchClick('elliot')}>
                Elliot For Water
              </ButtonPrimary>
            </div>
            <p className={styles.welcomeSmallText}>You can always switch search engine at any moment</p>
          </div>
        ) : (
          <>
            <div className={styles.searchWrap}>
              <SearchBar />
            </div>
            <div className={styles.timeContainer}>
              <p className={styles.greetings}>The search engine that supports clean water projects</p>
              <time dateTime={JSON.stringify(date.toLocaleTimeString)}>{timeFormat}</time>
            </div>
          </>
        )}
      </section>
    </div>
  )
}

export default Dashboard
