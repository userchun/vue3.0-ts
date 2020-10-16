export const getItemStr = (key: string) => {
  return localStorage.getItem(key)
}
export const setItemStr = (key: string, value: string) => {
  localStorage.setItem(key, value)
}
export const getItemObj = (key: string) => {
  const value = localStorage.getItem(key)
  if (value) {
    return JSON.parse(value)
  } else {
    return null
  }
}
export const setItemObj = (key: string, value: object) => {
  return localStorage.setItem(key, JSON.stringify(value))
}

 export  function areEqual(prevProps, nextProps) {
  if (JSON.stringify(prevProps) === JSON.stringify(nextProps)) {
    return true
  } else {
    return false
  }
}