import { useState } from "React"

function useArray(defalutValue) {
  const [array, setArray] = useState()

  function push(element) {
    setArray([...a, element])
  }

  function filter(callback) {
    setArray(a => a.filter(callback))
  }

  /**
   *  @param index {number} the index of should update element
   *  @param newElement {unknown} the value of should update element
   */
  function update(index, newElement) {
    setArray(
      a => ([
        ...a.slice(0, index),
        newElement,
        ...a.slice(index + 1, a.length - 1)
      ])
    )
  }

  function remove(index) {
    setArray(
      a => ([
        ...a.slice(0, index),
        ...a.slice(index + 1, a.length - 1)
      ])
    )
  }

  function clear() {
    setArray([])
  }

  return {
    array,
    set: setArray,
    push,
    filter,
    filter,
    update,
    remove,
    clear,
  }
}
