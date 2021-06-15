export function formatNumber(num: number) {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
}

export function queryNoWitheSpace(query: string) {
  return query.replace(/\s/g, '+')
}
