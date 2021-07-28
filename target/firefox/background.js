function openNewTab() {
  browser.tabs.create({})
}

// Extension install event - open tab on install and updates
browser.runtime.onInstalled.addListener((details) => {
  if (details?.reason === 'install' || details?.reason === 'update') {
    openNewTab()
  }
})

// Browser action click event - open tab on extension icon's click
browser.browserAction.onClicked.addListener(() => {
  openNewTab()
})

// Listen to messages
browser.runtime.onMessage.addListener(async (req, sender, sendResponse) => {
  const id = browser.runtime.id
  if (req.action === 'id' && req.value === id) {
    sendResponse({ id: id })
  }

  // Fetch search suggestion API
  if (req.contentScriptQuery === 'searchValue') {
    const url = `https://suggest.finditnowonline.com/SuggestionFeed/Suggestion?format=jsonp&gd=SY1002042&q=${req.value}`
    try {
      const res = await fetch(url)
      if (res) {
        const data = await res.json()
        browser.runtime.sendMessage({ target: 'fetch-suggestion', data })
      } else {
        console.log('error fetching')
      }
    } catch (err) {
      console.log(`Failing to fetch suggestion: ${err}`)
    }
    return true //respond async
  }
})
