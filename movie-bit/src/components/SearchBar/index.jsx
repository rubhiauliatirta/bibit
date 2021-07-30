import axios from "axios";
import { useEffect, useState, useCallback, useRef } from "react";
import { useDispatch } from "react-redux";
import { search } from "../../helpers/api";
import { searchMovies } from "../../store/actions/movies";

export default function SearchBar() {

  const [searchQuery, setSearchQuery] = useState("")
  const [isFocus, setIsFocus] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [suggestions, setSuggetions] = useState(null)
  const isSubmitting = useRef(false)
  const dispatch = useDispatch()

  useEffect(() => {
    if(!isFocus) {
      setSuggetions(null)
    }
  }, [isFocus])

  const handleSuggestionClick = useCallback((suggestion) => {
    isSubmitting.current = true
    setSearchQuery(suggestion)
    setSuggetions(null)
    dispatch(searchMovies(suggestion))
    .then(() => {
      isSubmitting.current = false
    })
  }, [dispatch])
  
  const handleSubmit = (event) => {
    event.preventDefault()
    isSubmitting.current = true
    setSuggetions(null)
    dispatch(searchMovies(searchQuery))
    .then(() => {
      isSubmitting.current = false
    })
    
  }
  
  useEffect(() => {
    if(isSubmitting.current) {
      return
    }
    
    let timeoutId = null
    let source = null
    if(searchQuery.length > 2) {
      setIsLoading(true)
      timeoutId = setTimeout(() => {
        source = axios.CancelToken.source();
        search(searchQuery, 1, source.token)
        .then(data => {
          setSuggetions(data.Search.map(item => item.Title))
        })
        .catch(err => {
          if (!axios.isCancel(err)) {
            setSuggetions([])
          }
        })
        .finally(() => setIsLoading(false))
      }, 500)
    } else {
      setIsLoading(false)
      setSuggetions(null)
    }
    return () => {
      if(source !== null) {
        source.cancel()
      }
      if(timeoutId !== null) {
        clearTimeout(timeoutId)
      }
    }
  }, [searchQuery])

  return (
    <div className="relative">
    <form onSubmit={handleSubmit} className="flex" data-testid="search-form">
      <div className={`bg-gray-200 rounded-l-lg w-full flex items-center border-2 
        ${isFocus ? 'border-blue-500' : 'border-gray-200'} `} data-testid="search-wrapper">
          <input 
            data-testid="search-input"
            placeholder="Search Movies e.g 'Batman'"
            type="text" 
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={(event) => setSearchQuery(event.target.value)}
            value={searchQuery}
            className="py-2 px-4 rounded-lg appearance-none outline-none text-gray-700 bg-gray-200 flex-1"
          />
        <svg className={`animate-spin -ml-1 mr-3 h-5 w-5 text-blue-500 ${!isLoading ? 'hidden' : ''}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" data-testid="search-loading">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      </div>
      <input type="submit" value="Search" className="rounded-r-lg bg-yellow-500 hover:bg-yellow-600 px-4 cursor-pointer" data-testid="search-button"/>
    </form>
    {
      (suggestions !== null) && (
        <ul className="bg-white border border-gray-100 w-full md:w-3/4 mt-2 absolute z-20" data-testid="suggestion-option">
        {
          suggestions.length === 0 ? (
            <li className="pl-6 pr-2 py-3 border-b-2 border-gray-100 relative">
              <div className="italic text-gray-500">No Suggestion</div>
            </li>
          ) : (
            suggestions.map(suggestion => (
              <li 
                key={suggestion}
                onMouseDown={() => handleSuggestionClick(suggestion)}
                className="pl-6 pr-2 py-3 border-b-2 border-gray-100 relative cursor-pointer hover:bg-blue-100">
                <BoldQuery
                  suggestion={suggestion}
                  query={searchQuery}
                />
              </li>
            ))
          )
        }
        </ul>
      )
    }
    </div>
  )
}

function BoldQuery({ suggestion, query }) {
  const splitResult = suggestion.split(RegExp(`(${query})`, 'i'))
  return splitResult.map((item,index) => {
    if(item.toLowerCase() === query.toLowerCase()) {
      return <b key={index}>{item}</b>
    } else {
      return <span key={index}>{item}</span>
    }
  })
}