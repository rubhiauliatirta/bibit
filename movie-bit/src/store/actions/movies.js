import omdbAPI from "../../helpers/omdbAPI"
import { showError } from "../../helpers/swal"
import { SET_LOADING_MOVIES, SET_MOVIES } from "../actionKeys"


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
          payload: result
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