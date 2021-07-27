import React from 'react'
import { mount } from 'enzyme'
import Header from './Header'
import { act } from 'react-dom/test-utils'
import { UserContext } from '../../context/UserContext'
import { user } from '../../../__mocks__/userContext'

const userContext = {
  userState: user,
  setNextUserState: () => {},
}

describe('Header', () => {
  it('should render without throwing an error', async function () {
    await act(async () => {
      const wrap = mount(
        <UserContext.Provider value={userContext}>
          <Header />
        </UserContext.Provider>
      )
      expect(wrap.find('img').first().prop('src')).toEqual('/images/water_droplet.svg')
    })
  })
})
