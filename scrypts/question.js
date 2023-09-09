let correctAnswer = "";
let selectedAnswer = null;
let questionNumber = 1;
let currentQuestion = document.getElementById(`${questionNumber}`);
let lessonId = null;
let nextLessonId = null;
let userID = null;
let currentUserData = null;
let currentLessonData = null;

document.addEventListener("DOMContentLoaded", function () {
  const currentLessonDataJSON = localStorage.getItem("currentLessonData");
  if (currentLessonDataJSON) {
    currentLessonData = JSON.parse(currentLessonDataJSON);
    lessonId = currentLessonData.lesson_id;
    currentUserData = JSON.parse(localStorage.getItem("userData"));
    userID = currentUserData.user_id;
    nextLessonId = currentLessonData.next;
    fetchQuestion();
  }
});

document.querySelector(".next-button").addEventListener("click", function () {
  if (selectedAnswer === correctAnswer) {
    questionNumber = questionNumber + 1;
    currentQuestion.style.backgroundColor = "#28a745";
    currentQuestion = document.getElementById(`${questionNumber}`);
    clearSelectedAnswers();
    fetchQuestion();
  } else {
    alert("Niepoprawna odpowiedź. Spróbuj ponownie później.");
    window.location.href = "base.html";
  }
});

function fetchQuestion() {
  if (questionNumber < 4) {
    fetch("http://127.0.0.1:5000/question", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        lesson_id: lessonId,
        question_num: questionNumber,
      }),
    })
      .then(handleResponse)
      .catch((error) => {
        console.error("Error:", error);
      });
  } else {
    addQuizResult(userID, nextLessonId);
    sendNotification(userID, currentLessonData.title);
  }
}

function handleResponse(response) {
  if (response.status === 200) {
    response.json().then((data) => {
      const answerA = document.getElementById("A");
      const answerB = document.getElementById("B");
      const answerC = document.getElementById("C");
      const answerD = document.getElementById("D");
      const question = document.querySelector(".question");
      question.textContent = data.question;
      currentQuestion.style.backgroundColor = "#007bff";

      answerA.textContent = `A ${data.options[0]}`;
      answerB.textContent = `B ${data.options[1]}`;
      answerC.textContent = `C ${data.options[2]}`;
      answerD.textContent = `D ${data.options[3]}`;

      answerA.addEventListener("click", function () {
        clearSelectedAnswers();
        answerA.classList.add("selected");
        answerA.style.backgroundColor = "#28a745";
        selectedAnswer = 0;
      });

      answerB.addEventListener("click", function () {
        clearSelectedAnswers();
        answerB.classList.add("selected");
        answerB.style.backgroundColor = "#28a745";
        selectedAnswer = 1;
      });

      answerC.addEventListener("click", function () {
        clearSelectedAnswers();
        answerC.classList.add("selected");
        answerC.style.backgroundColor = "#28a745";
        selectedAnswer = 2;
      });

      answerD.addEventListener("click", function () {
        clearSelectedAnswers();
        answerD.classList.add("selected");
        answerD.style.backgroundColor = "#28a745";
        selectedAnswer = 3;
      });

      correctAnswer = data.correct_option;
    });
  } else {
    console.error("Error:", response.status);
    alert("Error: " + response.status);
  }
}

function clearSelectedAnswers() {
  const answerOptions = document.querySelectorAll(".answer-option");
  answerOptions.forEach((option) => {
    option.classList.remove("selected");
    option.style.backgroundColor = "#007bff";
  });
}

function addQuizResult(user_id, lesson_id) {
  const apiUrl = "http://127.0.0.1:5000/add-result";

  const data = {
    user_id: user_id,
    lesson_id: lesson_id,
  };

  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  fetch(apiUrl, requestOptions)
    .then((response) => {
      if (response.status === 201) {
        console.log("Quiz result added successfully");
      } else if (response.status === 404) {
        console.error("User or lesson not found");
      } else {
        console.error("Error:", response.status);
      }
      currentUserData.last_accessed = nextLessonId;
      localStorage.setItem("userData", JSON.stringify(currentUserData));
      window.location.href = "base.html";
      updateLastAccessed(userID, nextLessonId);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
  alert(
    "Udało ci się odpowiedzieć na wszystkie pytania, teraz możesz przejść do kolejnego etapu"
  );
}

function updateLastAccessed(user_id, lesson_id) {
  const apiUrl = "http://127.0.0.1:5000/update-last-accessed";

  const data = {
    user_id: user_id,
    lesson_id: lesson_id,
  };

  const requestOptions = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  fetch(apiUrl, requestOptions)
    .then((response) => {
      if (response.status === 200) {
        console.log("Last accessed updated successfully");
      } else if (response.status === 404) {
        console.error("User not found");
      } else {
        console.error("Error:", response.status);
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function sendNotification(user_id, message) {
  const apiUrl = "http://127.0.0.1:5000/add-notification";

  const requestData = {
    user_id: user_id,
    message: `Gratulacje, udało ci się odpowiedzieć poprawnie na wszystkie pytania z ${message}, teraz możesz przejść do kolejnego poziomu`,
  };

  fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestData),
  })
    .then((response) => {
      if (response.ok) {
        console.log("Wiadomość została pomyślnie wysłana.");
      } else {
        response.json().then((data) => {
          console.error("Błąd wysyłania wiadomości:", data.message);
        });
      }
    })
    .catch((error) => {
      console.error("Wystąpił błąd podczas wysyłania wiadomości:", error);
    });
}
