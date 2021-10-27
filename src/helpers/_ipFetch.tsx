export const fetchIp = async function () {
  try {
    const res = await fetch('https://extreme-ip-lookup.com/json/')
    if (res.ok) {
      const ips = await res.json()
      return ips
    }
  } catch (err) {
    console.log('Error fetching ip address server', err)
  }
}

export const bingMarketCountries = [
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
