
const extensionInterface = {
  target: 'content-script-ff',
  message: 'installed'
}

// https://stackoverflow.com/questions/46727370/how-to-check-if-a-firefox-webextension-is-installed-or-not-with-page-javascript
window.wrappedJSObject.extensionInterface = cloneInto(extensionInterface, window, {cloneFunctions: true});
