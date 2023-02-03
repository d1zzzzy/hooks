import { useCallback, useEffect, useRef } from "react"

function useTimeout(callback, delay) {
  const callbackRef = useRef(callback)
  const timeoutRef = useRef()

  useEffect(() => {
    callbackRef.current = callback
  }, [callback])

  /** start timeout */
  const set = useCallback(() => {
    timeoutRef.current = setTimeout(() => callbackRef.current(), delay)
  }, [delay])

  /** clear timeout */
  const clear = useCallback(() => {
    timeoutRef.current && clearTimeout(timeoutRef.current)
  }, [])


  /** reset timeout */
  const reset = useCallback(() => {
    clear()
    set()
  }, [clear, set])

  useEffect(() => {
    set()

    return clear
  }, [delay, set, clear])

  return { reset, clear }
}
