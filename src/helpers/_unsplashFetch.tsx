export const fetchRandomPhoto = async function () {
  const url = `${process.env.UNSPLASH_API_URL}/photos/random/`
  const params = new URLSearchParams(`collections=${process.env.UNSPLASH_COLLECTION_ID}`)
  const headers = new Headers({
    Authorization: `Client-ID ${process.env.UNSPLASH_API_KEY}`,
  })
  const today = new Date().toLocaleDateString()
  let dailyPhoto = localStorage.getItem('dailyPhoto')
  const savedPhotoDate = localStorage.getItem('savedPhotoDate')
  const isNewDay = savedPhotoDate !== JSON.stringify(today)

  if (!dailyPhoto || isNewDay) {
    try {
      const res = await fetch(`${url}?${params}`, { headers })

      if (res.ok) {
        dailyPhoto = await res.json()
        localStorage.setItem('dailyPhoto', JSON.stringify(dailyPhoto))
        localStorage.setItem('savedPhotoDate', JSON.stringify(today))

        return dailyPhoto
      } else {
        // todo: grab backup photos
        console.log('Error fetching 400')
      }
    } catch (err) {
      // todo: grab backup photos
      console.log('Error server', err)
    }
  } else {
    return JSON.parse(dailyPhoto)
  }
}
