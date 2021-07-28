window.postMessage(
  {
    target: 'content-script-ff',
    message: 'installed',
  },
  '*'
)
