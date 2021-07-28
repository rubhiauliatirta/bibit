import { useEffect, useState } from "react";
import omdbAPI from "../helpers/omdbAPI";
import { showError } from "../helpers/swal";

export default function useFetchDetail(id) {

  const [result, setResult] = useState()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsLoading(true)
    omdbAPI({
      params: {
        i: id
      }
    })
      .then(result => {
        setResult(result)
      })
      .catch(showError)
      .finally(_ => {
        setIsLoading(false)
      })
  }, [id])

  return { result, isLoading }
}