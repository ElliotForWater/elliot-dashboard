import React from 'react'
import { render, screen } from '@testing-library/react'
import Header from './Header'

describe('Header', () => {
  it('should render without throwing an error', async function () {
    render(<Header />)
    expect(screen.getByAltText('img_icon')).toBeDefined()
  })
})
