import { useState, useCallback, useMemo } from 'react'
import { UserContextProps, UserStateProps, USER_STATE_DEFAULT } from '../context/UserContext'
import {
  COOKIE_NAME_LANGUAGE,
  COOKIE_NAME_ADULT_FILTER,
  COOKIE_NAME_NEW_TAB,
  COOKIE_NAME_SEARCH_COUNT,
  getCookie,
  setCookie,
} from '../helpers/_cookies'

const cookiesName: { [key: string]: any } = {
  numOfSearches: COOKIE_NAME_SEARCH_COUNT,
  language: COOKIE_NAME_LANGUAGE,
  adultContentFilter: COOKIE_NAME_ADULT_FILTER,
  openInNewTab: COOKIE_NAME_NEW_TAB,
}

const mergeCookiesWithUserState = (defaultUserState: UserStateProps): UserStateProps => {
  const newUserState = { ...defaultUserState }

  for (const key in newUserState) {
    if (Object.getOwnPropertyDescriptor(cookiesName, key)) {
      const cookieValue = getCookie(cookiesName[key])
      if (cookieValue !== undefined) {
        newUserState[key] = cookieValue
      }
    }
  }

  return newUserState
}

export const useUserStateSyncedWithCookies = (): UserContextProps => {
  const initialUserState = useMemo(() => mergeCookiesWithUserState(USER_STATE_DEFAULT), [])
  const [userState, _setUserState] = useState(initialUserState)

  const setUserState = useCallback((nextState: Partial<UserStateProps>): void => {
    _setUserState((prevState) => {
      const newState = {
        ...prevState,
        ...nextState,
      }
      newState.adultContentFilter = Number(newState.adultContentFilter)
      newState.language = Number(newState.language)

      for (const key in nextState) {
        if (Object.getOwnPropertyDescriptor(cookiesName, key)) {
          setCookie(cookiesName[key], newState[key], { expires: 365 })
        }
      }

      return newState
    })
  }, [])

  return {
    userState,
    setUserState,
  }
}
