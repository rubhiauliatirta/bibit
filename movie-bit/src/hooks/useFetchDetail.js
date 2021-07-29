import { useEffect, useState } from "react";
import { getDetail } from "../helpers/api";
import { showError } from "../helpers/swal";

export default function useFetchDetail(id) {

  const [result, setResult] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsLoading(true)
    getDetail(id)
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