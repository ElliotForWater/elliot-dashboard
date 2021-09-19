import React, { useState, useEffect } from 'react'
import { UserContext } from './context/UserContext'
import { useUserStateSyncedWithCookies } from './hooks/useUserStateSyncedWithCookies'
import Header from './components/Header/Header'
import Modal from './components/Modal/Modal'
import Background from './components/Background/Background'
import Dashboard from './views/Dashboard'
import './odometer.css'

export const extensionApiObject = window.chrome || window.browser

declare global {
  interface Window {
    browser: any
    wrappedJSObject: any
  }
}
function App() {
  const user = useUserStateSyncedWithCookies()
  const [, setNumbSearch] = useState(user.userState.numOfSearches)

  useEffect(() => {
    // rerender component when cookies are updated
    setNumbSearch(user.userState.numOfSearches)
  }, [user.userState])

  return (
    <UserContext.Provider value={user}>
      <Background>
        <div>
          <Header />
          <Dashboard />
        </div>

        <Modal.Host />
      </Background>
    </UserContext.Provider>
  )
}
export default App
