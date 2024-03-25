const threshold = 0.8; // our minimum threshold

const input = document.getElementById("text");
const output = document.getElementById("output");

let typingTimer; // Timer identifier
const doneTypingInterval = 1000; // Time in milliseconds (1 second)

// Create the classify function
const classify = async (model, text) => {
  const sentences = [text]; // The model takes list as input
  output.innerHTML = "Classifying..."
  // I used model.predict instead of model.classify
  let predictions = await model.classify(sentences);
  console.log(predictions)

  predictions = predictions.map(prediction => ({
    label: prediction["label"],
    match: prediction.results[0]["match"]
  })) // Label is like "identity_threat", "toxicity"
  // match is whether the text matches the label
  return predictions.filter(p => p.match).map(p => p.label) // This gives us a list like ["identity_threat", "toxicity"]
}

const main = async () => {
  const model = await toxicity.load(threshold);
  
  // Define function to classify text on input event
  const classifyOnInput = async () => {
    clearTimeout(typingTimer); // Clear the timer on each input event
    typingTimer = setTimeout(async () => {
      const text = input.value;
      const predictions = await classify(model, text)
      if (predictions.length > 0) {
        output.innerHTML = "<p style='color:red;'>Your sentence is in the category ("+ predictions +")</p>"
      } else {
        output.innerHTML = "";
      }
    }, doneTypingInterval);
  }
  
  // Call classifyOnInput when input event occurs
  input.addEventListener('input', classifyOnInput);
}

main();
