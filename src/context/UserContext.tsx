import React from 'react'
export interface UserStateProps {
  numOfSearches: number
  language: number
  adultContentFilter: number
  openInNewTab: boolean
  isModalOpen: boolean
}
export interface UserContextProps {
  userState: UserStateProps
  setUserState: (userState: Partial<UserStateProps>) => void
}

export const USER_STATE_DEFAULT: UserStateProps = {
  numOfSearches: 0,
  language: 1, // English
  adultContentFilter: 1, // Moderate
  openInNewTab: false,
  isModalOpen: false,
}

const USER_CONTEXT_DEFAULT: UserContextProps = {
  userState: USER_STATE_DEFAULT,
  setUserState: () => {},
}

export const UserContext = React.createContext<UserContextProps>(USER_CONTEXT_DEFAULT)
