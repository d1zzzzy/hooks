import { useEffect, useState } from "react"
import useEventListener from "./useEventListener"

function useMediaQuery(mediaQuery) {
  const [isMatch, setIsMatch] = useState(false)
  const [mediaQueryList, setMediaQueryList] = useState(null)

  useEffect(() => {
    const list = window.matchMedia(mediaQuery)

    setMediaQueryList(list)
    setIsMatch(list.matches)
  }, [mediaQuery])

  useEventListener("change", () => setIsMatch(e.matches), mediaQueryList)

  return isMatch
}
