import { useEffect } from 'react'

function useUpdateLogger(value) {
  useEffect(() => {
    const.log(`[ useUpdateLogger ] : ${value}`)
  }, [value])
}
