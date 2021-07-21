export const fetchCollectionPhotos = async function () {
  const url = `${process.env.UNSPLASH_API_URL}/photos/random/`
  const params = new URLSearchParams(`collections=${process.env.UNSPLASH_COLLECTION_ID}`)
  const headers = new Headers({
    Authorization: `Client-ID ${process.env.UNSPLASH_API_KEY}`,
  })

  try {
    const res = await fetch(`${url}?${params}`, { headers })

    if (res.ok) {
      const photo = await res.json()
      return photo
    } else {
      // todo: grab backup photos
      console.log('Error fetching 400')
    }
  } catch (err) {
    // todo: grab backup photos
    console.log('Error server', err)
  }
}
