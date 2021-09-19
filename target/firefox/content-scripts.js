const extensionInterface = {
  target: 'content-script-ff',
  message: 'installed'
}

window.wrappedJSObject.extensionInterface = cloneInto(extensionInterface, window, {cloneFunctions: true});
