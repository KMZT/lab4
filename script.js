
const usersContainer = document.getElementById("users");
const status = document.getElementById("status");
const loadBtn = document.getElementById("loadBtn");

async function loadUsers() {
    usersContainer.innerHTML = "";
    status.textContent = "Загрузка данных...";
    loadBtn.disabled = true;

    try {
        const response = await fetch(
            "https://randomuser.me/api/?results=8"
        );

        if (!response.ok) {
            throw new Error("Ошибка HTTP: " + response.status);
        }

        const data = await response.json();

        const users = data.results;

        users.forEach(user => {
            const card = document.createElement("div");
            card.className = "user-card";

            card.innerHTML = `
                <img src="${user.picture.large}" alt="Фото пользователя">
                <h2>${user.name.first} ${user.name.last}</h2>
                <p><strong>Email:</strong> ${user.email}</p>
                <p><strong>Страна:</strong> ${user.location.country}</p>
                <p><strong>Город:</strong> ${user.location.city}</p>
            `;

            usersContainer.appendChild(card);
        });

        status.textContent = `Загружено пользователей: ${users.length}`;

    } catch (error) {
        status.textContent = "Не удалось загрузить данные: " + error.message;
    } finally {
        loadBtn.disabled = false;
    }
}

loadBtn.addEventListener("click", loadUsers);

loadUsers();
