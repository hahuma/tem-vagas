export const unmasked = (value) => {
  if (typeof value === 'string') {
    return value.replace(/[^0-9]/g, '').replace(/\D/g, '')
  }
  return value
}
