import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"

import MovieCard from "../components/MovieCard";
import Loading from "../components/Loading";
import SearchBar from "../components/SearchBar";

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
      <div className="w-full p-10">
        <div className="w-full md:w-2/3 lg:w-1/2 mx-auto">
          <SearchBar />
        </div>
        <div className="mt-10 flex justify-center flex-wrap gap-3 align-stretch">
        {
          movies.map(movie => <MovieCard movie={movie} key={movie.id}/>)
        }
        </div>
        {
          isLoading && (
            <div className="flex justify-center mt-3 fixed left-0 bottom-0 w-full p-4 z-20 bg-blue-500">
              <Loading />
            </div>
          )
        }
      </div>
  );
}
