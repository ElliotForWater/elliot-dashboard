import React, { useState, useEffect } from 'react'
import SearchBar from '../components/SearchBar/SearchBar'
import styles from './Dashboard.module.css'
import Logo from '../images/logo_white.svg'
import { extensionApiObject } from '../App'
import ButtonPrimary from '../components/Buttons/ButtonPrimary/ButtonPrimary'

function Dashboard() {
  var [date, setDate] = useState(new Date())
  var [showWelcomeMessage, setShowWelcomeMessage] = useState(false)
  var [defaultSearchEngine, setDefaultSearchEngine] = useState(false)

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
  }, [defaultSearchEngine])

  function handleDefaultSearchClick(searchEngine) {
    console.log({ searchEngine })
    setDefaultSearchEngine(searchEngine)
    setShowWelcomeMessage(false)
  }

  const timeFormat = Intl.DateTimeFormat('en', { hour: 'numeric', minute: 'numeric', hour12: false }).format(date)

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
            <h1 className={styles.welcomeTitle}>Give clean water by searching the web with Elliot dashboard!</h1>
            <h4 className={styles.welcomeSubtitle}>
              Choose your default search engine.
              <br />
              With Elliot or Bing, your clicks will support clean water projects.
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
            <p className={styles.welcomeSmallText}>You can always switch search engine whenever you want</p>
          </div>
        ) : (
          <>
            <div className={styles.searchWrap}>
              <SearchBar defaultSearchEngine={defaultSearchEngine} />
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
