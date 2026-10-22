// This quiz uses an array of question objects so the content is easy to update.
const quizData = [
  {
    question: "What does 'la mochila' mean?",
    options: ["bag", "backpack", "book", "teacher"],
    answer: "backpack",
    explanation: "Correct! 'Mochila' is a backpack in Spanish."
  },
  {
    question: "Which one is the correct translation of 'the school'?",
    options: ["el escuela", "la escuela", "el libro", "la mochila"],
    answer: "la escuela",
    explanation: "Correct! 'Escuela' is feminine, so we use 'la'."
  },
  {
    question: "What does 'el libro' mean?",
    options: ["pen", "door", "book", "friend"],
    answer: "book",
    explanation: "Correct! 'Libro' means book."
  },
  {
    question: "Choose the correct phrase for 'the teacher' if the teacher is female.",
    options: ["el profesor", "la profesora", "el amigo", "la mesa"],
    answer: "la profesora",
    explanation: "Correct! 'Profesora' is feminine, so it takes 'la'."
  },
  {
    question: "Which word means 'friend' in Spanish?",
    options: ["libro", "amigo", "casa", "escuela"],
    answer: "amigo",
    explanation: "Correct! 'Amigo' means friend."
  }
];

const quizContainer = document.getElementById("quiz-container");
const resultBox = document.getElementById("result-box");

let score = 0;
let answeredCount = 0;

// Render each question into the page.
function renderQuiz() {
  quizContainer.innerHTML = "";

  quizData.forEach((item, index) => {
    const questionCard = document.createElement("article");
    questionCard.className = "question-card";

    const questionTitle = document.createElement("h3");
    questionTitle.textContent = `${index + 1}. ${item.question}`;
    questionCard.appendChild(questionTitle);

    const optionsWrap = document.createElement("div");
    optionsWrap.className = "answer-list";

    item.options.forEach((option) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "option-btn";
      button.textContent = option;

      // When a user clicks an answer, we check if it is correct and show feedback.
      button.addEventListener("click", () => {
        const allButtons = Array.from(optionsWrap.querySelectorAll("button"));
        allButtons.forEach((btn) => {
          btn.disabled = true;
        });

        const isCorrect = option === item.answer;

        if (isCorrect) {
          score += 1;
          button.classList.add("correct");
        } else {
          button.classList.add("wrong");
          const correctButton = allButtons.find((btn) => btn.textContent === item.answer);
          if (correctButton) {
            correctButton.classList.add("correct");
          }
        }

        const feedback = document.createElement("p");
        feedback.className = "feedback";
        feedback.textContent = isCorrect
          ? `✅ Correct! ${item.explanation}`
          : `❌ Not quite. ${item.explanation}`;

        questionCard.appendChild(feedback);
        answeredCount += 1;

        if (answeredCount === quizData.length) {
          showResults();
        }
      });

      optionsWrap.appendChild(button);
    });

    questionCard.appendChild(optionsWrap);
    quizContainer.appendChild(questionCard);
  });
}

// Show the final score after all questions have been answered.
function showResults() {
  resultBox.classList.remove("hidden");
  resultBox.innerHTML = `
    <p>You scored ${score} out of ${quizData.length}.</p>
    ${
      score === quizData.length
        ? "<p>Excellent work! You really know your Spanish vocabulary.</p>"
        : "<p>Nice try! Review the examples and have another go.</p>"
    }
    <button class="restart-btn" type="button">Try again</button>
  `;

  const restartButton = resultBox.querySelector(".restart-btn");
  restartButton.addEventListener("click", () => {
    score = 0;
    answeredCount = 0;
    resultBox.classList.add("hidden");
    renderQuiz();
  });
}

// Start the quiz when the page loads.
renderQuiz();
