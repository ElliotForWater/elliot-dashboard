import React, { RefObject, ReactNode, useEffect, useRef } from 'react'
import classnames from 'classnames'
import styles from './Tooltip.module.css'

type Props = {
  isHidden: boolean
  direction: string
  children: ReactNode
  iconDropEl: RefObject<HTMLDivElement>
  setHideTooltip: (bool: boolean) => void
}

const Tooltip = ({ isHidden, children, direction, iconDropEl, setHideTooltip }: Props) => {
  const tooltipEl = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event) {
      const isOutsideTooltip = tooltipEl.current && !tooltipEl.current.contains(event.target)
      const isOutsideDropIcon = iconDropEl.current && !iconDropEl.current.contains(event.target)
      if (isOutsideDropIcon && isOutsideTooltip) {
        setHideTooltip(true)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isHidden])

  return (
    <>
      <span
        className={classnames(styles.tooltip, {
          [styles.isHidden]: isHidden,
          [styles[direction]]: direction,
        })}
        ref={tooltipEl}
        data-testid='tooltip-span'
      >
        {children}
      </span>
    </>
  )
}

export default Tooltip
