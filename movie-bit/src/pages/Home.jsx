import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"

import MovieCard from "../components/MovieCard";
import LoadingMore from "../components/LoadingMore";
import SearchBar from "../components/SearchBar";
import ItemNotFound from "../components/ItemNotFound";

import { searchMovies } from "../store/actions/movies";
import useInfiniteScroll from "../hooks/useInfiniteScroll";
import LoadingMovie from "../components/LoadingMovie";

export default function Home() {

  const { movies, isSearchLoading } = useSelector(state => state)
  const isFetchMoreLoading =  useInfiniteScroll()
  const dispatch = useDispatch()
  
  useEffect(() => {
    if(movies.length === 0) {
      dispatch(searchMovies("Batman"))
    }
  }, [])

  return (
      <div className="w-full p-10">
        <div className="w-full md:w-2/3 lg:w-1/2 mx-auto">
          <SearchBar />
        </div>
        {
          isSearchLoading ? (
            <div className="w-full h-screen flex justify-center items-center">
              <LoadingMovie message="Searching movie..."/>
            </div>
          ) : (
            <div className="mt-10 flex justify-center flex-wrap gap-3 align-stretch">
            {
              movies.length === 0 ? (
                <ItemNotFound />
              ) : (
                movies.map(movie => <MovieCard movie={movie} key={movie.imdbID}/>)
              )
            }
            </div>
          )
        }
        {
          isFetchMoreLoading && (
            <div className="flex justify-center mt-3 fixed left-0 bottom-0 w-full p-4 z-20 bg-blue-500">
              <LoadingMore />
            </div>
          )
        }
      </div>
  );
}
