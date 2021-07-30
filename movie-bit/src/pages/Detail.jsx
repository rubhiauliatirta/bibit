import { useParams } from "react-router-dom"
import useFetchDetail from "../hooks/useFetchDetail";
import noImage from "../assets/no_image.jpg"
import DetailItem from "../components/DetailItem";
import LoadingMovie from "../components/LoadingMovie";
import ItemNotFound from "../components/ItemNotFound"

export default function Detail() {
  const { id } = useParams()
  const { result, isLoading } = useFetchDetail(id)
  
  return (
    <div className="w-full">
      {
        isLoading ? (
          <div className="h-screen w-full flex justify-center items-center">
            <LoadingMovie message="Loading Movie..."/>
          </div>
        ) : !result ? (
          <ItemNotFound message="Item Not Found"/>
        ) : (
          <div className="px-10 md:px-20 lg:px-32 py-10">
            <div className="text-4xl font-bold">{result.Title}</div>
            <div className="flex gap-x-2">
              <div className="text-xl text-gray-400">{result.Year}</div>
              <div className="text-xl text-gray-400">-</div>
              <div className="text-xl text-gray-400">{result.Runtime}</div>
            </div>
            <div className="mt-5 flex gap-10 items-start">
              <img 
                src={result.Poster === "N/A" ? noImage : result.Poster} 
                alt="Poster" width="300" 
                />
              <div className="flex flex-col flex-1 gap-5">
                <div className="flex gap-x-4">
                  {
                    result.Ratings.map(item => (
                      <div className="bg-gray-100 py-3 px-5 rounded-lg" key={item.Source}>
                        <div className="font-semibold text-gray-500">{item.Source}</div>
                        <div className="font-bold text-xl">{item.Value}</div>
                      </div>
                    ))
                  }
                </div>
                <div className="flex gap-2 flex-wrap">
                {
                  result.Genre.split(", ").map(genre => (
                    <div className="bg-gray-800 rounded-xl py-1 px-2" key={genre}>
                      <div className="text-sm text-white">{genre}</div>
                    </div>
                  ))
                }
                </div>
                <div className="flex gap-x-5">
                  <div className="w-1/2 flex flex-col gap-y-5">
                    <DetailItem 
                      title="Release Date"
                      content={result.Released}
                    />
                    <DetailItem 
                      title="Writer"
                      content={result.Writer}
                    />
                  </div>
                  <div className="w-1/2 flex flex-col gap-y-5">
                    <DetailItem 
                      title="Director"
                      content={result.Director}
                    /> 
                    <DetailItem 
                      title="Actors"
                      content={result.Actors} />
                    <DetailItem 
                      title="Production"
                      content={result.Production}
                    />
                  </div>
                </div>
              </div>
            </div>
            {
              result.Plot !== "N/A" && (
                <div className="mt-7">
                  <div className="text-2xl font-bold">Overview</div>
                  <div className="ml-4 text-lg text-gray-400 italic mt-3">{result.Plot}</div>
                </div>
              )
            }
          </div>
        )
      }
    </div>
  );
}