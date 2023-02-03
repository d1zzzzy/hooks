import { useCallback, useRef } from "react"
import useAsync from "./useAsync"

const DefaultOptions = {
  headers: {
    "Content-Type": "application/json"
  }
}

function useFetch(url, options = {}, dependencies = []) {
  const abortController = useRef(new AbortController())

  const abort = useCallback(() => {
    abortController.current.abort()
    abortController.current = new AbortController()
  }, [])

  const { loading, error, value } = useAsync(() => {
    return fetch(
      url,
      {
        signal: abortController.current.signal,
        ...DefaultOptions,
        ...options,
      }
    ).then(response => {
      if (response.ok) return response.json()

      return response.json().then(json => Promise.reject(json))
    })
  }, dependencies)

  return { loading, error, value, abort }
}
