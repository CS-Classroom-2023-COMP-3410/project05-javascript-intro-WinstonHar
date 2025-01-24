/**************************************************
 * 1. Define Questions
 **************************************************/
const questions = [
    {
      question: "Which planet is known as the Red Planet?",
      choices: ["Earth", "Mars", "Jupiter", "Venus"],
      correctIndex: 1, // "Mars"
    },
    {
      question: "Who wrote the play 'Romeo and Juliet'?",
      choices: ["William Shakespeare", "Mark Twain", "Charles Dickens", "Jane Austen"],
      correctIndex: 0, // "William Shakespeare"
    },
    {
      question: "Which gas is most abundant in the Earth's atmosphere?",
      choices: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"],
      correctIndex: 2, // "Nitrogen"
    },
    {
      question: "What is the largest mammal in the world?",
      choices: ["Elephant", "Blue Whale", "Giraffe", "Polar Bear"],
      correctIndex: 1, // "Blue Whale"
    },
  ];
  
  /**************************************************
   * 2. Select DOM Elements
   **************************************************/
  const quizForm           = document.getElementById("quizForm");
  const questionsContainer = document.getElementById("questionsContainer");
  const submitBtn          = document.getElementById("submitBtn");
  const resultsDiv         = document.getElementById("results");
  const scoreText          = document.getElementById("scoreText");
  const reviewBtn          = document.getElementById("reviewBtn");
  
  /**************************************************
   * 3. Generate Questions Dynamically
   **************************************************/
  function loadQuestions() {
    questionsContainer.innerHTML = ""; // clear old content if any
    questions.forEach((q, index) => {
      // Create a container for each question
      const questionBlock = document.createElement("div");
      questionBlock.classList.add("question-block");
  
      // Question text
      const qTitle = document.createElement("h3");
      qTitle.textContent = `Q${index + 1}. ${q.question}`;
      questionBlock.appendChild(qTitle);
  
      // Answers container
      const answersDiv = document.createElement("div");
      answersDiv.classList.add("answers");
  
      // Create radio inputs for each choice
      q.choices.forEach((choice, choiceIndex) => {
        const label = document.createElement("label");
        const radio = document.createElement("input");
        radio.type = "radio";
        radio.name = `question_${index}`;
        radio.value = choiceIndex;
        label.appendChild(radio);
        label.appendChild(document.createTextNode(" " + choice));
        answersDiv.appendChild(label);
      });
  
      questionBlock.appendChild(answersDiv);
      questionsContainer.appendChild(questionBlock);
    });
  }
  
  /**************************************************
   * 4. Handle Submit & Scoring
   **************************************************/
  function submitQuiz() {
    let score = 0;
  
    // Go through each question
    questions.forEach((q, questionIndex) => {
      // Check which option was selected
      const selected = quizForm[`question_${questionIndex}`];
      let userAnswer = -1; // default if nothing is selected
      if (selected) {
        for (let option of selected) {
          if (option.checked) {
            userAnswer = parseInt(option.value);
            break;
          }
        }
      }
      // Increment score if correct
      if (userAnswer === q.correctIndex) {
        score++;
      }
    });
  
    // Show results
    scoreText.textContent = `You scored ${score} out of ${questions.length}`;
    resultsDiv.classList.remove("hidden");
  
    // Disable further selections
    lockQuestions();
  }
  
  /**************************************************
   * 5. Provide Feedback & Review
   **************************************************/
  function lockQuestions() {
    // Disable all radio inputs so user cannot change after submit
    const radios = quizForm.querySelectorAll("input[type='radio']");
    radios.forEach((radio) => {
      radio.disabled = true;
    });
  }
  
  function reviewAnswers() {
    // Show correct & incorrect in the UI
    questions.forEach((q, questionIndex) => {
      const answerNodes = quizForm[`question_${questionIndex}`];
  
      // If the user never selected an answer, skip gracefully
      if (!answerNodes) return;
  
      // Mark each choice
      for (let i = 0; i < answerNodes.length; i++) {
        const radio = answerNodes[i];
        const label = radio.parentElement;
  
        // The correct answer
        if (i === q.correctIndex) {
          label.classList.add("correct-answer");
        }
        // If the user selected this but it's not correct
        if (radio.checked && i !== q.correctIndex) {
          label.classList.add("incorrect-answer");
        }
      }
    });
  }
  
  /**************************************************
   * 6. Event Listeners
   **************************************************/
  submitBtn.addEventListener("click", submitQuiz);
  reviewBtn.addEventListener("click", reviewAnswers);
  
  /**************************************************
   * 7. Initialize the Quiz
   **************************************************/
  window.addEventListener("load", () => {
    loadQuestions();
  });
  