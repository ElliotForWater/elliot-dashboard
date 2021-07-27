import Cookies from 'js-cookie'

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

function convertCookieValue(name: CookieName, value?: string): string | number | boolean | undefined {
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

export function getCookie(name: CookieName) {
  const value = Cookies.get(name)
  return convertCookieValue(name, value)
}

export function setCookie(name: CookieName, value: string, opts?: { expires: number }): void {
  Cookies.set(name, value, opts)
}
