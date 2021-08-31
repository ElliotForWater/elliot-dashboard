import Cookies from 'js-cookie'
import { extensionApiObject } from '../App'

export const COOKIE_NAME_LANGUAGE = 'efw_language'
export const COOKIE_NAME_ADULT_FILTER = 'efw_adult_filter'
export const COOKIE_NAME_NEW_TAB = 'efw_new_tab'
export const COOKIE_NAME_COOKIE_CONSENT = 'efw_cookie_consent_accepted'
export const COOKIE_NAME_SEARCH_COUNT = 'efw_search_count'

type CookieName =
  | typeof COOKIE_NAME_LANGUAGE
  | typeof COOKIE_NAME_ADULT_FILTER
  | typeof COOKIE_NAME_NEW_TAB
  | typeof COOKIE_NAME_COOKIE_CONSENT
  | typeof COOKIE_NAME_SEARCH_COUNT

export type CookieMap = { [cookieName: string]: string }

function convertCookieValue(name: string, value?: string): string | number | boolean | undefined {
  if (value === undefined) {
    return value
  }

  switch (name) {
    case COOKIE_NAME_SEARCH_COUNT:
    case COOKIE_NAME_LANGUAGE:
      return Number(value)

    case COOKIE_NAME_ADULT_FILTER:
      return isNaN(Number(value)) ? 1 : Number(value)

    case COOKIE_NAME_NEW_TAB:
      return value !== 'false'

    default:
      return value
  }
}

export async function getCookieValue(name: CookieName) {
  if (extensionApiObject) {
    const promiseCookie = new Promise<string | number | boolean | undefined>((resolve, reject) => {
      extensionApiObject.cookies.getAll({}, (cookies) => {
        const filteredCookies = cookies.filter((cookie) => {
          return cookie.domain === 'elliotforwater.com' && cookie.name === name
        })

        resolve(convertCookieValue(name, filteredCookies[0]?.value))
      })
    })

    return promiseCookie.then()
  } else {
    const value = Cookies.get(name)
    return convertCookieValue(name, value)
  }
}

export function setCookie(name: CookieName, value: string, opts?: { expires: number }): void {
  const valueString = value.toString()
  if (extensionApiObject) {
    extensionApiObject.cookies.set({
      url: 'https://elliotforwater.com/',
      name,
      value: valueString,
    })
  } else {
    Cookies.set(name, valueString, opts)
  }
}
