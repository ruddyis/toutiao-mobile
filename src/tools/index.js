export const setLocalStorage = (key, value) => {
  if (typeof value === 'object') {
    value = JSON.stringify(value)
  }
  window.localStorage.setItem(key, value)
}
export const getLocalStorage = key => {
  var data = window.localStorage.getItem(key)
  try {
    return JSON.parse(data)
  } catch (err) {
    return data
  }
}
export const removeLocalStorage = key => {
  return window.localStorage.removeItem(key)
}
