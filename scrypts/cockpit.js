document.addEventListener("DOMContentLoaded", function () {
  const userDataJSON = localStorage.getItem("userData");
  const userData = JSON.parse(userDataJSON);
  const lessonDataJSON = localStorage.getItem("currentLessonData");
  const lessonData = JSON.parse(lessonDataJSON);

  const usernameElement = document.querySelector(".user-info p:nth-child(2)");
  const emailElement = document.querySelector(".user-info p:nth-child(3)");
  const progressElement = document.querySelector(".user-info p:nth-child(4)");
  const lastLoginElement = document.querySelector(".user-info p:nth-child(5)");
  const creationDateElement = document.querySelector(
    ".user-info p:nth-child(6)"
  );

  usernameElement.textContent = `Username: ${userData.username}`;
  emailElement.textContent = `Email: ${userData.email}`;
  progressElement.textContent = `Postęp: ${userData.user_progress}`;
  lastLoginElement.textContent = `Ostatnie wejście: ${lessonData.title}`;
  creationDateElement.textContent = `Data utworzenia: ${userData.date_created}`;

  const changePasswordButton = document.querySelector(
    ".change-password-button"
  );
  const backButton = document.querySelector(".back-button");
  const logoutButton = document.querySelector(".logout-button");

  changePasswordButton.addEventListener("click", function () {
    window.location.href = "passwd.html";
  });

  backButton.addEventListener("click", function () {
    window.location.href = "base.html";
  });

  logoutButton.addEventListener("click", function () {
    localStorage.removeItem("userData");
    window.location.href = "login.html";
  });
});
