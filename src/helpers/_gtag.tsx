export const GA_TRACKING_ID = 'UA-62300852-1' // This is your GA Tracking ID

interface eventTypeCheck {
  action: string
  category: string
  label: string
  value: string
}

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (title: string, location: string, url: string) => {
  window.gtag('config', GA_TRACKING_ID, {
    page_title: title,
    page_location: location,
    page_path: url,
  })
}

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = ({ action, category, label, value }: eventTypeCheck) => {
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  })
}
