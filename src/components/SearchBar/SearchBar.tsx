/// <reference types="chrome"/>

import React, { useState, useEffect, useContext } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import fetchJsonp from 'fetch-jsonp'
import { Input } from '../Forms/Inputs/Inputs'
import { UserContext } from '../../context/UserContext'
import classnames from 'classnames'
import styles from './SearchBar.module.css'
import SearchIcon from '../../images/search_icon.svg'
import SearchIconComp from '../Icons/SearchIcon'
import { queryNoWitheSpace } from '../../helpers/_utils'
import { extensionApiObject } from '../../App'
import Drop from '../../images/water_droplet.svg'

const SearchBar = () => {
  const { userState, setUserState } = useContext(UserContext)
  const [searchValue, setSearchValue] = useState<string>('')
  const [highlightIndex, setHighlightIndex] = useState<number>(-1)
  const [isSuggestionOpen, setIsSuggestionOpen] = useState<boolean>(false)
  const [suggestedWords, setSuggestedWords] = useState<Array<string>>([])
  const [searchSuggestedWords, setSearchSuggestedWords] = useState(true)

  const methods = useForm({
    defaultValues: {
      language: userState.language,
      adultContentFilter: userState.adultContentFilter,
      openInNewTab: userState.openInNewTab,
    },
  })
  const { handleSubmit, register } = methods

  function handleMessage(msg) {
    if (msg.target === 'fetch-suggestion') {
      setSuggestedWords(msg.data[1].slice(0, 10))
    }
  }

  async function fetchSuggestedWords() {
    try {
      const res = await fetchJsonp(`${process.env.SUGGESTED_WORDS_URL}${searchValue}`)
      const suggestedWordsArray = await res.json()
      return setSuggestedWords(suggestedWordsArray[1].slice(0, 10))
    } catch {
      console.log('error fetching suggested results')
    }
  }

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const { key } = event

      switch (key) {
        case 'ArrowUp':
          event.preventDefault()
          setSearchSuggestedWords(false)
          return setHighlightIndex((prevIndex: number) => {
            if (prevIndex === 0) {
              return prevIndex
            } else {
              return prevIndex - 1
            }
          })

        case 'ArrowDown':
          setSearchSuggestedWords(false)
          return setHighlightIndex((prevIndex: number) => {
            if (prevIndex === -1) {
              return 0
            }

            if (prevIndex === suggestedWords.length - 1) {
              return prevIndex
            } else {
              return prevIndex + 1
            }
          })

        case 'Escape':
          setSearchSuggestedWords(false)
          break

        default:
          setHighlightIndex(-1)
      }
    }
    document.body.addEventListener('keydown', handleKeyDown)

    /* eslint-disable no-undef */
    if (extensionApiObject?.runtime) {
      extensionApiObject.runtime.sendMessage({
        contentScriptQuery: 'searchValue',
        value: searchValue,
      })
      extensionApiObject.runtime.onMessage.addListener(handleMessage)
    } else {
      if (searchSuggestedWords) {
        fetchSuggestedWords()
      }
    }

    return () => {
      document.body.removeEventListener('keydown', handleKeyDown)
      if (extensionApiObject?.runtime) {
        chrome.runtime.onMessage.removeListener(handleMessage)
      }
    }
    /* eslint-enable no-undef */
  }, [searchValue])

  function resetDropdown(event?: React.FocusEvent<HTMLInputElement>) {
    setHighlightIndex(-1)
    event && event.target.blur()
  }

  function search(searchString: string) {
    if (!searchString) {
      return
    }

    setUserState({ numOfSearches: Number(userState.numOfSearches) + 1 })
    const queryNoSpace = queryNoWitheSpace(searchString)
    window.location.href = `https://elliotforwater.com/search?query=${queryNoSpace}&type=web`

    resetDropdown()
  }

  function onSubmit() {
    search(searchValue)
  }

  function handleOnMouseDown(word: string) {
    setSearchValue(word)
    search(word)
  }

  function handleOnChange(value: string) {
    setSearchValue(value)

    if (value.trim()) {
      setIsSuggestionOpen(true)
    } else {
      setIsSuggestionOpen(false)
    }
  }

  return (
    <div className={styles.wrapper}>
      <FormProvider {...methods}>
        <div className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <form>
            <Input
              name='query'
              type='search'
              data-testid='input-search'
              value={searchValue}
              className={styles.input}
              onChange={(el) => handleOnChange(el.target.value)}
              onFocus={(el) => handleOnChange(el.target.value)}
              onBlur={resetDropdown}
              autoFocus
              autoComplete='off'
              autoCorrect='off'
              spellCheck='false'
              placeholder='Every search gives water...'
              register={register}
            />
            <button className={styles.button} type='submit'>
              <img className={styles.searchIcon} src={SearchIcon} />
            </button>
            <div className={styles.selectDefaultSearch}>
              <img className={styles.iconElliot} src={Drop} alt='elliot' />
            </div>
          </form>
        </div>
      </FormProvider>

      {isSuggestionOpen && (
        <ul className={styles.autosuggestResults}>
          {suggestedWords.map((word, i) => (
            <li
              key={i}
              className={classnames(styles.autosuggestWord, {
                [styles.highlight]: i === highlightIndex,
              })}
              onMouseDown={(el) => {
                const input = el.target as HTMLElement
                handleOnMouseDown(input.innerText)
              }}
              ref={(el) => {
                if (i === highlightIndex && el) {
                  return setSearchValue(el.innerText)
                }
              }}
            >
              <span className={styles.autosuggestItemIcon}>
                <SearchIconComp color='var(--dimGrey)' size={14} />
              </span>
              {word}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default SearchBar
