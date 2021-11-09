import React, { useState, useEffect } from 'react'
import SearchBar from '../components/SearchBar/SearchBar'
import styles from './Dashboard.module.css'
import Logo from '../images/logo_white.svg'
import { extensionApiObject } from '../App'
import { fetchIp, bingMarketCountries } from '../helpers/_ipFetch'
import ButtonPrimary from '../components/Buttons/ButtonPrimary/ButtonPrimary'
import Timestamp from '../components/TimeStamp/TimeStamp'

function Dashboard() {
  const [showWelcomeMessage, setShowWelcomeMessage] = useState(false)
  const [isBingMarket, setIsBingMarket] = useState(false)

  useEffect(() => {
    /* eslint-disable no-undef */
    if (extensionApiObject?.runtime) {
      if (window.location.search === '?install') {
        setShowWelcomeMessage(true)
      }
    }
    /* eslint-enable no-undef */

    async function getCountry() {
      const { location } = await fetchIp()
      const country = location.country.name
      console.log({ IsbingMarket: bingMarketCountries.includes(country) })
      setIsBingMarket(bingMarketCountries.includes(country))
    }

    getCountry()
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
        {showWelcomeMessage && isBingMarket ? (
          <div className={styles.welcomeContainer}>
            <h1 className={styles.welcomeTitle}>
              Give clean water <br /> by searching the web!
            </h1>
            <h4 className={styles.welcomeSubtitle}>
              Choose your default search engine between Bing or Elliot.
              <br />
              Your clicks will always support clean water projects.
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
              <SearchBar isBingMarket={isBingMarket} />
            </div>
            <div className={styles.timeContainer}>
              <p className={styles.greetings}>The search engine that supports clean water projects</p>
              <Timestamp />
            </div>
          </>
        )}
      </section>
    </div>
  )
}

export default Dashboard
