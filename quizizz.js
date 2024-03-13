
let answers1 = [];

async function fetchAnswers() {
    const code12 = document.querySelector('.room-code.header-item-container-sizing.animated.fadeIn.anim-300-duration').textContent
    const response = await fetch(`https://api.quizit.online/quizizz/answers?pin=${code12}`);
    const data = await response.json();

    if (data.message === "Ok" && data.data && data.data.answers) {
        answers1 = data.data.answers.map(answer => {
            const questionText = answer.question.text.replace(/<[^>]*>?/gm, '').trim(); // Remove HTML tags from question text
            const answerText = answer.answers[0].text.replace(/<[^>]*>?/gm, '').trim(); // Remove HTML tags from answer text
            return { question: questionText, answer: answerText };
        });
    } else {
        throw new Error("Error fetching answers: " + data.message);
    }
}


function checkForQuestion() {
    const questionElement = document.querySelector('.resizeable.gap-x-2.question-text-color.text-light');
    const answerElement = document.createElement('p')
    if (questionElement) {
        const currentQuestion = questionElement.textContent.trim();
        const matchingPair = answers1.find(pair => pair.question === currentQuestion);
        if (matchingPair) {
            console.log("Found question:", matchingPair.question);
            console.log("Answer:", matchingPair.answer);
            answerElement.textContent = matchingPair.answer;
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

