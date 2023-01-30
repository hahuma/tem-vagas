/**
 * @brief Converte uma string em formato moeda para float
 * @param value
 * @example currencyToFloat('R$ 1.000.000,35') // 1000000.35
 * @returns {float}
 */

export const currencyToFloat = (value) => {
  value = String(value) || '0'

  value = value.replace(/[^\d,]/g, '')
  value = value.replace(',', '.')

  const valorNumero = parseFloat(value)
  console.log(typeof valorNumero)
  return valorNumero
}

export const floatToCurrency = (value) => {
  value = value || 0
  return Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value)
}
