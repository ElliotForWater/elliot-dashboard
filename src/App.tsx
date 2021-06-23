import React from 'react'
import { UserContext } from './context/UserContext'
import { useUserStateSyncedWithCookies } from './hooks/useUserStateSyncedWithCookies'
import Header from './components/Header/Header'
import Modal from './components/Modal/Modal'
import Background from './components/Background/Background'

import Dashboard from './views/Dashboard'
import './odometer.css'

function App() {
  const user = useUserStateSyncedWithCookies()

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
