const filters = {
  asDate: str => {
    const parts = str ? str.split('-').map(p => parseInt(p)) : null
    return parts ? `${parts[1]}/${parts[2]}/${parts[0]}` : ''
  },
  usdWhole: int => Number.isInteger(parseInt(int))
    ? `$${parseInt(int).toFixed(2)}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    : '',
  names: arr => arr.map(({ name }) => name).join(', '),
  plural: (name, items) => {
    const quantity = Array.isArray(items) ? items.length : items
    return `${quantity} ${name}` + (1 === quantity ? '' : 's')
  },
  yesNo: val => val ? 'Yes' : 'No',
  isAre: items => (Array.isArray(items) ? items.length : items) === 1 ? 'is' : 'are',
  commas: arr => arr.filter(v => !!v).join(', '),
  minToHour: min => Math.floor(min / 60) + ':' + `${min % 60}`.padStart(2, '0'),
  capital: str => typeof str === 'string' ? str[0].toUpperCase() + str.substring(1) : '',
}

export default filters