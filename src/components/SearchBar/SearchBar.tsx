import React, { useState, useEffect, useContext, useRef, FocusEventHandler } from 'react'
// import { useRouter } from 'next/router'
import { useForm, FormProvider } from 'react-hook-form'
import { Input } from '../Forms/Inputs/Inputs'
import { UserContext } from '../../context/UserContext'
import fetchJsonp from 'fetch-jsonp'
import classnames from 'classnames'
import styles from './SearchBar.module.css'
import SearchIcon from '../Icons/SearchIcon'
import { queryNoWitheSpace } from '../../helpers/_utils'

const SUGGESTED_WORDS_URL = 'https://suggest.finditnowonline.com/SuggestionFeed/Suggestion?format=jsonp&gd=SY1002042&q='

const SearchBar = () => {
  // const router = useRouter()

  // Query params can be of type `string[]` in case a name is used multiple times in the URL.
  // See https://nodejs.org/api/querystring.html#querystring_querystring_parse_str_sep_eq_options
  // We assume here that each name exists only once in the query and thus is `string`.
  // const query = router.query.query as string
  // const type = router.query.type as string
  // const method = router.query.method as string

  const { userState, setUserState } = useContext(UserContext)

  // const initType = typeof type === 'undefined' ? 'web' : type
  // const [typeValue, setTypeValue] = useState<string | string[]>(initType)

  const [searchValue, setSearchValue] = useState<string>('')
  const [highlightIndex, setHighlightIndex] = useState<number>(-1)
  const [isSuggestionOpen, setIsSuggestionOpen] = useState<boolean>(false)
  const [suggestedWords, setSuggestedWords] = useState<Array<string>>([])
  const [searchSuggestedWords, setSearchSuggestedWords] = useState(true)
  const inputEl = useRef(null)

  const methods = useForm({
    defaultValues: {
      language: userState.language,
      adultContentFilter: userState.adultContentFilter,
      openInNewTab: userState.openInNewTab,
    },
  })
  const { handleSubmit, register } = methods


  // if (type !== typeValue && typeValue !== initType) {
  //   setTypeValue(type)
  // }

  // useEffect(() => {
  //   if (method === 'topbar') {
  //     setUserState({ numOfSearches: Number(userState.numOfSearches) + 1 })
  //   }

  //   if (query !== undefined && query !== searchValue) {
  //     setSearchValue(query)
  //   }
  // }, [query])

  useEffect(() => {
    const handleKeyDown = (event:KeyboardEvent) => {
      const { key } = event

      switch (key) {
        case 'ArrowUp':
          event.preventDefault()
          setSearchSuggestedWords(false)
          return setHighlightIndex((prevIndex:number) => {
            if (prevIndex === 0) {
              return prevIndex
            } else {
              return prevIndex - 1
            }
          })

        case 'ArrowDown':
          setSearchSuggestedWords(false)
          return setHighlightIndex((prevIndex:number) => {
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
          setIsSuggestionOpen(false)
          break

        default:
          setHighlightIndex(-1)
      }
    }
    document.body.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.removeEventListener('keydown', handleKeyDown)
    }
  }, [searchValue])

  useEffect(() => {
    const fetchSuggestedWords = async () => {
      try {
        const res = await fetchJsonp(`${SUGGESTED_WORDS_URL}${searchValue}`)
        const suggestedWordsArray = await res.json()
        setSuggestedWords(suggestedWordsArray[1].slice(0, 10))
        return
      } catch {
        console.log('error fetching suggested results')
      }
    }

    if (searchSuggestedWords) {
      fetchSuggestedWords()
    }
  }, [searchValue])

  function onSubmit() {
    search(searchValue)
  }

  function resetDropdown(event?:React.FocusEvent<HTMLInputElement>) {
    // if (!big) {
    //   setIsSuggestionOpen(false)
    // }
    setHighlightIndex(-1)
    event && event.target.blur()
  }

  function search(searchString: string) {
    if (!searchString) {
      return
    }

    setUserState({ numOfSearches: Number(userState.numOfSearches) + 1 })
    const queryNoSpace = queryNoWitheSpace(searchString)
    const redirectQuery = `https://elliotforwater.com/search?query=${queryNoSpace}&type=web`
    window.location.href = redirectQuery
    
    resetDropdown()
  }

  function handleOnMouseDown(word: string) {
    setSearchValue(word)
    search(word)
  }

  function handleOnChange(value: string) {
    setSearchValue(value)

    if (value.trim()) {
      setSearchSuggestedWords(true)
      setIsSuggestionOpen(true)
    }
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
              placeholder='Search the web to give water...'
              register={register}
            />
            <button className={styles.button} type='submit'>
              <SearchIcon color='var(--elliotPrimary)' size={16} />
            </button>
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
                <SearchIcon color='var(--dimGrey)' size={14} />
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
