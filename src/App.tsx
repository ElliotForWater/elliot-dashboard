import React, { useState, useEffect } from 'react'
import { UserContext } from './context/UserContext'
import { useUserStateSyncedWithCookies } from './hooks/useUserStateSyncedWithCookies'
import Header from './components/Header/Header'
import Modal from './components/Modal/Modal'
import Background from './components/Background/Background'
import Dashboard from './views/Dashboard'
import './odometer.css'
import { fetchRandomPhoto } from './helpers/_photoFetch'

export const extensionApiObject = window.chrome || window.browser
declare global {
  interface Window {
    browser: any
  }
}

interface imageProps {
  urls: { small: string; regular: string; full: string; raw: string }
  alt_description: string
  location: { title: string }
  links: { html: string }
  user: { links: { html: string }; name: string }
}

function App() {
  const user = useUserStateSyncedWithCookies()

  const [photo, setPhoto] = useState<null | imageProps>(null)

  useEffect(() => {
    async function fetchPhoto() {
      const fetchedPhoto = await fetchRandomPhoto()
      setPhoto(fetchedPhoto)
      // console.log('photo back', fetchedPhoto)
    }

    fetchPhoto()
  }, [])

  return (
    <UserContext.Provider value={user}>
      <Background photo={photo}>
        <>
          <Header />
          <Dashboard />
        </>

        <Modal.Host />
      </Background>
    </UserContext.Provider>
  )
}
export default App
