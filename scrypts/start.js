const loginButton = document.querySelector(".login-button");
const signupButton = document.querySelector(".signup-button");
const startButton = document.querySelector(".start-button");

function redirectToLoginPage() {
  window.location.href = "login.html";
}

function redirectToSignupPage() {
  window.location.href = "signup.html";
}

loginButton.addEventListener("click", redirectToLoginPage);
signupButton.addEventListener("click", redirectToSignupPage);
startButton.addEventListener("click", redirectToSignupPage);
