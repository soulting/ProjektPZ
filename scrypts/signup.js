document.addEventListener("DOMContentLoaded", function () {
  const registrationForm = document.getElementById("registration-form");

  registrationForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const formData = new FormData(registrationForm);

    const userData = {
      username: formData.get("username"),
      email: formData.get("email"),
      password: formData.get("password"),
    };

    fetch("http://127.0.0.1:5000/create-user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then(handleResponse)
      .catch((error) => {
        console.error("Error:", error);
      });
  });

  function handleResponse(response) {
    if (response.status === 201) {
      alert("Rejestracja zakończona sukcesem! Możesz się zalogować.");
      window.location.href = "login.html";
    } else if (response.status === 409) {
      alert("Podany email już istnieje w bazie danych.");
    } else {
      console.error("Error:", response.status);
      alert("Wystąpił błąd podczas rejestracji.");
    }
  }
});
