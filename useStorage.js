import { useCallback, useEffect, useState } from "react"

function useLocalStorage(key, defalutValue) {
  return useStorage(key, defalutValue, window.localStorage)
}

function useSessionStorage(key, defalutValue) {
  return useStorage(key, defalutValue, window.localStorage)
}

function useStorage(key, defalutValue, storageLocation) {
  const [value, setValue] = useState(() => {
    const jsonValue = storageLocation.getItem(key)

    if (jsonValue !== null) return JSON.parse(jsonValue)

    if (typeof defalutValue === 'function') {
      return defalutValue()
    } else {
      return defalutValue
    }
  })

  useEffect(() => {
    if (value === undefined) return storageLocation.removeItem(key)

    storageLocation.setItem(key, JSON.stringify(value))
  }, [key, value, storageLocation])

  const remove = useCallback(() => {
    setValue(undefined)
  }, [])

  return [value, setValue, remove]
}
