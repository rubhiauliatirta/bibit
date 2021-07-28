import omdbAPI from "../../helpers/omdbAPI"
import { showError } from "../../helpers/swal"
import { ADD_MOVIES, SET_LOADING_MOVIES, SET_MOVIES } from "../actionKeys"


export function searchMovies(searchQuery) {
  return (dispatch) => {
    dispatch({
      type: SET_LOADING_MOVIES,
      payload: true
    })
    return omdbAPI({
      params: {
        s: searchQuery
      }
    })
      .then(result => {
        dispatch({
          type: SET_MOVIES,
          payload: {
            movies: result.Search,
            total: +result.totalResults,
            currentQuery: searchQuery
          },
        })
      })
      .catch(showError)
      .finally(_ => {
        dispatch({
          type: SET_LOADING_MOVIES,
          payload: false
        })
      })
  }
}

export function fetchMoreMovies() {
  return (dispatch, getState) => {
    const { currentQuery, currentPage } = getState()
    dispatch({
      type: SET_LOADING_MOVIES,
      payload: true
    })
    return omdbAPI({
      params: {
        s: currentQuery,
        page: currentPage + 1
      }
    })
      .then(result => {
        dispatch({
          type: ADD_MOVIES,
          payload: result.Search,
        })
      })
      .catch(showError)
      .finally(_ => {
        dispatch({
          type: SET_LOADING_MOVIES,
          payload: false
        })
      })

  }
}