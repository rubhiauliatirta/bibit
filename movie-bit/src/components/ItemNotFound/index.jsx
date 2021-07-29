import Lottie from 'lottie-react-web'
import notFound from "../../assets/not-found.json"

export default function LoadingMovie({ message }) {
  return (
    <div className="flex flex-col items-center">
      <Lottie
        options={{ animationData: notFound }}
        width="40%"
      />
      <div className="text-2xl">{message ? message : 'There are no movies that matched your query.'}</div>
    </div>
  )
}