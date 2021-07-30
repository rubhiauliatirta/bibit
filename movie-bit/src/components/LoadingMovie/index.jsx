import Lottie from 'lottie-react-web'
import movieLoading from "../../assets/movie-loading.json"


export default function LoadingMovie({ message }) {
  return (
    <div className="flex flex-col items-center">
      <Lottie
        options={{ animationData: movieLoading}}
        width="50%"
        height="50%"
      />
      <div className="text-3xl">{message}</div>
    </div>
  )
}