import { useEffect, useState } from "react"

/**
 * use IntersectionObserver API to detect whether element intersct with root element
 */
function useOnScreen(ref, rootMargin) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (ref.current === null) return

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { rootMargin }
    )
    
    observer.observe(ref.current)

    return () => {
      if (ref.current === null) return

      observer.unobserve(ref.current)
    }
  }, [ref.current, rootMargin])

  return isVisible
}
