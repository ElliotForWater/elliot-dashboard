import React from 'react'
import styles from './Button.module.css'
import classnames from 'classnames'

interface ButtonProps {
  fluid?: boolean
  onClick?: (event: React.MouseEvent<HTMLElement>) => void
  children: any
  linkHref?: string
  size?: 'big' | 'small' | 'medium'
  target?: string
}

export default function Button({ fluid, onClick, children, linkHref, target = '_self', size = 'medium' }: ButtonProps) {
  return (
    <div
      className={classnames(styles.button, {
        [styles.fluid]: fluid,
        [styles[size]]: size,
      })}
      onClick={onClick}
    >
      {linkHref ? (
        <a href={linkHref} target={target}>
          {children}
        </a>
      ) : (
        children
      )}
    </div>
  )
}

Button.defaultProps = {
  type: 'default',
}
