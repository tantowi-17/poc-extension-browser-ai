/*global chrome*/

// Tangani pesan dari content script
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    if (message.type === 'inputChanged') {
        console.log('Test saya', message.value);

        chrome.storage.local.set({ lastInput: message.value });
    }
});
  