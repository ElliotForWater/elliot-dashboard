import React from 'react'
import { render, screen } from '@testing-library/react'
import Tooltip from './Tooltip'

describe('Tooltip', () => {
  it('should render without throwing an error', () => {
    const useRefSpy = { current: null }
    render(
      <Tooltip isHidden={false} direction='left' iconDropEl={useRefSpy} setHideTooltip={() => console.log('hide')}>
        {' '}
        Some text for the tooltip
      </Tooltip>
    )

    expect(screen.getByTestId('tooltip-span')).toBeDefined()
  })
})
