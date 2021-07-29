import Lottie from 'lottie-react-web'
import pageNotFound from "../assets/page-404.json"

export default function LoadingMovie() {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <Lottie
        options={{ animationData: pageNotFound }}
        width="60%"
      />
    </div>
  )
}