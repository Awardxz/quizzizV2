let answers1 = [];
let lastAnsweredQuestion = ""; // Track the last question we've answered

async function fetchAnswers() {
    const code12 = document.querySelector('button.box-border:nth-child(1)').textContent
    const code = code12.replace(/\s+/g, '');
    const response = await fetch(`http://localhost:3000/api/code?code=${code}`,
        {
            redirect: 'follow',
            method : "POST",
        }
    );
    const data = await response.json();

    answers1 = data.answers;
    return data.answers;
}

function checkForQuestion() {
    const questionElement = document.querySelector('.resizeable.gap-x-2.question-text-color.text-light');
    
    if (questionElement) {
        const currentQuestion = questionElement.textContent.trim();
        
        // So we don't answer the same question multiple times
        if (currentQuestion !== lastAnsweredQuestion) {
            const matchingPair = answers1.find(pair => pair.question === currentQuestion);
            
            if (matchingPair) {
                console.log("Found question:", matchingPair.question);
                console.log("Answer:", matchingPair.answers);
                
                // Find the buttons grid
                const optionsGrid = document.querySelector('div.options-grid.flex.w-full.h-full.gap-3');
                if (optionsGrid) {
                    // Find all buttons 
                    const optionButtons = optionsGrid.querySelectorAll('button');
                    
                    // Find the button containing the answer
                    for (const button of optionButtons) {
                        const buttonText = button.textContent.trim();
                        const answerText = matchingPair.answers
                        
                        if (buttonText === answerText || buttonText.includes(answerText)) {
                            console.log("Found answer button. Clicking...");
                            button.click();
                            lastAnsweredQuestion = currentQuestion; // Remember we've answered this question
                            break;
                        }
                    }
                } else {
                    console.log("Options grid not found");
                }
            } else {
                console.log("Question found, but no matching answer in the array.");
            }
        } else {
            console.log("Already answered this question, waiting for next one...");
        }
    } else {
        console.log("Question not found. Trying again...");
        // Reset the lastAnsweredQuestion when no question is visible
        lastAnsweredQuestion = "";
    }
    
    setTimeout(checkForQuestion, 2000);
}

fetchAnswers()
    .then(checkForQuestion)
    .catch(error => console.error(error));
