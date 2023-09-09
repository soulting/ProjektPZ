document.addEventListener("DOMContentLoaded", function () {
  const userDataJSON = localStorage.getItem("userData");
  const userData = JSON.parse(userDataJSON);
  const currentPasswordInput = document.getElementById("current-password");
  const firstPasswordInput = document.getElementById("first-password");
  const secondPasswordInput = document.getElementById("second-password");
  const changePasswordButton = document.querySelector(".login-button");

  // Obsługa formularza po zatwierdzeniu
  const handleSubmit = (event) => {
    event.preventDefault();
    const currentPassword = currentPasswordInput.value;
    const firstPassword = firstPasswordInput.value;
    const secondPassword = secondPasswordInput.value;

    // Sprawdź, czy hasła są takie same
    if (firstPassword !== secondPassword) {
      alert("Hasła nie pasują do siebie. Proszę wprowadzić identyczne hasła.");
      return;
    }

    // Wyślij zapytanie do serwera w celu zmiany hasła
    fetch("http://127.0.0.1:5000/change-password", {
      method: "PUT", // Zmieniamy na PUT
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: userData.user_id,
        current_password: currentPassword,
        new_password: firstPassword,
      }),
    })
      .then((response) => {
        if (response.ok) {
          alert("Hasło zostało pomyślnie zmienione.");

          window.location.href = "/login.html";
        } else {
          return response.json();
        }
      })
      .then((data) => {
        if (data) {
          alert(`Błąd zmiany hasła: ${data.message}`);
        }
      })
      .catch((error) => {
        console.error("Błąd podczas zmiany hasła:", error);
        alert("Wystąpił błąd podczas zmiany hasła. Spróbuj ponownie później.");
      });
  };

  changePasswordButton.addEventListener("click", handleSubmit);
});
