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

  function handleMessage(msg) {
    console.log('handle messag func', msg)
    if (msg.target === 'onInstallAndUpdate') {
      setShowWelcomeMessage(true)
    }
  }

  /* eslint-disable no-undef */
  if (extensionApiObject?.runtime) {
    console.log('extension')
    extensionApiObject.runtime.onMessage.addListener(handleMessage)
    // } else {
    //   if (searchSuggestedWords) {
    //     fetchSuggestedWords()
    //   }
  }

  // return () => {
  //   if (extensionApiObject?.runtime) {
  //     chrome.runtime.onMessage.removeListener(handleMessage)
  //   }
  // }
  /* eslint-enable no-undef */

  useEffect(() => {
    const timer = setInterval(() => setDate(new Date()), 1000)

    return function cleanup() {
      clearInterval(timer)
    }
  })

  function handleDefaultSearchClick(searchEngine) {
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
<<<<<<< HEAD
        <div className={styles.searchWrap}>
          <SearchBar />
        </div>
        <div className={styles.timeContainer}>
          <p className={styles.greetings}>The search engine that supports clean water projects</p>
          <time dateTime={JSON.stringify(date.toLocaleTimeString)}>{timeFormat}</time>
        </div>
=======
        {showWelcomeMessage ? (
          <div>
            <h2>Give clean water by searching the web with Elliot!</h2>
            <p>Choose between Elliot or Bing: your clicks will support clean water projects.</p>
            <ButtonPrimary handleClick={() => handleDefaultSearchClick('bing')}>Bing</ButtonPrimary>
            <ButtonPrimary handleClick={() => handleDefaultSearchClick('elliot')}>Elliot For Water</ButtonPrimary>
            <p>You can a alternate search engine whenever you want</p>
          </div>
        ) : (
          <>
            <div className={styles.searchWrap}>
              <SearchBar defaultSearchEngine={defaultSearchEngine} />
            </div>
            <div className={styles.timeContainer}>
              <time dateTime={JSON.stringify(date.toLocaleTimeString)}>{timeFormat}</time>
              <p className={styles.greetings}>Join our community of changemakers!</p>
            </div>
          </>
        )}
>>>>>>> send message when installed
      </section>
    </div>
  )
}

export default Dashboard
