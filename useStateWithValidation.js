import { useCallback, useState } from "react"

function useStateWithValidation(
  validationFunction,
  initialValue,
) {
  const [state, setState] = useState(initialValue)
  const [isValid, setIsValid] = useState(() => validationFunction(state))

  /**
   * export setter for calling component change state
   * equal to setState but with validation
   */
  const exposeSetter = useCallback((nextState) => {
    const value = typeof nextState === "function" 
      ? nextState(state)
      : nextState
    
    setState(value)
    setIsValid(validationFunction(value))
  }, [validationFunction])

  return [state, exposeSetter, isValid]
}

