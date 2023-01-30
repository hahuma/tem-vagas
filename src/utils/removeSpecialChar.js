export const removeSpecialChar = (especialChar) => {
  let normalChar = especialChar
  normalChar = normalChar
    .normalize('NFD')
    .replace(/([\u0300-\u036f]|[^0-9a-zA-Z\s])/g, '')
  return normalChar
}
