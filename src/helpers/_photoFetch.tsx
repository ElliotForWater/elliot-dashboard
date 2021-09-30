import { PEXEL_FALLBACK_PHOTO } from '../../__mocks__/pexelPickMock.js'

export const fetchRandomPhoto = async function () {
  const urlCollection = `${process.env.PEXELS_API_URL}/collections/${process.env.PEXELS_COLLECTION_ID}?per_page=40`

  const headers = new Headers({
    Authorization: `${process.env.PEXELS_API_KEY}`,
  })

  const date = new Date()
  const today = date.toLocaleDateString()
  const todayNumber = Number(date.toLocaleDateString('en-GB', { day: 'numeric' }))
  let dailyPhoto = localStorage.getItem('dailyPhoto')
  const savedPhotoDate = localStorage.getItem('savedPhotoDate')
  const isNewDay = savedPhotoDate !== JSON.stringify(today)

  if (!dailyPhoto || dailyPhoto === 'undefined' || isNewDay) {
    try {
      const res = await fetch(`${urlCollection}`, { headers })
      console.log({ res })

      if (res.ok) {
        const photos = await res.json()
        dailyPhoto = photos.media[todayNumber - 1]
        localStorage.setItem('dailyPhoto', JSON.stringify(dailyPhoto))
        localStorage.setItem('savedPhotoDate', JSON.stringify(today))

        return dailyPhoto
      } else {
        console.log('Error fetching pexel photo')
        return PEXEL_FALLBACK_PHOTO
      }
    } catch (err) {
      console.log('Error fetching pexel server', err)
      return PEXEL_FALLBACK_PHOTO
    }
  } else {
    return JSON.parse(dailyPhoto)
  }
}
