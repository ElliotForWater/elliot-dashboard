import React, { useState, useRef, useContext, useCallback, useEffect } from 'react'
import classnames from 'classnames'
import styles from './Nav.module.css'
import Settings from '../Forms/Settings/SettingsForm'
import TextButton from '../Buttons/TextButton/TextButton'
import { UserContext } from '../../context/UserContext'
import Modal from '../Modal/Modal'

const Nav = ({ closeTooltip }) => {
  const iconMenuEl = useRef<HTMLDivElement>(null)
  const menuEl = useRef<HTMLUListElement>(null)
  const [isNavOpen, setIsNavOpen] = useState<boolean>(false)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { userState, setUserState } = useContext(UserContext)

  const [isOpen, setIsOpen] = useState(false)
  const handleOpen = useCallback(() => {
    setIsOpen(true)
    setUserState({ isModalOpen: true })
  }, [])

  const handleClose = useCallback(() => {
    setIsOpen(false)
    setUserState({ isModalOpen: false })
  }, [])

  useEffect(() => {
    function handleClickOutside(event) {
      const isOutsideMenuEl = menuEl.current && !menuEl.current.contains(event.target)
      const isOutsideMenuIcon = iconMenuEl.current && !iconMenuEl.current.contains(event.target)
      if (isOutsideMenuIcon && isOutsideMenuEl) {
        setIsNavOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [iconMenuEl])

  return (
    <>
      <nav className={styles.nav}>
        <div
          className={styles.hamburgerMenu}
          onClick={() => {
            closeTooltip()
            setIsNavOpen((wasOpen) => !wasOpen)
          }}
          ref={iconMenuEl}
        >
          <span />
          <span />
          <span />
        </div>
        <ul
          className={classnames(styles.menuContainer, {
            [styles.menuOpen]: isNavOpen,
          })}
          ref={menuEl}
        >
          <li className={styles.menuItem}>
            <a href='https://elliotforwater.com/why-water'>Why water</a>
          </li>
          <li className={styles.menuItem}>
            <a href='https://elliotforwater.com/about'>About</a>
          </li>
          <li className={styles.divider} />
          <li className={styles.menuItem}>
            <a href='https://www.facebook.com/elliotforwater/?fref=ts'>Share us on Facebook</a>
          </li>
          <li className={styles.menuItem}>
            <a target='_blank' href='https://medium.com/@elliotforwater'>
              Blog
            </a>
          </li>
          <li className={styles.divider} />
          <li className={classnames(styles.menuItem, styles.navButton)}>
            <TextButton
              onClick={() => {
                handleOpen()
                setIsNavOpen(false)
              }}
            >
              <a>Settings</a>
            </TextButton>
            <Modal isOpen={isOpen} onDismiss={handleClose}>
              <Modal.Content>
                <Settings callbackCloseSettings={handleClose} />
              </Modal.Content>
            </Modal>
          </li>
          <li className={styles.menuItem}>
            <a href='https://elliotforwater.com/terms'>Terms</a>
          </li>
          <li className={styles.menuItem}>
            <a href='https://elliotforwater.com/privacy'>Privacy</a>
          </li>
        </ul>
      </nav>
    </>
  )
}

export default Nav
