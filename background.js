/*global chrome*/

// Tangani pesan dari content script
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  console.log(message)
    if (message.type === 'inputChanged') {
      console.log('Test saya', message.value);
    }
  });
  