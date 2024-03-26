const threshold = 0.8;

const input = document.getElementById("text");
const output = document.getElementById("output");

let typingTimer;
const doneTypingInterval = 1000;

// Create the classify function
const classify = async (model, text) => {
    const sentences = [text];
    output.innerHTML = "Classifying...";
    let predictions = await model.classify(sentences);
    console.log(predictions)

    predictions = predictions.map(prediction => ({
        label: prediction["label"],
        match: prediction.results[0]["match"]
    }));
    return predictions.filter(p => p.match).map(p => p.label)
};

const main = async () => {
    const model = await toxicity.load(threshold);

    // Define function to classify text on input event
    const classifyOnInput = async () => {
        clearTimeout(typingTimer);
        typingTimer = setTimeout(async () => {
            const text = input.value;
            const predictions = await classify(model, text);
            if (predictions.length > 0) {
                output.innerHTML = "<p style='color:red;'>Your sentence is in the category (" + predictions + ")</p>"
            } else {
                output.innerHTML = "";
            }
        }, doneTypingInterval);
    };

    input.addEventListener('input', classifyOnInput);
};

main();
