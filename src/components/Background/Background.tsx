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
        <>
          {/* <img
            className={styles.img}
            srcSet={`
              ${photo.urls.raw}&dpr=1 1000w,
              ${photo.urls.raw}&dpr=2 2013w,
              ${photo.urls.raw}&dpr=3 3019w,
              ${photo.urls.raw}&dpr=4 4025w`
            }
            src={photo.urls.regular}
            alt={photo.alt_description}
          /> */}
          <div
            style={{
              backgroundColor: '#505a602b',
              transition: 'opacity 200ms ease-in-out',
              top: '0',
              left: '0',
              position: 'absolute',
              width: '100%',
              height: '100%',
            }}
          >
            <div
              style={{
                backgroundImage: `url(${photo.urls.raw})`,
                backgroundSize: 'cover',
                height: '100%',
              }}
            >
              {content}
            </div>
          </div>

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
