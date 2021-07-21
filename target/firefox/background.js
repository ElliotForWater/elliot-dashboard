function openNewTab() {
  browser.tabs.create({})
}

// Extension install event - open tab on install and updates
chrome.runtime.onInstalled.addListener((details) => {
  if (details?.reason === 'install' || details?.reason === 'update') {
    openNewTab()
  }
})

// Browser action click event - open tab on extension icon's click
browser.browserAction.onClicked.addListener(() => {
  console.log('click on toolbar icon')
  openNewTab()
})

// Send event to website for "add to browser button
chrome.runtime.onMessage.addListener(async (req, sender, sendResponse) => {
  if (req.contentScriptQuery === 'searchValue') {
    const url = `https://suggest.finditnowonline.com/SuggestionFeed/Suggestion?format=jsonp&gd=SY1002042&q=${req.value}`
    try {
      const res = await fetch(url)
      if (res) {
        const data = await res.json()
        chrome.runtime.sendMessage({ target: 'background-firefox', data })
      } else {
        console.log('error fetching')
      }
    } catch (err) {
      console.log(`Failing to fetch suggestion: ${err}`)
    }
    return true //respond async
  }
})
