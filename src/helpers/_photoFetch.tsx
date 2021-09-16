export const fetchRandomPhoto = async function () {
  const urlCollection = `${process.env.PEXELS_API_URL}/collections/ojmmnad`

  const headers = new Headers({
    Authorization: `${process.env.PEXELS_API_KEY}`,
  })

  const date = new Date()
  const today = date.toLocaleDateString()
  // const todayNumber = date.toLocaleDateString('en-GB', { day: 'numeric' })
  let dailyPhoto = localStorage.getItem('dailyPhoto')
  const savedPhotoDate = localStorage.getItem('savedPhotoDate')
  const isNewDay = savedPhotoDate !== JSON.stringify(today)

  if (!dailyPhoto || isNewDay) {
    try {
      const res = await fetch(`${urlCollection}`, { headers })

      if (res.ok) {
        const photos = await res.json()
        dailyPhoto = photos.media[1]
        console.log({ dailyPhoto: photos.media })
        localStorage.setItem('dailyPhoto', JSON.stringify(dailyPhoto))
        localStorage.setItem('savedPhotoDate', JSON.stringify(today))

        return dailyPhoto
      } else {
        console.log('Error fetching pexel photo')
        // return FALLBACK_PHOTO
      }
    } catch (err) {
      console.log('Error fetching pexel server', err)
      // return FALLBACK_PHOTO
    }
  } else {
    return JSON.parse(dailyPhoto)
  }
}
