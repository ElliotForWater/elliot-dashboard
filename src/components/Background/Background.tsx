import React, { useState, useEffect } from 'react'
import { fetchRandomPhoto } from '../../helpers/_unsplashFetch'
import styles from './Background.module.css'

interface imageProps {
  urls: { small: string; regular: string; full: string; raw: string }
  alt_description: string
  location: { title: string }
  links: { html: string }
  user: { links: { html: string }; name: string }
}

const Background = function ({ children }) {
  const [photo, setPhoto] = useState<null | imageProps>(null)
  const [content, setContent] = useState(null)

  useEffect(() => {
    async function fetchPhoto() {
      const fetchedPhoto = await fetchRandomPhoto()
      setPhoto(fetchedPhoto)
    }

    fetchPhoto()

    const showContent = setTimeout(() => {
      setContent(children)
    }, 100)

    return () => clearTimeout(showContent)
  }, [])

  return (
    <div className={styles.container}>
      {/* Images w size token from: https://html.com/attributes/img-srcset */}
      {photo?.urls.raw && (
        <>
          <img
            className={styles.img}
            srcSet={`${photo.urls.raw}?fit=crop&auto=format&w=640&dpr=1 1000w,
          ${photo.urls.raw}?fit=crop&auto=format&w=1080&dpr=2 2013w,
          ${photo.urls.raw}?fit=crop&auto=format&w=1920&dpr=3 3019w,
          ${photo.urls.raw}?fit=crop&auto=format&w=2400&dpr=4 4025w`}
            src={photo.urls.regular}
            alt={photo.alt_description}
          />
          {content}

          <footer className={styles.footer}>
            <div>
              <a href={photo.links.html}>Photo</a> /<a href={photo.user.links.html}> {photo.user.name}</a> /
              <a href='https://unsplash.com'> Unsplash</a>
            </div>
            <div>{photo.location.title}</div>
          </footer>
        </>
      )}
    </div>
  )
}

export default Background
