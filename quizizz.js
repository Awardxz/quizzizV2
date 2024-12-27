
let answers1 = [];

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
    const answerElement = document.createElement('p')
    if (questionElement) {
        const currentQuestion = questionElement.textContent.trim();
        const matchingPair = answers1.find(pair => pair.question === currentQuestion);
        if (matchingPair) {
            console.log("Found question:", matchingPair.question);
            console.log("Answer:", matchingPair.answers);
            answerElement.textContent = matchingPair.answers;
            questionElement.append(answerElement)
        } else {
            console.log("Question found, but no matching answer in the array.");
        }
    } else {
        console.log("Question not found. Trying again...");
    }
    
    setTimeout(checkForQuestion, 2000);
}


fetchAnswers()
    .then(checkForQuestion)
    .catch(error => console.error(error));
