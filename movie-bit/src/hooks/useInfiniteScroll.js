import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { fetchMoreMovies } from "../store/actions/movies"

export default function useInfiniteScroll() {

  const isLoading = useSelector(state => state.isLoading)
  const dispatch = useDispatch()
  const shouldFetchMore = useSelector(
    state =>
      state.currentPage < 100 // dari dokumentasi valid page itu 1-100
      && state.movies.length < state.total
  )

  useEffect(() => {
    function scrollListener() {
      const isReachBottomScroll = (window.innerHeight + window.pageYOffset) >= document.body.offsetHeight - 2
      if (!isLoading && shouldFetchMore && isReachBottomScroll) {
        dispatch(fetchMoreMovies())
      }
    }
    window.addEventListener('scroll', scrollListener)
    return () => {
      window.removeEventListener('scroll', scrollListener)
    }
  }, [dispatch])

}