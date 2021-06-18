import React from 'react'
import { UserContext } from './context/UserContext'
import { useUserStateSyncedWithCookies } from './hooks/useUserStateSyncedWithCookies'

import Dashboard from './views/Dashboard'
import './odometer.css'

function App() {
  const user = useUserStateSyncedWithCookies()

  return (
    <UserContext.Provider value={user}>
      <Dashboard />
    </UserContext.Provider>
  )
}
export default App
