import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import MovieCard from "../components/MovieCard";
import Loading from "../components/Loading";
import { searchMovies } from "../store/actions/movies";
import useInfiniteScroll from "../hooks/useInfiniteScroll";

export default function Home() {

  const { movies, isLoading } = useSelector(state => state)
  const dispatch = useDispatch()


  useEffect(() => {
    if(movies.length === 0) {
      dispatch(searchMovies("Batman"))
    }
  }, [])

  useInfiniteScroll()

  return (
      <div className="w-full">
        <div className="mt-5 flex justify-center flex-wrap gap-3 align-stretch">
        {
          movies.map(movie => <MovieCard movie={movie} key={movie.id}/>)
        }
        </div>
        {
          isLoading && (
            <div className="flex justify-center mt-3">
              <Loading />
            </div>
          )
        }
      </div>
  );
}
