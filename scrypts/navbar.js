document.addEventListener("DOMContentLoaded", function () {
  const userDataJSON = localStorage.getItem("userData");
  const userData = JSON.parse(userDataJSON);
  const myChannelIcon = document.querySelector(".my-channel-icon");
  myChannelIcon.src = `profil/${userData.username.charAt(0)}.png`;
  const menuContainer = document.querySelector(".menu-container");
  const userMenu = document.querySelector(".user-menu");
  const logoutButton = document.querySelector(".wyloguj");
  const settingsButton = document.querySelector(".ustawienia");
  const menuArrow = document.querySelector(".menu-arrow");
  const notificationsContainer = document.querySelector(
    ".notifications-container"
  );
  const messagesContainer = document.querySelector(".messages-container");
  messagesContainer.style.display = "none";
  const randomNumber = Math.floor(Math.random() * (7 - 1 + 1)) + 1;
  const bubble = document.querySelector("#bubble");
  bubble.src = `icons/${randomNumber}.png`;

  settingsButton.addEventListener("click", function () {
    window.location.href = "cockpit.html";
  });

  logoutButton.addEventListener("click", function () {
    localStorage.removeItem("userData");

    window.location.href = "login.html";
  });

  menuContainer.addEventListener("click", function () {
    if (getComputedStyle(userMenu).display === "none") {
      userMenu.style.display = "block";
      messagesContainer.style.display = "none";
      menuArrow.src = "icons/upload.png";
    } else {
      userMenu.style.display = "none";
      menuArrow.src = "icons/download.png";
    }
  });

  notificationsContainer.addEventListener("click", function () {
    if (getComputedStyle(messagesContainer).display === "none") {
      messagesContainer.style.display = "block";
      userMenu.style.display = "none";
      menuArrow.src = "icons/download.png";
    } else {
      messagesContainer.style.display = "none";
    }
  });

  fetchNotifications(userData.user_id);
});

function fetchNotifications(userId) {
  const data = {
    user_id: userId,
  };

  fetch("http://127.0.0.1:5000/get-notifications", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((notifications) => {
      if (Array.isArray(notifications) && notifications.length > 0) {
        const notificationNumber = document.querySelector(
          ".notifications-number"
        );
        notificationNumber.textContent = notifications.length;

        const messagesList = document.querySelector(".messages-list");

        notifications.forEach((notification) => {
          const messageDiv = document.createElement("div");
          const messageTimeDiv = document.createElement("div");
          const messageContentDiv = document.createElement("div");
          messageDiv.classList.add("message");
          messageTimeDiv.classList.add("message-time");
          messageContentDiv.classList.add("message-content");

          const messageText = document.createElement("div");
          messageText.textContent = notification.message;

          const messageDate = document.createElement("div");
          messageDate.textContent = `Data wysłania: ${notification.date_sent}`;

          messageTimeDiv.appendChild(messageDate);
          messageContentDiv.appendChild(messageText);

          messageDiv.appendChild(messageTimeDiv);
          messageDiv.appendChild(messageContentDiv);

          messagesList.appendChild(messageDiv);
        });
      } else {
        console.log("Brak wiadomości.");
      }
    })
    .catch((error) => {
      console.error("Błąd:", error);
    });
}
