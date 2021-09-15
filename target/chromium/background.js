const CHROME_ID = 'ddfnnfelkcabbeebchaegpcdcmdekoim'

function openNewTab() {
  chrome.tabs.create({
    url: 'chrome://newtab',
  })
}

// Extension install event - open tab on install and updates
chrome.runtime.onInstalled.addListener((details) => {
  if (details?.reason === 'install' || details?.reason === 'update') {
    console.log('insatlled backgroundjs')
    chrome.runtime.sendMessage({ target: 'onInstallAndUpdate', data: 'hello' })
    openNewTab()
  }
})

// Browser action click event - open tab on extension icon's click
chrome.action.onClicked.addListener(() => {
  openNewTab()
})

// Very first startup of a new Google Profile
chrome.runtime.onStartup.addListener(async (req, sender, sendResponse) => {
  console.log('on startup')
})

// Listening to message frohttps://twitter.com/ghostm web app
chrome.runtime.onMessageExternal.addListener(
  function(request, sender, sendResponse) {
      if (request.message === CHROME_ID) {
        sendResponse({ message: 'extension_installed' });
      }
  });

// Listen to messages
chrome.runtime.onMessage.addListener(async (req, sender, sendResponse) => {
  // Fetch search suggestion API
  if (req.contentScriptQuery === 'searchValue') {
    const url = `https://suggest.finditnowonline.com/SuggestionFeed/Suggestion?format=jsonp&gd=SY1002042&q=${req.value}`
    try {
      const res = await fetch(url)
      if (res) {
        const data = await res.json()
        chrome.runtime.sendMessage({ target: 'fetch-suggestion', data })
      } else {
        console.log('error fetching')
      }
    } catch (err) {
      console.log(`Failing to fetch suggestion: ${err}`)
    }
    return true //respond async
  }
})
