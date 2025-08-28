document.addEventListener('DOMContentLoaded', function() {
    // Quiz questions and answers
    const quizData = [
        {
            question: "What is the first law of thermodynamics?",
            answer: "energy cannot be created or destroyed"
        },
        {
            question: "What does the second law of thermodynamics introduce?",
            answer: "entropy"
        },
        {
            question: "What is the measurement of energy in a thermodynamic system called?",
            answer: "enthalpy"
        }
    ];
    
    // DOM elements
    const questionElement = document.getElementById('question');
    const scoreElement = document.getElementById('score');
    const answerInput = document.getElementById('user-answer');
    const submitButton = document.getElementById('submit-answer');
    const feedbackPopup = document.getElementById('feedback-popup');
    const feedbackIcon = document.getElementById('feedback-icon');
    const feedbackText = document.getElementById('feedback-text');
    
    // Quiz state
    let currentQuestion = 0;
    let score = 0;
    
    // Load question
    function loadQuestion() {
        questionElement.textContent = quizData[currentQuestion].question;
        answerInput.value = '';
    }
    
    // Show feedback
    function showFeedback(isCorrect) {
        if (isCorrect) {
            feedbackIcon.innerHTML = '<i class="fas fa-check-circle"></i>';
            feedbackText.textContent = 'Yes, you are correct!';
            feedbackPopup.className = 'feedback-popup show correct';
        } else {
            feedbackIcon.innerHTML = '<i class="fas fa-times-circle"></i>';
            feedbackText.textContent = 'Incorrect, try again!';
            feedbackPopup.className = 'feedback-popup show incorrect';
        }
        
        // Show popup
        feedbackPopup.style.bottom = '0';
        
        // Hide popup after 3 seconds
        setTimeout(() => {
            feedbackPopup.style.bottom = '-100px';
        }, 3000);
    }
    
    // Check answer
    function checkAnswer() {
        const userAnswer = answerInput.value.trim().toLowerCase();
        const correctAnswer = quizData[currentQuestion].answer.toLowerCase();
        
        if (userAnswer.includes(correctAnswer)) {
            score++;
            scoreElement.textContent = score;
            showFeedback(true);
        } else {
            showFeedback(false);
        }
        
        // Move to next question or end quiz
        currentQuestion++;
        if (currentQuestion < quizData.length) {
            setTimeout(loadQuestion, 1000);
        } else {
            setTimeout(() => {
                alert(`Quiz completed! Your score: ${score}/${quizData.length}`);
                // Here you would typically redirect or reset the quiz
                currentQuestion = 0;
                score = 0;
                scoreElement.textContent = score;
                loadQuestion();
            }, 1000);
        }
    }
    
    // Event listeners
    submitButton.addEventListener('click', checkAnswer);
    answerInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') checkAnswer();
    });
    
    // Initialize quiz
    loadQuestion();
});