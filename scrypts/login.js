function handleLogin(event) {
  event.preventDefault();

  const email = document.querySelector(".login-input[type='email']").value;
  const password = document.querySelector(
    ".login-input[type='password']"
  ).value;

  const data = {
    email: email,
    password: password,
  };

  fetchLogin(data);
}

function fetchLogin(data) {
  fetch("http://127.0.0.1:5000/login", {
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
      localStorage.setItem("userData", JSON.stringify(data));
      window.location.href = "base.html";
    });
  } else {
    console.error("Error:", response.status);
    alert("Error: " + response.status);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form");
  form.addEventListener("submit", handleLogin);

  const signUpButton = document.querySelector(".login-sign-up-button");
  signUpButton.addEventListener("click", function () {
    window.location.href = "signup.html";
  });
});
