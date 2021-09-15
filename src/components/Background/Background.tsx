import React, { useState, useEffect } from 'react'
import styles from './Background.module.css'

const Background = function ({ photo, children }) {
  const [content, setContent] = useState(null)

  useEffect(() => {
    const showContent = setTimeout(() => {
      setContent(children)
    }, 100)

    return () => clearTimeout(showContent)
  }, [])

  return (
    <div className={styles.container}>
      {/* Images w size token from: https://html.com/attributes/img-srcset */}
      {photo?.urls.raw && (
        <div className={styles.imageContainer}>
          <img
            className={styles.img}
            srcSet={`
              ${photo.urls.regular}&dpr=1 1000w,
              ${photo.urls.regular}&dpr=2 2013w,
              ${photo.urls.regular}&dpr=3 3019w,
              ${photo.urls.regular}&dpr=4 4025w`}
            src={photo.urls.regular}
          />

          {content}

          <footer className={styles.footer}>
            <div>
              <a href={photo.links.html}>Photo</a> /<a href={photo.user.links.html}> {photo.user.name}</a> /
              <a href='https://unsplash.com'> Unsplash</a>
            </div>
            <div>{photo.location.title}</div>
          </footer>
        </div>
      )}
    </div>
  )
}

export default Background
