import noImage from '../../assets/no_image.jpg'
import { showError } from '../../helpers/swal';

export default function MovieCard({ movie }) {

  function onClick(e) {
    e.stopPropagation()
    showError("Coba seriieapeicn")
  }

  return (
    <div className="w-72 relative">
      <div className="w-full flex flex-col justify-end p-0 z-10 bottom-0 absolute" >
        <div className="relative">
          <div className="bg-gray-800 absolute h-full w-full opacity-80"></div>
          <div className="p-3 z-20 relative flex flex-col ">
            <div className="text-lg text-white font-semibold truncate">{movie.Title}</div>
            <div className="text-base text-white">{movie.Year}</div>
            <button 
              className="self-end bg-yellow-500 hover:bg-yellow-600 text-current text-sm font-bold py-2 px-3 rounded" onClick={onClick}>
                Show Detail
            </button>
          </div>
        </div>
      </div>
      <img className="w-full h-full object-cover cursor-pointer hover:opacity-70 transition duration-200 ease-in-out"
        src={movie.Poster !== "N/A" ? movie.Poster : noImage} alt="Movie Poster">
      </img>
    </div>
  );
}
