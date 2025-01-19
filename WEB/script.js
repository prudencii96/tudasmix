// Kvízek kérdései és helyes válaszai
const quizzes = {
    quiz1: {
        answers: { választott: "Jupiter" } // Kvíz 1 helyes válaszai
    },
    quiz2: {
        answers: { választott: "896" } // Kvíz 2 helyes válaszai
    },
    quiz3: {
        answers: { választott: "6" } // Kvíz 1 helyes válaszai
    }
};

// Gomb eseményfigyelő
document.querySelectorAll('.submit-btn').forEach(button => {
    button.addEventListener('click', function () {
        const quizId = this.getAttribute('data-quiz'); // Azonosító (quiz1 vagy quiz2)
        const quizForm = document.getElementById(`${quizId}-form`);
        if (!quizForm) {
            console.error(`Nem található az űrlap: ${quizId}-form`);
            return;
        }

        const userAnswers = new FormData(quizForm);
        const correctAnswers = quizzes[quizId]?.answers;

        if (!correctAnswers) {
            console.error(`Nem található válaszadat a kvízhez: ${quizId}`);
            return;
        }

        // Eredmény számítása
        let score = 0;
        let correctAnswerList = '';
        Object.entries(correctAnswers).forEach(([question, correctAnswer]) => {
            const userAnswer = userAnswers.get(question) || "Nem válaszolt"; // Ha nincs válasz
            if (userAnswer === correctAnswer) {
                score++;
            }
            correctAnswerList += `
                <li>
                    <strong>${question}</strong>: 
                    <span style="color: ${userAnswer === correctAnswer ? 'green' : 'red'};">
                        ${userAnswer}
                    </span> (Helyes: ${correctAnswer})
                </li>`;
        });

        // Eredmény megjelenítése
        const resultDiv = document.getElementById(`${quizId}-result`);
        if (resultDiv) {
            resultDiv.innerHTML = `
                <p><strong>Helyes válaszok száma:</strong> ${score} / ${Object.keys(correctAnswers).length}</p>
                <ul>${correctAnswerList}</ul>`;
            resultDiv.style.display = 'block';
        } else {
            console.error(`Nem található az eredmény megjelenítő div: ${quizId}-result`);
        }
    });
});
