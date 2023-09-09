const prevButton = document.querySelector(".prev-button");
const nextButton = document.querySelector(".next-button");
const quizButton = document.querySelector(".quiz-button");

function fetchLesson(lessondId) {
  const data = {
    lesson_id: lessondId,
  };
  fetch("http://127.0.0.1:5000/lesson", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then(handleResponse)
    .catch((error) => {
      console.error("Error:", error);
    });
}

function handleResponse(response) {
  if (response.status === 200) {
    response.json().then((data) => {
      localStorage.setItem("currentLessonData", JSON.stringify(data));
      document.querySelector("main").innerHTML = data.content;
    });
  } else {
    console.error("Error:", response.status);
    alert("Error: " + response.status);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const userDataJSON = localStorage.getItem("userData");
  const userData = JSON.parse(userDataJSON);
  const myChannelIcon = document.querySelector(".my-channel-icon");
  myChannelIcon.src = `profil/${userData.username.charAt(0)}.png`;

  const lessonLinks = document.querySelectorAll(".sidebar-link-lesson");
  lessonLinks.forEach((lessonLink, index) => {
    lessonLink.addEventListener("click", () => {
      if (index === 0) {
        fetchLesson("09cfd59f-e3f7-41bf-a0f4-9331294e5274");
      } else if (index === 1) {
        fetchLesson("45eea461-f7ca-42fb-971d-f276f3298e9e");
      } else if (index === 2) {
        fetchLesson("eb43c440-d000-459c-8fad-b806ae8cd511");
      } else if (index === 3) {
        fetchLesson("329f3f0f-314a-49f5-b27d-7cfb90193b43");
      } else if (index === 4) {
        fetchLesson("5250beca-b706-4aa3-a62c-620e94c1b752");
      }
    });
  });

  fetchLesson(userData.last_accessed);

  quizButton.addEventListener("click", function () {
    window.location.href = "question.html";
  });

  prevButton.addEventListener("click", function () {
    const currentLessonData = JSON.parse(
      localStorage.getItem("currentLessonData")
    );
    const prevLessonId = currentLessonData.prev;
    fetchLesson(prevLessonId);
  });

  nextButton.addEventListener("click", function () {
    const currentLessonData = JSON.parse(
      localStorage.getItem("currentLessonData")
    );
    const nextLessonId = currentLessonData.next;
    fetchLesson(nextLessonId);
  });
});
