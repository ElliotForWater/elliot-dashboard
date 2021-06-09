function openNewTab() {
  chrome.tabs.create({
    url: 'chrome://newtab',
  })
}

// Extension install event - open tab on install and updates
chrome.runtime.onInstalled.addListener(function (details) {
  if (details?.reason && details.reason == 'install') {
    openNewTab()
  }
})

// Browser action click event - open tab on extension icon's click
chrome.browserAction.onClicked.addListener(function () {
  openNewTab()
})

// Send event to website for "add to browser button
chrome.runtime.onMessageExternal.addListener(function (
  msg,
  sender,
  sendResponse
) {
  var id = chrome.runtime.id
  if (msg.action == 'id' && msg.value == id) {
    sendResponse({ id: id })
  }
})
