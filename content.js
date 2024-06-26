/*global chrome*/

document.addEventListener('input', function(event) {
  if (event.target.tagName.toLowerCase() === 'input' || event.target.tagName.toLowerCase() === 'textarea') {
      var inputValue = event.target.value;
      console.log('Input field value changed:', inputValue);
      var inputFeedback = document.getElementById('inputFeedback');
      if (!inputFeedback) {
          inputFeedback = document.createElement('div');
          inputFeedback.id = 'inputFeedback';
          event.target.parentNode.appendChild(inputFeedback);
      }
      inputFeedback.innerText = inputValue;
      chrome.runtime.sendMessage({ type: 'inputChanged', value: inputValue });
  }
});
