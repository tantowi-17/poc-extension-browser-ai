// Ambil informasi input dari penyimpanan lokal (contoh: dari background.js)
chrome.storage.local.get(['lastInput'], function(result) {
  document.getElementById('inputValue').innerText = result.lastInput || 'No input captured yet.';
});
