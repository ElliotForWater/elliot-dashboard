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
      {photo?.src && (
        <div className={styles.imageContainer}>
          <img
            className={styles.img}
            srcSet={`
              ${photo.src.medium} 480w,
              ${photo.src.large} 1x,
              ${photo.src.large2x} 2x,
              ${photo.src.landscape} 3x,
            `}
            src={photo.src.medium}
          />

          {content}

          <footer className={styles.footer}>
            <div className={styles.linksContainer}>
              <a href={photo.photographer_url}>{photo.photographer}</a> - <a href={photo.url}>Photo</a> on{' '}
              <a href='https://www.pexels.com'>Pexel</a>
            </div>
          </footer>
        </div>
      )}
    </div>
  )
}

export default Background
