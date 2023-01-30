export const errorMessageList = (data) => {
  const errorMessageArray = []
  const hasErrorCaptured = data.length
  if (typeof data !== 'object') {
    errorMessageArray.push(data)
  } else {
    const keys = Object.entries(data)
    keys.forEach(([, value]) => {
      errorMessageArray.push({
        value,
      })
    })
  }

  return { hasErrorCaptured, errorMessageArray }
}
