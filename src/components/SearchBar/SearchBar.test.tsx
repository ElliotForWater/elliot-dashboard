import React from 'react'
import { render, screen } from '@testing-library/react'
import SearchBar from './SearchBar'

describe('SearchBar', () => {
  it('should render without throwing an error', () => {
    render(<SearchBar />)

    expect(screen.getByTestId('input-search')).toBeDefined()
  })
})
