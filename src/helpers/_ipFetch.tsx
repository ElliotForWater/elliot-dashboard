export const fetchIp = async function () {
  try {
    let res
    if (process.env.NODE_ENV === 'production') {
      res = await fetch(`${process.env.IPREGISTRY_API_LINK}${process.env.IPREGISTRY_API_PROD}`)
    } else {
      res = await fetch(`${process.env.IPREGISTRY_API_LINK}${process.env.IPREGISTRY_API_DEV}`)
    }

    if (res.ok) {
      const ipInfo = await res.json()
      return ipInfo
    } else {
      console.error('Ip fetch not successful')
    }
  } catch (err) {
    console.log('Error fetching ip address server', err)
  }
}

export const bingMarketCountries = [
  'Albania',
  'Australia',
  'Austria',
  'Belgium',
  'Brazil',
  'Canada',
  'Denmark',
  'Finland',
  'France',
  'Germany',
  'India',
  'Italy',
  'Ireland',
  'Japan',
  'Luxembourg',
  'Netherlands',
  'New Zealand',
  'Norway',
  'Spain',
  'Sweden',
  'Switzerland',
  'United Kingdom',
  'United States',
]
