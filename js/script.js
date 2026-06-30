const userA = document.querySelector("#topbarName");
const darkMode = document.querySelector("#darkModeToggle");
const settingsBtn = document.querySelector(".nav-item[data-target='settings-view']");
const dashboardBtn = document.querySelector(".nav-item[data-target='dashboard-view']");
const settingsView = document.querySelector("#settings-view");
const mainView = document.querySelector("#dashboard-view");
const modal = document.querySelector("#openAddModalBtn");
const modalContent = document.querySelector("#transactionModal");
const closeModalBtn = document.querySelector(".close-modal");

const loggedIn = localStorage.getItem("loggedIn");
const userName = localStorage.getItem("userName");

if (loggedIn === "true" && userName) {
    userA.textContent = userName;
}

if (localStorage.getItem("loggedIn") !== "true") {
    window.location.replace("login.html");

}

document.getElementById("logoutBtn").addEventListener("click", () => {
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("userName");
    window.location.replace("login.html");
});



darkMode.addEventListener("click", () => {
    document.body.classList.toggle("dark-theme");
})




settingsBtn.addEventListener("click", () => {
    mainView.style.display = "none";
    settingsView.style.display = "block";

    settingsBtn.classList.add("active");
    dashboardBtn.classList.remove("active");
})


dashboardBtn.addEventListener("click", () => {
    mainView.style.display = "block";
    settingsView.style.display = "none";

    settingsBtn.classList.remove("active");
    dashboardBtn.classList.add("active");
})





modal.addEventListener("click", (event) => {
    modalContent.classList.add("active");
});


closeModalBtn.addEventListener("click", () => {
    modalContent.classList.remove("active");
});




