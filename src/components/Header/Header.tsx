import React, { FC, useState, useContext } from 'react'
import { UserContext } from '../../context/UserContext'
import Nav from '../Nav/Nav'
import Tooltip from '../Tooltip/Tooltip'
import styles from './Header.module.css'
import Drop from '../../images/water_droplet.svg'

const HeaderHome: FC = () => {
  const [hideTooltip, setHideTooltip] = useState(true)
  const { userState } = useContext(UserContext)

  return (
    <header className={styles.header}>
      <div className={styles.headerRight}>
        <div className={styles.rightSide}>
          <div
            className={styles.dropletContainer}
            onMouseEnter={() => setHideTooltip(false)}
            onMouseLeave={() => setHideTooltip(true)}
            onClick={() => setHideTooltip((prev) => !prev)}
          >
            <img className={styles.dropletImg} src={Drop} />
            <Tooltip isHidden={hideTooltip} direction='right'>
              This is the number of searches you have done with Elliot for Water. Approximately, every search donates 14
              liters of pure drinking water.
            </Tooltip>
            <p className={styles.dropletCount}>{userState.numOfSearches}</p>
          </div>
          <div className={styles.menu}>
            <Nav />
          </div>
        </div>
      </div>
    </header>
  )
}

export default HeaderHome
