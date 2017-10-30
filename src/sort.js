const addSortInfo = (arr, current) => {
  const [month, year] = current['edition'].split(' de ')
  
  arr.push({ ...current, sortInfo: { month, year } })
  
  return arr 
}

const getTime = (arr, current) => {
  const { month, year } = current['sortInfo']
  const sortInfo = new Date(year, monthValue(month)).getTime()

  arr.push({ ...current, sortInfo })

  return arr
}

const monthValue = (month) => [
  'Janeiro',
  'Fevereiro',
  'Março',
  'Abril',
  'Maio',
  'Junho',
  'Julho',
  'Agosto',
  'Setembro',
  'Outubro',
  'Novembro',
  'Dezembro'
].reduce((obj, curr, i) => { obj[curr] = i; return obj }, {})[month]

const sortFn = (a, b) => b['sortInfo'] - a['sortInfo']

export default (obj) => obj
  .reduce(addSortInfo, [])
  .reduce(getTime, [])
  .sort(sortFn)
