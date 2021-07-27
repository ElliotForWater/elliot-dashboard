import React, { useState, useEffect } from 'react'
import SearchBar from '../components/SearchBar/SearchBar'
import Odometer from 'react-odometerjs'
import styles from './Dashboard.module.css'
import Logo from '../images/logo.svg'

function getLitersOfWater(litersOfWaterPerMillisecond: number) {
  // Set dates from when we started delivering water until today
  const dateStart = new Date('03/28/2020')
  const dateNow = new Date()
  // Calculate the number of seconds between the two dates
  const millisecondsDifference = dateNow.getTime() - dateStart.getTime()

  // Calculate the number of liters
  return millisecondsDifference / litersOfWaterPerMillisecond
}

function Dashboard() {
  const [odometerValue, setOdometerValue] = useState<number>(0)

  useEffect(() => {
    const litersOfWaterPerMillisecond: number = 20000
    setOdometerValue(getLitersOfWater(litersOfWaterPerMillisecond))

    const timerInterval: number = window.setInterval(() => {
      setOdometerValue(getLitersOfWater(litersOfWaterPerMillisecond))
    }, litersOfWaterPerMillisecond)

    return () => clearInterval(timerInterval)
  }, [])

  return (
    <div>
      <section className={styles.searchBarSection}>
        <div className={styles.logo}>
          <div className={styles.logoImgWrap}>
            <img className={styles.logoImg} src={Logo} alt='Elliot For Water' title='Elliot For Water' />
          </div>
          <p className={styles.logoSubtitle}>For Water</p>
        </div>
        <div className={styles.searchWrap}>
          <SearchBar />
        </div>
        <div className={styles.ctaContainer}>
          <h1 className={styles.ctaTitle}>Join our community of changemakers!</h1>
          <div className={styles.counterContainer}>
            {Odometer !== null && (
              <Odometer
                // @ts-ignore
                value={odometerValue}
                format='(,ddd)'
                duration={1000}
              />
            )}
            <p className={styles.counterText}>Liters of water donated so far by Elliot For Water users</p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Dashboard
