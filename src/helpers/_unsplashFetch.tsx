import rawFallbackPic from '../images/fallback_unsplash/unsplash_fallback_raw.jpg'
import fullFallbackPic from '../images/fallback_unsplash/unsplash_fallback_full.jpg'
import regularFallbackPic from '../images/fallback_unsplash/unsplash_fallback_regular.jpg'
import smallFallbackPic from '../images/fallback_unsplash/unsplash_fallback_small.jpg'

/* eslint-disable camelcase */
const FALLBACK_PHOTO = {
  id: 'xWOTojs1eg4',
  created_at: '2018-08-01T20:00:38-04:00',
  updated_at: '2021-09-09T11:05:35-04:00',
  promoted_at: null,
  width: 4676,
  height: 2630,
  color: '#0c2626',
  blur_hash: 'L7434JkWDNV@Z~adkDkDI9ae%gj?',
  description: 'Water drop',
  alt_description: 'water drops on water base',
  urls: {
    raw: rawFallbackPic,
    full: fullFallbackPic,
    regular: regularFallbackPic,
    small: smallFallbackPic,
    thumb: smallFallbackPic,
  },
  links: {
    self: 'https://api.unsplash.com/photos/xWOTojs1eg4',
    html: 'https://unsplash.com/photos/xWOTojs1eg4',
    download: 'https://unsplash.com/photos/xWOTojs1eg4/download',
    download_location:
      'https://api.unsplash.com/photos/xWOTojs1eg4/download?ixid=MnwyNDE2MTl8MHwxfHJhbmRvbXx8fHx8fHx8fDE2MzEyNjY4MTA',
  },
  categories: [],
  likes: 290,
  liked_by_user: false,
  current_user_collections: [],
  sponsorship: null,
  topic_submissions: {},
  user: {
    id: 'Vnlncx_PRi4',
    updated_at: '2021-09-09T05:43:30-04:00',
    username: 'amadejtauses',
    name: 'Amadej Tauses',
    first_name: 'Amadej',
    last_name: 'Tauses',
    twitter_username: null,
    portfolio_url: 'https://amadejs-portfolio-starter.webflow.io',
    bio: null,
    location: 'Slovenia',
    links: {
      self: 'https://api.unsplash.com/users/amadejtauses',
      html: 'https://unsplash.com/@amadejtauses',
      photos: 'https://api.unsplash.com/users/amadejtauses/photos',
      likes: 'https://api.unsplash.com/users/amadejtauses/likes',
      portfolio: 'https://api.unsplash.com/users/amadejtauses/portfolio',
      following: 'https://api.unsplash.com/users/amadejtauses/following',
      followers: 'https://api.unsplash.com/users/amadejtauses/followers',
    },
    profile_image: {
      small:
        'https://images.unsplash.com/profile-1545313812648-0d4134d355c5?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=32&w=32',
      medium:
        'https://images.unsplash.com/profile-1545313812648-0d4134d355c5?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=64&w=64',
      large:
        'https://images.unsplash.com/profile-1545313812648-0d4134d355c5?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=128&w=128',
    },
    instagram_username: 'amadejtauses',
    total_collections: 1,
    total_likes: 65,
    total_photos: 28,
    accepted_tos: true,
    for_hire: true,
    social: {
      instagram_username: 'amadejtauses',
      portfolio_url: 'https://amadejs-portfolio-starter.webflow.io',
      twitter_username: null,
      paypal_email: null,
    },
  },
  exif: {
    make: 'Canon',
    model: 'Canon EOS 650D',
    exposure_time: '1/2500',
    aperture: '5.6',
    focal_length: '208.0',
    iso: 400,
  },
  location: {
    title: 'Slovenia',
    name: 'Slovenia',
    city: null,
    country: 'Slovenia',
    position: {
      latitude: 46.151241,
      longitude: 14.995463,
    },
  },
  views: 1456189,
  downloads: 19705,
}

/* eslint-enable camelcase */

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
        console.log('Error fetching unsplash photo')
        return FALLBACK_PHOTO
      }
    } catch (err) {
      console.log('Error fetching unsplash server', err)
      return FALLBACK_PHOTO
    }
  } else {
    return JSON.parse(dailyPhoto)
  }
}
