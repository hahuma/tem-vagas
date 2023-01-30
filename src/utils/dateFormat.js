import format from 'date-fns/format'
import pt from 'date-fns/locale/pt'

export const dateFormat = (data) => format(new Date(data), 'dd/MM/yyyy', { locale: pt })
