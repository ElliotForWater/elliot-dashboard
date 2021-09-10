import React, { FC, useRef, useState, useEffect, useContext } from 'react'
import Odometer from 'react-odometerjs'
import { UserContext } from '../../context/UserContext'
import Nav from '../Nav/Nav'
import Tooltip from '../Tooltip/Tooltip'
import styles from './Header.module.css'
import WhiteDrop from '../../images/water_drop_new.png'

function getLitersOfWater(litersOfWaterPerMillisecond: number) {
  // Set dates from when we started delivering water until today
  const dateStart = new Date('03/28/2020')
  const dateNow = new Date()
  // Calculate the number of seconds between the two dates
  const millisecondsDifference = dateNow.getTime() - dateStart.getTime()

  // Calculate the number of liters
  return millisecondsDifference / litersOfWaterPerMillisecond
}

const HeaderHome: FC = () => {
  const [hideTooltip, setHideTooltip] = useState(true)
  const { userState } = useContext(UserContext)
  const [odometerValue, setOdometerValue] = useState<number>(0)
  const iconDropEl = useRef<HTMLImageElement>(null)

  useEffect(() => {
    const litersOfWaterPerMillisecond: number = 20000
    setOdometerValue(getLitersOfWater(litersOfWaterPerMillisecond))

    const timerInterval: number = window.setInterval(() => {
      setOdometerValue(getLitersOfWater(litersOfWaterPerMillisecond))
    }, litersOfWaterPerMillisecond)

    return () => clearInterval(timerInterval)
  }, [])

  return (
    <header className={styles.header}>
      <div className={styles.headerRight}>
        <div className={styles.rightSide}>
          <div className={styles.counterContainer}>
            {Odometer !== null && (
              <Odometer
                // @ts-ignore6px
                value={odometerValue}
                format='(,ddd)'
                duration={1000}
                animation='count'
              />
            )}
            <p className={styles.counterText}>L of water donated</p>
          </div>

          <div className={styles.dropletContainer} onClick={() => setHideTooltip(false)}>
            <p className={styles.dropletCount}>{userState.numOfSearches}</p>
            <img className={styles.dropletImg} src={WhiteDrop} ref={iconDropEl} />
            <Tooltip isHidden={hideTooltip} direction='right' iconDropEl={iconDropEl} setHideTooltip={setHideTooltip}>
              This is the number of searches you have done with Elliot for Water. Approximately, every search donates 14
              liters of pure drinking water.
            </Tooltip>
          </div>
          <div className={styles.menu}>
            <Nav closeTooltip={() => setHideTooltip(true)} />
          </div>
        </div>
      </div>
    </header>
  )
}

export default HeaderHome
