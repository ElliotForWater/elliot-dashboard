import React, { useState, useEffect, FC } from 'react'
import { fetchCollectionPhotos } from '../../helpers/_unsplashFetch'

import styles from './Background.module.css'

interface imageProps {
  urls: { regular: string }
  alt_description: string
  location: { title: string }
  links: { html: string }
  user: { links: { html: string }; name: string }
}

const Background: FC = function ({ children }) {
  const [photo, setPhoto] = useState<null | imageProps>(null)

  useEffect(() => {
    async function fetchPhoto() {
      const fetchedPhoto = await fetchCollectionPhotos()
      console.log('dashboard fetch', fetchedPhoto)
      setPhoto(fetchedPhoto)
    }

    fetchPhoto()
  }, [])

  return (
    <div className={styles.container}>
      {photo && <img className={styles.img} src={photo.urls.regular} alt={photo.alt_description} />}
      {children}

      {photo && (
        <footer className={styles.footer}>
          <div>
            <a href={photo.links.html}>Photo</a> /<a href={photo.user.links.html}>{photo.user.name}</a> /
            <a href='https://unsplash.com'>Unsplash</a>
          </div>
          <div>{photo.location.title}</div>
        </footer>
      )}
    </div>
  )
}

export default Background
