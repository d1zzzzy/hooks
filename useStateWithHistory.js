import { useCallback, useRef, useState } from "react"

/**
 * 
 * @description like redo and undo function
 *              the hook will store state record allow us
 *              to manipulate the state history
 */
function useStateWithHistory (defalutValue, { capacity = 10 }) {
  const [value, setValue] = useState(defalutValue)
  const historyRef = useRef([value])
  const pointerRef = useRef(0)

  const set = useCallback(
    v => {
      const resolvedValue = typeof v === "function"
        ? v(value)
        : v

      /** if not equal current value abort items after pointer */
      if (historyRef.current[pointerRef.current] !== resolvedValue) {
        historyRef.current.splice(pointerRef.current + 1)
      }

      historyRef.current.push(resolvedValue)

      /** if overflowed, remove items from head */
      while(historyRef.current.length > capacity) {
        historyRef.current.shift()
      }

      pointerRef.current = historyRef.current.length - 1

      setValue(resolvedValue)
    },
    [capacity, value]
  )

  const back = useCallback(() => {
    if (pointerRef.current <= 0) return

    pointerRef.current--

    setValue(historyRef.current[pointerRef.current])
  }, [])

  const forward = useCallback(() => {
    if (pointerRef.current >= historyRef.current.length - 1) return

    pointerRef.current++

    setValue(historyRef.current[pointerRef.current])
  }, [])

  const go = useCallback((index) => {
    if (index < 0 || index >= historyRef.length - 1) return

    pointerRef.current = index

    setValue(historyRef.current[pointerRef.current])
  }, [])

  return [
    value,
    set,
    {
      history: historyRef.current,
      pointer: pointerRef.current,
      back,
      forward,
      go,
    }
  ]
}
