/// <reference types="chrome"/>

import React, { useState, useEffect, useContext, useRef } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import fetchJsonp from 'fetch-jsonp'
import Select, { components } from 'react-select'
import { Input } from '../Forms/Inputs/Inputs'
import { UserContext } from '../../context/UserContext'
import classnames from 'classnames'
import styles from './SearchBar.module.css'
import SearchIcon from '../../images/search_icon.svg'
import SearchIconComp from '../Icons/SearchIcon'
import { queryNoWitheSpace } from '../../helpers/_utils'
import { extensionApiObject } from '../../App'
import Drop from '../../images/water_droplet.svg'
import Bing from '../../images/Bing-Logo1.png'

interface SearchEngineProps {
  value: string
  label: string
  icon: string
}

const searchEngines = [
  { value: 'elliot', label: 'Elliot', icon: Drop },
  { value: 'bing', label: 'Bing', icon: Bing },
]

const { Option, ValueContainer } = components
const IconOption = (props) => (
  <Option {...props}>
    <img className={styles.optionIconImg} src={props.data.icon} style={{ width: 25 }} alt={props.data.label} />
  </Option>
)

const SearchBar = () => {
  const { userState, setUserState } = useContext(UserContext)
  const [searchValue, setSearchValue] = useState<string>('')
  const [highlightIndex, setHighlightIndex] = useState<number>(-1)
  const [isSuggestionOpen, setIsSuggestionOpen] = useState<boolean>(false)
  const [suggestedWords, setSuggestedWords] = useState<Array<string>>([])
  const [searchSuggestedWords, setSearchSuggestedWords] = useState(true)

  const defaultSearchEngine = localStorage.getItem('defaultSearchEngine') || 'bing'
  const defaultSearchEngineObject: SearchEngineProps =
    searchEngines.find((engine) => engine.value === defaultSearchEngine) || searchEngines[1]
  const [searchEngineObj, setSearchEngineObj] = useState(defaultSearchEngineObject)
  const inputEl = useRef(null)

  const ContainerIcon = ({ children, ...rest }) => {
    return (
      <ValueContainer {...rest}>
        {/* <img
          className={styles.selectedIcon}
          src={searchEngineObj.icon}
          style={{ width: 25 }}
          alt={searchEngineObj.label}
        /> */}
        <span className={styles.selectedValue}>{children}</span>
      </ValueContainer>
    )
  }

  const customSelectStyles = {
    option: (provided, state) => ({
      padding: 16,
      backgroundColor: 'white',
      ':hover': {
        backgroundColor: 'var(--lightGrey)',
      },
    }),
    menu: (provided, state) => ({
      top: '17px',
      position: 'absolute',
      left: '-10px',
      paddingTop: 20,
      width: 55,
    }),
    control: (provided, state) => ({
      display: 'flex',
      border: '0 transparent',
    }),
    container: (provided, state) => ({
      marginTop: '-10px',
    }),
    singleValue: (provided, state) => ({
      color: 'white',
    }),
  }

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
    const redirectQuery =
      searchEngineObj.value === 'elliot'
        ? `https://elliotforwater.com/search?query=${queryNoSpace}&type=web`
        : `${process.env.BING_LINKVERTISE}${queryNoSpace}`
    window.location.href = redirectQuery

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

  function handleChangeSearch(newSearchObj) {
    setSearchEngineObj(newSearchObj)
    localStorage.setItem('defaultSearchEngine', newSearchObj.value)
  }

  return (
    <div className={styles.wrapper}>
      <FormProvider {...methods}>
        <div className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <form ref={inputEl}>
            <Input
              name='query'
              type='search'
              value={searchValue}
              className={styles.input}
              onChange={(el) => handleOnChange(el.target.value)}
              onFocus={(el) => handleOnChange(el.target.value)}
              onBlur={resetDropdown}
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
              <Select
                isMulti={false}
                isSearchable={false}
                styles={customSelectStyles}
                defaultValue={searchEngineObj}
                options={searchEngines}
                components={{ Option: IconOption, ValueContainer: ContainerIcon }}
                onChange={handleChangeSearch}
              />
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
