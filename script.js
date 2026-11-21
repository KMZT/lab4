const usersContainer = document.getElementById("users");
const status = document.getElementById("status");
const loadBtn = document.getElementById("loadBtn");

async function loadUsers() {
    usersContainer.innerHTML = "";
    status.textContent = "Загрузка данных...";
    loadBtn.disabled = true;

    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/users");

        if (!response.ok) {
            throw new Error("Ошибка HTTP: " + response.status);
        }

        const users = await response.json();

        users.forEach(user => {
            const card = document.createElement("div");
            card.className = "user-card";

            card.innerHTML = `
                <h2>${user.name}</h2>
                <p><strong>Логин:</strong> ${user.username}</p>
                <p><strong>Email:</strong> ${user.email}</p>
                <p><strong>Город:</strong> ${user.address.city}</p>
                <p><strong>Улица:</strong> ${user.address.street}</p>
                <p><strong>Компания:</strong> ${user.company.name}</p>
            `;

            usersContainer.appendChild(card);
        });

        status.textContent = "Загружено пользователей: " + users.length;

    } catch (error) {
        status.textContent = "Ошибка загрузки: " + error.message;
        console.error(error);
    } finally {
        loadBtn.disabled = false;
    }
}

loadBtn.addEventListener("click", loadUsers);

loadUsers();
