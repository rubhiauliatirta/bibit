import { ADD_MOVIES, SET_LOADING_MOVIES, SET_MOVIES } from "../actionKeys";

const initialState = {
  movies: [],
  isLoading: false,
  currentPage: 0
}

function moviesReducer(state = initialState, action) {
  switch (action.type) {
    case SET_MOVIES:
      return { ...state, movies: action.payload, currentPage: 1 }
    case ADD_MOVIES:
      return {
        ...state,
        movies: state.movies.concat(action.payload),
        currentPage: state.currentPage + 1
      }
    case SET_LOADING_MOVIES:
      return {
        ...state,
        isLoading: action.payload
      }
    default:
      return state
  }
}

export default moviesReducer